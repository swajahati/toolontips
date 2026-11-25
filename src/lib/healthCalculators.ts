import type { BmiBand, BmiBandKey } from "@/data/healthBmiStandards";

export type Sex = "female" | "male";
export type RiskBand =
  | "lowerRisk"
  | "increasedRisk"
  | "low"
  | "slightlyElevated"
  | "moderate"
  | "high"
  | "veryHigh"
  | "borderline"
  | "intermediate";

export interface Type2RiskInput {
  age: number;
  sex: Sex;
  gestationalDiabetes: boolean;
  firstDegreeRelative: boolean;
  highBloodPressure: boolean;
  inactive: boolean;
  heightInches: number;
  weightPounds: number;
}

export interface Type2RiskResult {
  score: number;
  band: RiskBand;
  breakdown: { key: string; points: number }[];
}

export interface FindriscInput {
  age: number;
  sex: Sex;
  weightKg: number;
  heightCm: number;
  waistCm: number;
  inactive: boolean;
  lowFruitVegetables: boolean;
  bloodPressureMedication: boolean;
  highGlucoseHistory: boolean;
  familyHistory: "none" | "extended" | "firstDegree";
}

export interface FindriscResult {
  score: number;
  band: RiskBand;
  bmi: number;
  breakdown: { key: string; points: number }[];
}

export interface AscvdInput {
  countryCode: string;
  sex: Sex;
  race: "white" | "africanAmerican";
  age: number;
  totalCholesterol: number;
  hdl: number;
  systolic: number;
  bpTreated: boolean;
  smoker: boolean;
  diabetes: boolean;
}

export interface AscvdResult {
  percent: number;
  band: RiskBand;
}

const weightChart: Record<number, [number, number, number]> = {
  58: [119, 143, 191],
  59: [124, 148, 198],
  60: [128, 153, 204],
  61: [132, 158, 211],
  62: [136, 164, 218],
  63: [141, 169, 225],
  64: [145, 174, 232],
  65: [150, 180, 240],
  66: [155, 186, 247],
  67: [159, 191, 255],
  68: [164, 197, 262],
  69: [169, 203, 270],
  70: [174, 209, 278],
  71: [179, 215, 286],
  72: [184, 221, 294],
  73: [189, 227, 302],
  74: [194, 233, 311],
  75: [200, 240, 319],
  76: [205, 246, 328],
};

function agePoints(age: number): number {
  if (age < 40) return 0;
  if (age < 50) return 1;
  if (age < 60) return 2;
  return 3;
}

function weightChartPoints(heightInches: number, weightPounds: number): number {
  const roundedHeight = Math.round(heightInches);
  const bands = weightChart[roundedHeight];
  if (!bands) throw new Error("heightOutOfChart");
  if (weightPounds < bands[0]) return 0;
  if (weightPounds < bands[1]) return 1;
  if (weightPounds < bands[2]) return 2;
  return 3;
}

export function calculateType2Risk(input: Type2RiskInput): Type2RiskResult {
  const age = agePoints(input.age);
  const sex = input.sex === "male" ? 1 : 0;
  const gestational = input.sex === "female" && input.gestationalDiabetes ? 1 : 0;
  const family = input.firstDegreeRelative ? 1 : 0;
  const bloodPressure = input.highBloodPressure ? 1 : 0;
  const activity = input.inactive ? 1 : 0;
  const weight = weightChartPoints(input.heightInches, input.weightPounds);
  const score = age + sex + gestational + family + bloodPressure + activity + weight;

  return {
    score,
    band: score >= 5 ? "increasedRisk" : "lowerRisk",
    breakdown: [
      { key: "age", points: age },
      { key: "sexOrGestational", points: sex + gestational },
      { key: "familyHistory", points: family },
      { key: "bloodPressurePoints", points: bloodPressure },
      { key: "activity", points: activity },
      { key: "weight", points: weight },
    ],
  };
}

function findriscAgePoints(age: number): number {
  if (age < 45) return 0;
  if (age < 55) return 2;
  if (age < 65) return 3;
  return 4;
}

function bmiPoints(bmi: number): number {
  if (bmi < 25) return 0;
  if (bmi < 30) return 1;
  return 3;
}

