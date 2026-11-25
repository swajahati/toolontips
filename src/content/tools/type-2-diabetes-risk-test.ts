import type { ToolContent } from "./types";

export const type2DiabetesRiskTestContent: ToolContent = {
  slug: "type-2-diabetes-risk-test",
  title: "Type 2 Diabetes Risk Test",
  description:
    "How the American Diabetes Association risk test turns age, body size, family history and lifestyle into a simple screening score.",
  intro:
    "The Type 2 Diabetes Risk Test is a short screening checklist. It does not look at blood sugar. Instead, it asks about things you already know: your age, sex, height, weight, family history, blood pressure history and daily activity. The total points give a rough signal about whether a doctor may want to check you for prediabetes or type 2 diabetes.",
  sections: [
    {
      heading: "What this test can and cannot tell you",
      paragraphs: [
        "This tool follows the paper version of the American Diabetes Association Diabetes Risk Test. It is meant to start a conversation, not end one. A low score does not rule out diabetes. A high score does not mean you have diabetes. Only a blood test in a healthcare setting can confirm the diagnosis.",
        "The original algorithm was validated without gestational diabetes as part of the model. The ADA paper version still includes gestational diabetes as one point for women because it is a useful risk marker. If you are pregnant, were pregnant before, or have symptoms such as unusual thirst, frequent urination or unexplained weight loss, speak to a clinician rather than relying on this score.",
      ],
    },
    {
      heading: "The scoring formula explained",
      paragraphs: [
        "The score is an addition sum. Each answer contributes a fixed number of points, and the total is compared with a cut-off. The source test uses seven questions and a maximum of about ten points.",
      ],
      bullets: [
        "Age: under 40 = 0, 40–49 = 1, 50–59 = 2, 60 or older = 3",
        "Sex: man = 1, woman = 0",
        "Gestational diabetes for women: yes = 1, no = 0",
        "Mother, father, sister or brother with diabetes: yes = 1, no = 0",
        "Diagnosed high blood pressure: yes = 1, no = 0",
        "Physically active: no = 1, yes = 0",
        "Weight category from the ADA height and weight chart: 0 to 3 points",
      ],
    },
    {
      heading: "Worked example: lower score",
      paragraphs: [
        "A 38-year-old woman who is 5 ft 5 in and weighs 150 lb is active, has no diagnosed high blood pressure, no affected parent or sibling, and no history of gestational diabetes. Her age adds 0, being a woman adds 0, and the chart places 150 lb at 5 ft 5 in in the first weight band, adding 1. Her total is 1, which is below the source cut-off of 5. That does not prove she has no risk. It only means this short checklist does not flag increased risk today.",
      ],
    },
    {
      heading: "Worked example: increased score",
      paragraphs: [
        "A 62-year-old man who is 5 ft 10 in and weighs 250 lb is not physically active, has diagnosed high blood pressure, and has a brother with diabetes. Age adds 3, being a man adds 1, the weight chart adds 2, inactivity adds 1, blood pressure adds 1, and family history adds 1. His total is 9. A score of 5 or higher is described by the ADA as increased risk. The right next step is to ask a healthcare professional whether blood glucose testing is appropriate, not to self-diagnose.",
      ],
    },
    {
      heading: "How to use the result well",
      paragraphs: [
        "Answer from your own knowledge and use a recent weight if you can. The chart was built in pounds and whole inches, so the tool converts metric values when you choose centimetres and kilograms. If your height is outside the chart, the tool will not give a result.",
        "Bring the number to a medical appointment if you decide to get tested. It can help a clinician understand what worried you. If your result changes after weight, activity or blood pressure changes, treat that as a prompt to review your health, not as a grade.",
      ],
    },
    {
      heading: "Limits that matter",
      paragraphs: [
        "The source notes that type 2 diabetes is more common in several population groups and that Asian Americans can face higher risk at lower body weights. Height and weight alone may therefore understate risk for some people. Conditions such as polycystic ovary syndrome, a history of cardiovascular disease, or other risk factors also matter but are not part of this short test.",
        "The ADA source is the 2023 Diabetes Risk Test PDF, adapted from Bang et al., Annals of Internal Medicine, 2009. This page was checked on 24 November 2026. Clinical guidance can change, so ask a qualified professional for advice about your own situation.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a high score mean I have diabetes?",
      answer:
        "No. The score only suggests increased risk. Diabetes and prediabetes are diagnosed with blood tests interpreted by a healthcare professional.",
    },
    {
      question: "Can I still get diabetes with a low score?",
      answer:
        "Yes. Risk factors change over time, and the short checklist does not include every medical condition or family pattern. Regular check-ups remain useful.",
    },
    {
      question: "Why is being a man worth one point?",
      answer:
        "That is how the source test is written. It reflects patterns in the population used to create the questionnaire, not a judgment about any individual.",
    },
    {
      question: "What if I do not know my family history?",
      answer:
        "Answer no only if you genuinely do not know. If you are unsure, ask a relative or bring the question to a clinician. Unknown family history can make the score less reliable.",
    },
    {
      question: "Can children use this tool?",
      answer:
        "No. It is an adult screening test. Children and young people with concerns should be assessed by a pediatric clinician.",
    },
    {
      question: "Why does the tool use pounds and inches?",
      answer:
        "The ADA chart is published in pounds and inches. The metric option converts your entries before comparing them with that chart.",
    },
  ],
  privacyNote:
    "Your answers are used only in this browser tab to calculate the score. Nothing is uploaded or stored on our servers.",
  related: ["findrisc-diabetes-risk", "ascvd-risk-estimator"],
  updated: "2026-11-24",
};
