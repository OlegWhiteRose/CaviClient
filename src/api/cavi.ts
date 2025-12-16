import { apiFetch } from './client';
import type { CaviGroup, CartInfo, CaviCalculation } from '@/types/cavi';

export interface GroupFilters {
  title?: string;
  ageGroup?: string;
  disease?: string;
}

// Бекенд возвращает PascalCase
const transformCaviGroup = (data: any): CaviGroup => ({
  id: data.ID,
  name: data.Name,
  description: data.Description,
  isSelected: data.IsSelected,
  isDeleted: data.IsDeleted,
  imageURL: data.ImageURL,
  ageGroup: data.AgeGroup,
  diseaseType: data.DiseaseType,
});

export const fetchGroups = async (filters: GroupFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.title) params.set('title', filters.title);
  if (filters.ageGroup) params.set('age_group', filters.ageGroup);
  if (filters.disease) params.set('disease_type', filters.disease);

  const query = params.toString() ? `?${params.toString()}` : '';

  const data = await apiFetch<any[]>(`/api/cavi-groups${query}`, {
    method: 'GET',
    auth: false,
  });
  return data?.map(transformCaviGroup) || [];
};

export const fetchGroup = async (id: number) => {
  const data = await apiFetch<any>(`/api/cavi-groups/${id}`, { method: 'GET', auth: false });
  return transformCaviGroup(data);
};

export const addGroupToDraft = (id: number) => {
  return apiFetch<{ calculation_id: number }>(`/api/cavi-groups/${id}/add-to-draft`, {
    method: 'POST',
  });
};

export const getCartInfo = () => {
  return apiFetch<CartInfo>('/api/cavi-calculations/draft', { method: 'GET' });
};

const transformCalculationGroup = (data: any) => ({
  groupId: data.GroupID,
  caviIndex: data.CAVIIndex,
  group: data.Group ? transformCaviGroup(data.Group) : undefined,
});

const transformCalculation = (data: any): CaviCalculation => ({
  id: data.ID,
  status: data.Status,
  createdAt: data.CreatedAt,
  formedAt: data.FormedAt,
  completedAt: data.CompletedAt,
  moderatorLogin: data.ModeratorLogin,
  systolicPressure: data.SystolicPressure,
  diastolicPressure: data.DiastolicPressure,
  pulseWaveVelocity: data.PulseWaveVelocity,
  creatorLogin: data.CreatorLogin,
  groupsCount: data.GroupsCount,
  calculationGroups: data.CalculationGroups?.map(transformCalculationGroup) || [],
});

export const fetchCalculation = async (id: number) => {
  const data = await apiFetch<any>(`/api/cavi-calculations/${id}`, { method: 'GET' });
  return transformCalculation(data);
};

export const removeGroupFromDraft = (groupId: number) => {
  return apiFetch<{ calculation_id: number }>('/api/cavi-calculations/draft/groups', {
    method: 'DELETE',
    body: JSON.stringify({ group_id: groupId }),
  });
};

export const updateGroupCaviIndex = (groupId: number, caviIndex: number) => {
  return apiFetch('/api/cavi-calculations/draft/groups', {
    method: 'PUT',
    body: JSON.stringify({ group_id: groupId, cavi_index: caviIndex }),
    parseJson: false,
  });
};

export const deleteCalculation = (id: number) => {
  return apiFetch(`/api/cavi-calculations/${id}`, {
    method: 'DELETE',
    parseJson: false,
  });
};

export const formDraft = () => {
  return apiFetch<CaviCalculation>('/api/cavi-calculations/draft/form', {
    method: 'PUT',
  }).then(transformCalculation);
};

export const updateCalculation = (id: number, data: {
  systolic_pressure?: number;
  diastolic_pressure?: number;
  pulse_wave_velocity?: number;
}) => {
  return apiFetch(`/api/cavi-calculations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    parseJson: false,
  });
};

export const fetchCalculations = async (filters?: {
  status?: string;
  date_from?: string;
  date_to?: string;
}) => {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.date_from) params.set('date_from', filters.date_from);
  if (filters?.date_to) params.set('date_to', filters.date_to);

  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await apiFetch<any[]>(`/api/cavi-calculations${query}`, { method: 'GET' });
  return data?.map(transformCalculation) || [];
};

