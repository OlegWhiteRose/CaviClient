import type { CaviCalculation, CaviGroup } from '@/types/cavi';

export const groupsMock: CaviGroup[] = [
  {
    id: 1,
    name: 'Молодые пациенты (до 35 лет)',
    description: 'Эластичные сосуды с низким уровнем жесткости',
    isSelected: false,
    isDeleted: false,
    imageURL: '',
    ageGroup: 'young',
    diseaseType: null,
    basePrice: 15_000,
  },
  {
    id: 2,
    name: 'Средний возраст (36–50 лет)',
    description: 'Часто появляются первые факторы риска',
    isSelected: true,
    isDeleted: false,
    imageURL: '',
    ageGroup: 'middle',
    diseaseType: null,
    basePrice: 18_000,
  },
  {
    id: 3,
    name: 'Пожилые пациенты с гипертонией',
    description: 'Повышенная жесткость при гипертонии в пожилом возрасте',
    isSelected: true,
    isDeleted: false,
    imageURL: '',
    ageGroup: 'elderly',
    diseaseType: 'hypertension',
    basePrice: 25_500,
  },
  {
    id: 4,
    name: 'Молодые пациенты с сахарным диабетом',
    description: 'Ранние признаки повреждения сосудов',
    isSelected: false,
    isDeleted: false,
    imageURL: '',
    ageGroup: 'young',
    diseaseType: 'diabetes',
    basePrice: 21_300,
  },
];

export const calculationMock: CaviCalculation = {
  id: 101,
  status: 'draft',
  createdAt: new Date().toISOString(),
  creatorLogin: 'user1',
  calculationGroups: [
    {
      id: 1,
      calculationID: 101,
      groupID: 2,
      caviIndex: 0,
      group: groupsMock[1],
    },
    {
      id: 2,
      calculationID: 101,
      groupID: 3,
      caviIndex: 0,
      group: groupsMock[2],
    },
  ],
};

