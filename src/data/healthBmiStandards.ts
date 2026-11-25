export type BmiBandKey =
  | "underweight"
  | "healthy"
  | "overweight"
  | "obesity1"
  | "obesity2"
  | "obesity3";

export interface BmiBand {
  min: number;
  max: number | null;
  key: BmiBandKey;
}

export interface BmiStandard {
  id: string;
  nameKey: string;
  source: string;
  checked: string;
  bands: BmiBand[];
}

export const bmiStandards: BmiStandard[] = [
  {
    id: "standard",
    nameKey: "standard",
    source: "CDC adult BMI categories and WHO adult BMI categories",
    checked: "2026-11-24",
    bands: [
      { min: 0, max: 18.5, key: "underweight" },
      { min: 18.5, max: 25, key: "healthy" },
      { min: 25, max: 30, key: "overweight" },
      { min: 30, max: 35, key: "obesity1" },
      { min: 35, max: 40, key: "obesity2" },
      { min: 40, max: null, key: "obesity3" },
    ],
  },
  {
    id: "us",
    nameKey: "us",
    source: "CDC, Adult BMI Categories; last reviewed 2022",
    checked: "2026-11-24",
    bands: [
      { min: 0, max: 18.5, key: "underweight" },
      { min: 18.5, max: 25, key: "healthy" },
      { min: 25, max: 30, key: "overweight" },
      { min: 30, max: 35, key: "obesity1" },
      { min: 35, max: 40, key: "obesity2" },
      { min: 40, max: null, key: "obesity3" },
    ],
  },
  {
    id: "gb-general",
    nameKey: "gbGeneral",
    source: "NICE guideline NG246, published 2025 and updated 2026; general adult thresholds",
    checked: "2026-11-24",
    bands: [
      { min: 0, max: 18.5, key: "underweight" },
      { min: 18.5, max: 25, key: "healthy" },
      { min: 25, max: 30, key: "overweight" },
      { min: 30, max: 35, key: "obesity1" },
      { min: 35, max: 40, key: "obesity2" },
      { min: 40, max: null, key: "obesity3" },
    ],
  },
  {
    id: "gb-lower",
    nameKey: "gbLower",
    source: "NICE guideline NG246, published 2025 and updated 2026; lower thresholds for South Asian, Chinese, other Asian, Middle Eastern, Black African and African-Caribbean backgrounds",
    checked: "2026-11-24",
    bands: [
      { min: 0, max: 18.5, key: "underweight" },
      { min: 18.5, max: 23, key: "healthy" },
      { min: 23, max: 27.5, key: "overweight" },
      { min: 27.5, max: 32.5, key: "obesity1" },
      { min: 32.5, max: 37.5, key: "obesity2" },
      { min: 37.5, max: null, key: "obesity3" },
    ],
  },
  {
    id: "india",
    nameKey: "india",
    source: "ICMR-NIN Dietary Guidelines for Indians 2024 and Misra et al., revised definition of obesity in Asian Indians, 2025",
    checked: "2026-11-24",
    bands: [
      { min: 0, max: 18.5, key: "underweight" },
      { min: 18.5, max: 23, key: "healthy" },
      { min: 23, max: 25, key: "overweight" },
      { min: 25, max: 27.6, key: "obesity1" },
      { min: 27.6, max: 32.5, key: "obesity2" },
      { min: 32.5, max: null, key: "obesity3" },
    ],
  },
];

export function getBmiStandard(id: string): BmiStandard | undefined {
  return bmiStandards.find((standard) => standard.id === id);
}
