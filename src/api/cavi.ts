import { apiFetch } from './client';
import type { CaviGroup, CartInfo, CaviCalculation } from '@/types/cavi';

export interface GroupFilters {
  title?: string;
  ageGroup?: string;
  disease?: string;
}

const transformCaviGroup = (data: any): CaviGroup => ({
  id: data.ID,
  name: data.Name,
  description: data.Description,
  isSelected: data.IsSelected,
  isDeleted: data.IsDeleted,
  imageURL: data.ImageURL,
  ageGroup: data.AgeGroup,
  diseaseType: data.DiseaseType,
  basePrice: data.BasePrice,
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

export const fetchGroup = (id: number) => {
  return apiFetch<any>(`/api/cavi-groups/${id}`, { method: 'GET', auth: false }).then(
    transformCaviGroup,
  );
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
  id: data.ID,
  calculationID: data.CalculationID,
  groupID: data.GroupID,
  caviIndex: data.CAVIIndex,
  calculatedCAVI: data.CalculatedCAVI,
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
  calculationGroups: data.CalculationGroups?.map(transformCalculationGroup) || [],
});

export const fetchCalculation = (id: number) => {
  return apiFetch<any>(`/api/cavi-calculations/${id}`, { method: 'GET' }).then(
    transformCalculation,
  );
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

