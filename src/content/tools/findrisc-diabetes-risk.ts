import type { ToolContent } from "./types";

export const findriscDiabetesRiskContent: ToolContent = {
  slug: "findrisc-diabetes-risk",
  title: "FINDRISC Diabetes Risk",
  description:
    "What the Finnish Diabetes Risk Score measures, how its eight questions are added up, and how to read the result responsibly.",
  intro:
    "FINDRISC stands for Finnish Diabetes Risk Score. It is an eight-question screening tool used to identify adults who may benefit from a blood glucose test. It combines age, body mass index, waist size, activity, fruit and vegetable intake, blood pressure medicine, previous high glucose and family history into one score from 0 to 26.",
  sections: [
    {
      heading: "What the score is for",
      paragraphs: [
        "FINDRISC was designed for primary care and population screening. It helps decide who should be offered further testing, usually a fasting glucose test, HbA1c test or oral glucose tolerance test. It is not a diagnosis and it does not monitor diabetes treatment.",
        "The tool asks for information you can usually supply without laboratory results. That makes it useful as an early filter. It also means that a person with an undiagnosed condition can still receive a low score, especially if other risk factors are not present.",
      ],
    },
    {
      heading: "The scoring formula explained",
      paragraphs: [
        "The FINDRISC total is a simple sum. Each answer contributes points once. There are no multipliers and no hidden adjustments.",
      ],
      bullets: [
        "Age: under 45 = 0, 45–54 = 2, 55–64 = 3, over 64 = 4",
        "BMI: below 25 = 0, 25–30 = 1, above 30 = 3",
        "Waist: men below 94 cm = 0, 94–102 = 3, above 102 = 4; women below 80 cm = 0, 80–88 = 3, above 88 = 4",
        "At least 30 minutes of daily activity: yes = 0, no = 2",
        "Vegetables, fruit or berries every day: yes = 0, no = 1",
        "Regular blood pressure medicine history: no = 0, yes = 2",
        "Previously found high blood glucose: no = 0, yes = 5",
        "Family history: none = 0, distant relative = 3, parent, sibling or child = 5",
      ],
    },
    {
      heading: "Worked example: moderate band",
      paragraphs: [
        "A 50-year-old man weighs 88 kg at 177 cm tall, giving a BMI of about 28. His waist is 98 cm. He is not active for 30 minutes daily, does not eat fruit or vegetables every day, takes blood pressure medicine, has never had high glucose, and has a parent with diabetes. Age adds 2, BMI 1, waist 3, activity 2, diet 1, medicine 2, glucose 0 and family history 5. The total is 16, in the high band. The historical form prints an approximate 1 in 3 chance of developing type 2 diabetes within ten years for that band. That figure describes groups, not a personal forecast.",
      ],
    },
    {
      heading: "Worked example: low band",
      paragraphs: [
        "A 38-year-old woman weighs 62 kg at 168 cm tall, giving a BMI of about 22. Her waist is 75 cm. She is active daily, eats vegetables or fruit every day, does not take blood pressure medicine, has never had high glucose and has no affected relative. Every item scores 0, so her total is 0. This is the lowest band. It still makes sense to review risk at routine appointments, because age and life circumstances change.",
      ],
    },
    {
      heading: "Reading the bands",
      paragraphs: [
        "The published form groups scores as below 7, 7–11, 12–14, 15–20 and above 20. It labels them low, slightly elevated, moderate, high and very high. Older versions of the form print approximate ten-year frequencies beside those bands: about 1 in 100, 1 in 25, 1 in 6, 1 in 3 and 1 in 2. Treat these as rough population guides. They were not calculated for your exact medical history.",
        "A higher score is a reason to ask about testing and prevention, not a reason to start medicine. A lower score is not permission to ignore symptoms or other risk factors.",
      ],
    },
    {
      heading: "How to measure accurately",
      paragraphs: [
        "Measure waist below the ribs, usually at the level of the navel, with a soft tape measure held snugly but not tight. Measure height without shoes. Use a recent weight. If your BMI falls near a boundary, a small measurement difference can move you into another band.",
        "For family history, choose the closer category if any parent, brother, sister or child has been diagnosed with diabetes. Do not add both the distant and close family points; the question is scored once.",
      ],
    },
    {
      heading: "Source and limits",
      paragraphs: [
        "The score comes from Lindström and Tuomilehto, Diabetes Care, 2003;26(3):725–731, doi:10.2337/diacare.26.3.725. The band wording in this tool follows published FINDRISC questionnaires. This page was checked on 24 November 2026.",
        "FINDRISC was developed in Finland and is used in many countries, but performance differs between populations. It does not include every risk factor, such as ethnicity, medication details beyond blood pressure treatment, or existing cardiovascular disease. Talk to a qualified healthcare professional before making decisions based on the result.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is FINDRISC a diabetes test?",
      answer:
        "No. It is a screening questionnaire that estimates who may need a blood test. It does not measure blood sugar.",
    },
    {
      question: "Why is waist size separate from BMI?",
      answer:
        "Waist size gives information about abdominal fat distribution that BMI alone does not capture. Both are included in the source score.",
    },
    {
      question: "What counts as daily physical activity?",
      answer:
        "The source question asks about at least 30 minutes a day during work, leisure or normal daily activity. It is not limited to sport.",
    },
    {
      question: "Can the score go above 26?",
      answer:
        "No. The highest permitted answer in each of the eight items adds to 26 points.",
    },
    {
      question: "Does a low score mean I should not be tested?",
      answer:
        "Not always. Symptoms, pregnancy, family patterns and clinician judgement can still make testing appropriate.",
    },
    {
      question: "Can this tool be used for someone with diabetes?",
      answer:
        "No. It is a screening tool for people who have not been diagnosed. If you already have diabetes, follow the care plan from your clinician.",
    },
  ],
  privacyNote:
    "Your measurements and answers stay in this browser tab. The score is calculated locally and is not uploaded or stored.",
  related: ["type-2-diabetes-risk-test", "ascvd-risk-estimator"],
  updated: "2026-11-24",
};
