import type { ToolContent } from "./types";

export const bmiCalculatorContent: ToolContent = {
  slug: "bmi-calculator",
  title: "BMI Calculator",
  description:
    "Calculate adult body mass index, compare it with CDC, NICE and India thresholds, and understand what BMI can and cannot tell you.",
  intro:
    "Body mass index, usually shortened to BMI, is a quick way to compare a person's weight with their height. It is not a measure of body fat and it does not diagnose a health condition. It is a screening number that can start a useful conversation with a healthcare professional, especially when it is considered alongside waist measurement, blood pressure, medicines, family history and lab results.",
  sections: [
    {
      heading: "How BMI is calculated",
      paragraphs: [
        "In metric units, BMI is weight in kilograms divided by height in metres squared. A person who weighs 70 kg and is 1.75 m tall has a BMI of 70 divided by 3.0625, which is about 22.9. In US units, the same calculation uses weight in pounds divided by height in inches squared, then multiplied by 703. The conversion factor simply changes the units; it does not change the meaning of the number.",
        "This calculator accepts either centimetres and kilograms or inches and pounds. It converts imperial inputs to metric before calculating, then applies the threshold set you choose. You can select the international adult categories, the United States CDC categories, general NICE categories from the United Kingdom, lower NICE thresholds for several higher-risk backgrounds, or Indian adult categories.",
      ],
    },
    {
      heading: "Why different threshold sets exist",
      paragraphs: [
        "The familiar cut-off points are under 18.5 for underweight, 18.5 to below 25 for a healthy range, 25 to below 30 for overweight, and 30 or above for obesity. These are used by the CDC and many international resources. NICE in the United Kingdom uses the same broad numbers for the general adult population, but recommends lower action thresholds for people with a South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean background because cardiometabolic risk can appear at a lower BMI.",
        "Indian guidance commonly treats 18.5 to 22.9 as the normal range, 23 to 24.9 as overweight and 25 or above as obesity. A 2025 consensus for Asian Indians adds grades above 25. No threshold set is perfect for every individual. If you are unsure which one applies, choose the standard your clinician uses rather than the one that gives the most reassuring result.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "Example one: a person is 1.70 m tall and weighs 65 kg. Height squared is 2.89, so BMI is 65 divided by 2.89, about 22.5. On the international and United States scales this sits in the healthy range. On the Indian scale it also sits in the normal range because it is below 23.",
        "Example two: a person is 1.65 m tall and weighs 70 kg. Height squared is 2.7225, so BMI is about 25.7. On the international scale this is overweight. On the NICE lower-threshold scale for higher-risk backgrounds it is also overweight, and on the Indian scale it falls in the overweight range. Example three: a person who is 1.80 m tall and weighs 95 kg has a BMI of about 29.3. That is just below the usual obesity cut-off of 30, but still above the overweight threshold, which is a reason to look at waist size and other risk factors rather than stopping at the label.",
      ],
    },
    {
      heading: "Limits you should know",
      paragraphs: [
        "BMI does not separate muscle from fat. Athletes, people with high muscle mass, older adults who have lost muscle, and people with fluid retention can all receive a misleading category. BMI is also not intended for pregnancy, and children and teenagers need age-and-sex-specific growth charts instead of adult cut-offs.",
        "Waist-to-height ratio adds useful information because it focuses on central adiposity. A BMI in the healthy range can still sit alongside a high waist measurement. Measurement error also matters: a few centimetres of height error or a few kilograms of weight error can move a result across a threshold. Use the same scale and the same measuring method each time if you want to track change.",
      ],
    },
    {
      heading: "Sources and review dates",
      paragraphs: [
        "The adult category framework is based on CDC Adult BMI Categories and WHO adult BMI guidance. United Kingdom categories and lower thresholds follow NICE guideline NG246, published on 14 January 2025 and last updated on 8 January 2026. Indian categories follow ICMR-NIN Dietary Guidelines for Indians 2024 and the 2025 revised definition of obesity in Asian Indians. These sources were checked on 24 November 2026.",
        "This tool is educational and private. Your height, weight and selected standard are calculated inside the browser tab and are not sent to our servers. Please consult a qualified healthcare professional before using this result to make any medical decision.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is BMI the same as body fat percentage?",
      answer:
        "No. BMI is a weight-to-height ratio. It correlates with body fat in groups of people, but it cannot tell how much of your weight is fat, muscle, bone or water.",
    },
    {
      question: "Which BMI standard should I use?",
      answer:
        "Use the standard recommended by your healthcare professional or national guidance. The international and United States cut-offs are widely used. NICE and Indian guidance use lower thresholds for some populations.",
    },
    {
      question: "Can BMI be wrong for athletes?",
      answer:
        "Yes. Muscle is heavier than fat for the same volume, so a muscular person can have a high BMI without high body fat. Other measurements are needed in that situation.",
    },
    {
      question: "Can children use this calculator?",
      answer:
        "No. Children and teenagers need BMI-for-age percentiles or growth charts that account for age and sex. Adult cut-offs should not be applied to them.",
    },
    {
      question: "Does pregnancy change how BMI should be read?",
      answer:
        "Yes. Pregnancy changes weight and body composition, and antenatal care uses different assessment methods. Ask your maternity team how to interpret weight and BMI during pregnancy.",
    },
    {
      question: "Why is my BMI different on another website?",
      answer:
        "Another site may use different threshold sets, round differently, or ask for height and weight in different units. Check the source and the threshold labels before comparing results.",
    },
    {
      question: "Should I measure waist as well?",
      answer:
        "Often yes. Waist measurement adds information about central adiposity. It is especially useful when BMI is below 35, but measurement technique matters.",
    },
  ],
  privacyNote:
    "Your height, weight and selected standard stay in this browser tab. The calculation happens locally and is not uploaded or stored on our servers.",
  related: [
    "bmr-tdee-calculator",
    "findrisc-diabetes-risk",
    "type-2-diabetes-risk-test",
    "ascvd-risk-estimator",
  ],
  updated: "2026-11-24",
};