function waistPoints(input: FindriscInput): number {
  if (input.sex === "male") {
    if (input.waistCm < 94) return 0;
    if (input.waistCm <= 102) return 3;
    return 4;
  }
  if (input.waistCm < 80) return 0;
  if (input.waistCm <= 88) return 3;
  return 4;
}

function findriscBand(score: number): RiskBand {
  if (score < 7) return "low";
  if (score <= 11) return "slightlyElevated";
  if (score <= 14) return "moderate";
  if (score <= 20) return "high";
  return "veryHigh";
}

export function calculateFindrisc(input: FindriscInput): FindriscResult {
  const heightM = input.heightCm / 100;
  const bmi = input.weightKg / (heightM * heightM);
  const age = findriscAgePoints(input.age);
  const bodyMass = bmiPoints(bmi);
  const waist = waistPoints(input);
  const activity = input.inactive ? 2 : 0;
  const produce = input.lowFruitVegetables ? 1 : 0;
  const medication = input.bloodPressureMedication ? 2 : 0;
  const glucose = input.highGlucoseHistory ? 5 : 0;
  const family =
    input.familyHistory === "none"
      ? 0
      : input.familyHistory === "extended"
        ? 3
        : 5;
  const score = age + bodyMass + waist + activity + produce + medication + glucose + family;

  return {
    score,
    band: findriscBand(score),
    bmi,
    breakdown: [
      { key: "age", points: age },
      { key: "bmi", points: bodyMass },
      { key: "waistPoints", points: waist },
      { key: "activity", points: activity },
      { key: "producePoints", points: produce },
      { key: "medicationPoints", points: medication },
      { key: "glucosePoints", points: glucose },
      { key: "familyHistory", points: family },
    ],
  };
}

interface AscvdCoefficients {
  age: number;
  ageSquared: number | null;
  totalCholesterol: number;
  ageTotalCholesterol: number | null;
  hdl: number;
  ageHdl: number | null;
  treatedSystolic: number;
  ageTreatedSystolic: number | null;
  untreatedSystolic: number;
  ageUntreatedSystolic: number | null;
  smoker: number;
  ageSmoker: number | null;
  diabetes: number;
  mean: number;
  baseline: number;
}

const ascvdCoefficients: Record<string, AscvdCoefficients> = {
  "female-white": {
    age: -29.799,
    ageSquared: 4.884,
    totalCholesterol: 13.54,
    ageTotalCholesterol: -3.114,
    hdl: -13.578,
    ageHdl: 3.149,
    treatedSystolic: 2.019,
    ageTreatedSystolic: null,
    untreatedSystolic: 1.957,
    ageUntreatedSystolic: null,
    smoker: 7.574,
    ageSmoker: -1.665,
    diabetes: 0.661,
    mean: -29.18,
    baseline: 0.9665,
  },
  "female-africanAmerican": {
    age: 17.114,
    ageSquared: null,
    totalCholesterol: 0.94,
    ageTotalCholesterol: null,
    hdl: -18.92,
    ageHdl: 4.475,
    treatedSystolic: 29.291,
    ageTreatedSystolic: -6.432,
    untreatedSystolic: 27.82,
    ageUntreatedSystolic: -6.087,
    smoker: 0.691,
    ageSmoker: null,
    diabetes: 0.874,
    mean: 86.61,
    baseline: 0.9533,
  },
  "male-white": {
    age: 12.344,
    ageSquared: null,
    totalCholesterol: 11.853,
    ageTotalCholesterol: -2.664,
    hdl: -7.99,
    ageHdl: 1.769,
    treatedSystolic: 1.797,
    ageTreatedSystolic: null,
    untreatedSystolic: 1.764,
    ageUntreatedSystolic: null,
    smoker: 7.837,
    ageSmoker: -1.795,
    diabetes: 0.658,
    mean: 61.18,
    baseline: 0.9144,
  },
  "male-africanAmerican": {
    age: 2.469,
    ageSquared: null,
    totalCholesterol: 0.302,
    ageTotalCholesterol: null,
    hdl: -0.307,
    ageHdl: null,
    treatedSystolic: 1.916,
    ageTreatedSystolic: null,
    untreatedSystolic: 1.809,
    ageUntreatedSystolic: null,
    smoker: 0.549,
    ageSmoker: null,
    diabetes: 0.645,
    mean: 19.54,
    baseline: 0.8954,
  },
};

