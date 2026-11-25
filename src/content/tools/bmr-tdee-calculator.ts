import type { ToolContent } from "./types";

export const bmrTdeeCalculatorContent: ToolContent = {
  slug: "bmr-tdee-calculator",
  title: "BMR & TDEE Calculator",
  description:
    "Estimate resting metabolic rate and daily energy needs with the Mifflin-St Jeor equation and published physical activity ranges.",
  intro:
    "Your body uses energy even when you are resting. Basal metabolic rate, often shortened to BMR, is the energy needed for basic functions such as breathing, circulation and keeping body temperature stable. In practice, many calculators estimate resting metabolic rate rather than true basal metabolic rate. Total daily energy expenditure, or TDEE, adds the energy used for movement, work, exercise and digestion. Both numbers are estimates, not prescriptions.",
  sections: [
    {
      heading: "The Mifflin-St Jeor equation",
      paragraphs: [
        "This calculator uses the Mifflin-St Jeor predictive equation from 1990. For men, the equation is 10 × weight in kilograms, plus 6.25 × height in centimetres, minus 5 × age in years, plus 5. For women, the same first three terms are used and 161 is subtracted instead. The result is an estimate of resting energy expenditure in kilocalories per day.",
        "The equation was developed from 498 healthy adults aged 19 to 78. It is widely used because it is simple and performs reasonably well in many adults, but it can be less accurate in people at extremes of body size, in older adults outside the studied range, and in some ethnic groups. A measured test called indirect calorimetry is more accurate when precise energy needs matter.",
      ],
    },
    {
      heading: "How TDEE is estimated",
      paragraphs: [
        "TDEE is estimated by multiplying resting energy expenditure by a physical activity level, often shortened to PAL. This calculator uses PAL bands from the 2004 FAO/WHO/UNU report on human energy requirements: sedentary or light activity from 1.40 to 1.69, moderately active from 1.70 to 1.99, and vigorous activity from 2.00 to 2.39. Instead of pretending that one multiplier is exact, the tool shows a range.",
        "The midpoint of the selected range is also shown because a single planning number can be useful. That midpoint is a display convention, not a value published by FAO, WHO or UNU. Common fixed multipliers such as 1.2, 1.375 or 1.9 appear on many websites, but they are not the published bands used here. Treat every TDEE number as an approximation that changes when your weight, routine or training changes.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A 35-year-old woman weighs 68 kg and is 165 cm tall. Her resting energy estimate is 10 × 68 = 680, plus 6.25 × 165 = 1031.25, minus 5 × 35 = 175, then minus 161. The total is about 1375 kcal per day. If she selects light activity, her TDEE range is about 1925 to 2324 kcal per day, with a midpoint near 2125 kcal per day.",
        "A 45-year-old man weighs 82 kg and is 180 cm tall. His resting estimate is 820 + 1125 − 225 + 5, or about 1725 kcal per day. With moderate activity, his estimated TDEE range is about 2933 to 3433 kcal per day. The width of each range is normal: two people with the same age, height, weight and activity label can still burn different amounts because of occupation, movement patterns, sleep, illness and body composition.",
      ],
    },
    {
      heading: "Using the result safely",
      paragraphs: [
        "If your goal is weight maintenance, your current body weight and a stable routine matter more than a single calculated number. If your goal is weight loss or gain, the result can be a starting point for a conversation, not a rule. Energy needs also adapt when weight changes, so a number that fits today may not fit in a few months.",
        "Extra caution is needed during pregnancy and breastfeeding, during growth in teenagers, for people with diabetes, kidney disease, an eating disorder history, or anyone under medical nutrition supervision. Do not use this calculator to set a very low calorie intake or to plan treatment. A registered dietitian or clinician can interpret the estimate in context.",
      ],
    },
    {
      heading: "Sources and review dates",
      paragraphs: [
        "The resting equation is from Mifflin et al., A new predictive equation for resting energy expenditure in healthy individuals, American Journal of Clinical Nutrition, 1990. The activity ranges are from Human energy requirements, the report of a joint FAO/WHO/UNU expert consultation, 2004. These sources were checked on 24 November 2026.",
        "Your answers stay in this browser tab and are not uploaded. Please consult a qualified healthcare professional before using this result to make any medical or nutrition decision.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is BMR the same as TDEE?",
      answer:
        "No. BMR or resting metabolic rate is the energy your body uses at rest. TDEE adds the energy used through daily activity and digestion.",
    },
    {
      question: "Why does this tool show a TDEE range?",
      answer:
        "Because published physical activity levels are ranges. A single multiplier would make the result look more precise than the source evidence supports.",
    },
    {
      question: "Can I use this calculator for weight loss?",
      answer:
        "It can be a starting estimate, but it is not a diet plan. Weight change varies between people, and very low calorie intake should not be attempted without medical supervision.",
    },
    {
      question: "Does muscle mass change the result?",
      answer:
        "Yes. The equation does not measure muscle, so two people with the same height, weight, age and sex can have different resting energy needs.",
    },
    {
      question: "Should I use kilograms and centimetres?",
      answer:
        "This version uses metric units because the source equation is written in kilograms and centimetres. Convert pounds and inches before entering your values.",
    },
    {
      question: "Is this suitable for teenagers?",
      answer:
        "No. The source equation was developed in adults aged 19 to 78. Teenagers have different energy needs because they are still growing.",
    },
    {
      question: "How often should I recalculate?",
      answer:
        "Recalculate after a meaningful change in weight, age, training or occupation. Small day-to-day fluctuations do not require a new estimate.",
    },
  ],
  privacyNote:
    "Your age, sex, height, weight and activity level stay in this browser tab. The calculation happens locally and is not uploaded or stored on our servers.",
  related: [
    "bmi-calculator",
    "type-2-diabetes-risk-test",
    "findrisc-diabetes-risk",
    "ascvd-risk-estimator",
  ],
  updated: "2026-11-24",
};
