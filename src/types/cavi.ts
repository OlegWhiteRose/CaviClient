export interface CaviGroup {
  id: number;
  name: string;
  description: string;
  isSelected: boolean;
  isDeleted: boolean;
  imageURL: string;
  ageGroup: string;
  diseaseType?: string | null;
  basePrice: number;
}

export interface CartInfo {
  calculation_id: number;
  items: number;
}

export interface CaviCalculationGroup {
  id: number;
  calculationID: number;
  groupID: number;
  caviIndex: number;
  calculatedCAVI?: number;
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
  calculationGroups?: CaviCalculationGroup[];
}

export interface LoginResponse {
  message: string;
  token: string;
  refresh_token: string;
  user: {
    username: string;
    is_moderator: boolean;
  };
}

export interface ApiError extends Error {
  status?: number;
}

