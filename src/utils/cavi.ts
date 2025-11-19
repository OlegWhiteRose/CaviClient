import type { CaviGroup } from '@/types/cavi';

export const DEFAULT_SYSTOLIC = 120;
export const DEFAULT_DIASTOLIC = 80;
export const DEFAULT_PWV = 8.5;

const AGE_GROUP_MULTIPLIER: Record<string, number> = {
  young: 0.9,
  middle: 1,
  elderly: 1.1,
};

const DISEASE_MULTIPLIER: Record<string, number> = {
  diabetes: 1.2,
  hypertension: 1,
};

export const calculateCAVI = (
  group: CaviGroup,
  systolic = DEFAULT_SYSTOLIC,
  diastolic = DEFAULT_DIASTOLIC,
  pwv = DEFAULT_PWV,
) => {
  if (!group || systolic <= diastolic || !pwv || !systolic || !diastolic) {
    return 0;
  }

  const ps = systolic;
  const pd = diastolic;
  const dp = ps - pd;
  const rho = 1.05;

  const M = AGE_GROUP_MULTIPLIER[group.ageGroup] ?? 1;
  const A = group.diseaseType ? DISEASE_MULTIPLIER[group.diseaseType] ?? 1 : 1;

  const result = M * ((2 * rho) / dp) * Math.log(ps / pd) * pwv * pwv + A;
  return Number(result.toFixed(3));
};