export function calculateAscvdRisk(input: AscvdInput): AscvdResult {
  const coefficients = ascvdCoefficients[`${input.sex}-${input.race}`];
  if (!coefficients) throw new Error("unsupportedCohort");

  const lnAge = Math.log(input.age);
  const lnCholesterol = Math.log(input.totalCholesterol);
  const lnHdl = Math.log(input.hdl);
  const lnSystolic = Math.log(input.systolic);
  const smoker = input.smoker ? 1 : 0;
  const diabetes = input.diabetes ? 1 : 0;

  let sum = coefficients.age * lnAge;
  if (coefficients.ageSquared !== null) sum += coefficients.ageSquared * lnAge * lnAge;
  sum += coefficients.totalCholesterol * lnCholesterol;
  if (coefficients.ageTotalCholesterol !== null) {
    sum += coefficients.ageTotalCholesterol * lnAge * lnCholesterol;
  }
  sum += coefficients.hdl * lnHdl;
  if (coefficients.ageHdl !== null) sum += coefficients.ageHdl * lnAge * lnHdl;

  if (input.bpTreated) {
    sum += coefficients.treatedSystolic * lnSystolic;
    if (coefficients.ageTreatedSystolic !== null) {
      sum += coefficients.ageTreatedSystolic * lnAge * lnSystolic;
    }
  } else {
    sum += coefficients.untreatedSystolic * lnSystolic;
    if (coefficients.ageUntreatedSystolic !== null) {
      sum += coefficients.ageUntreatedSystolic * lnAge * lnSystolic;
    }
  }

  sum += coefficients.smoker * smoker;
  if (coefficients.ageSmoker !== null) sum += coefficients.ageSmoker * lnAge * smoker;
  sum += coefficients.diabetes * diabetes;

  const percent = 100 * (1 - Math.pow(coefficients.baseline, Math.exp(sum - coefficients.mean)));
  const band: RiskBand =
    percent < 5
      ? "low"
      : percent < 7.5
        ? "borderline"
        : percent < 20
          ? "intermediate"
          : "high";

  return { percent, band };
}

export type BmiBodyType = "general" | "athletic" | "lean" | "higherBodyFat";

export type BmiGuidanceKey =
  | "muscleGain"
  | "athleticMaintenance"
  | "balancedActivity"
  | "bodyCompositionCheck"
  | "gradualFatLoss"
  | "lowImpactFatLoss"
  | "medicalReviewFirst";

export interface BmiResult {
  value: number;
  band: BmiBandKey;
  guidance: BmiGuidanceKey;
}

export function getBmiGuidance(band: BmiBandKey, bodyType: BmiBodyType): BmiGuidanceKey {
  if (band === "underweight") return "muscleGain";
  if (band === "healthy") {
    if (bodyType === "lean") return "muscleGain";
    if (bodyType === "athletic") return "athleticMaintenance";
    return "balancedActivity";
  }
  if (bodyType === "athletic") return "bodyCompositionCheck";
  if (band === "obesity2" || band === "obesity3") return "medicalReviewFirst";
  if (band === "obesity1") return "lowImpactFatLoss";
  return "gradualFatLoss";
}

export function calculateBmi(
  weightKg: number,
  heightCm: number,
  bands: BmiBand[],
  bodyType: BmiBodyType = "general",
): BmiResult {
  const heightM = heightCm / 100;
  const value = weightKg / (heightM * heightM);
  const matched = bands.find((band) => value >= band.min && (band.max === null || value < band.max));
  const band = matched?.key ?? "obesity3";
  return { value, band, guidance: getBmiGuidance(band, bodyType) };
}

export interface BmrInput {
  sex: Sex;
  age: number;
  weightKg: number;
  heightCm: number;
}

export interface TdeeResult {
  bmr: number;
  min: number;
  max: number;
  midpoint: number;
}

export function calculateBmr(input: BmrInput): number {
  const base = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age;
  return input.sex === "male" ? base + 5 : base - 161;
}

export function calculateTdee(bmr: number, palMin: number, palMax: number): TdeeResult {
  return {
    bmr,
    min: bmr * palMin,
    max: bmr * palMax,
    midpoint: bmr * ((palMin + palMax) / 2),
  };
}
