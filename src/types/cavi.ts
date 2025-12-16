export interface CaviGroup {
  id: number;
  name: string;
  description: string;
  isSelected: boolean;
  isDeleted: boolean;
  imageURL: string;
  ageGroup: string;
  diseaseType?: string | null;
}

export interface CartInfo {
  calculation_id: number;
  items: number;
}

export interface CaviCalculationGroup {
  groupId: number;
  caviIndex: number;
  group?: CaviGroup;
}

export interface CaviCalculation {
  id: number;
  status: string;
  createdAt: string;
  formedAt?: string | null;
  completedAt?: string | null;
  moderatorLogin?: string | null;
  systolicPressure?: number | null;
  diastolicPressure?: number | null;
  pulseWaveVelocity?: number | null;
  creatorLogin: string;
  groupsCount?: number;
  calculationGroups?: CaviCalculationGroup[];
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  username: string;
  is_moderator: boolean;
}

export interface ApiError extends Error {
  status?: number;
}

