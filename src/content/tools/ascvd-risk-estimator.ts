import type { ToolContent } from "./types";

export const ascvdRiskEstimatorContent: ToolContent = {
  slug: "ascvd-risk-estimator",
  title: "ASCVD Risk Estimator",
  description:
    "How the US Pooled Cohort Equations estimate 10-year heart attack and stroke risk, and why the result needs careful interpretation.",
  intro:
    "The ASCVD Risk Estimator uses the Pooled Cohort Equations published with the 2013 ACC/AHA cardiovascular risk guideline. ASCVD means atherosclerotic cardiovascular disease. In this context it refers to a first hard event: nonfatal heart attack, death from coronary heart disease, or fatal or nonfatal stroke. The result is a 10-year estimate for adults without known ASCVD.",
  sections: [
    {
      heading: "Who the equation was built for",
      paragraphs: [
        "The source equation was developed for non-Hispanic White and non-Hispanic African American adults aged 40 to 79 in the United States. It uses age, sex, total cholesterol, HDL cholesterol, systolic blood pressure, whether blood pressure is treated, current smoking and diabetes history. It does not use LDL cholesterol directly, family history, kidney function or inflammatory markers.",
        "This tool asks you to choose a country and a race category because the source only published coefficients for those groups. If you select another country or need another race category, the tool will not show a number. Some later guidelines and tools use different equations and may be more suitable. Ask a clinician which approach fits your situation.",
      ],
    },
    {
      heading: "The formula explained",
      paragraphs: [
        "The equation first builds a sum from transformed inputs. Age, cholesterol, HDL and systolic pressure are used as natural logarithms. Several terms multiply those logarithms together, so the effect of one value depends on another value. Smoking and diabetes are entered as yes or no values. Blood pressure uses one coefficient when untreated and another when medicine is taken.",
        "The final step converts that sum into a percentage: estimated risk = 100 × (1 − baseline survival ^ e^(sum − mean)). The baseline survival and the mean sum are different for each sex and race group. The coefficients are not interchangeable between groups. This tool applies the published table values directly and does not add risk enhancers or clinical judgement.",
      ],
    },
    {
      heading: "Worked example: White woman",
      paragraphs: [
        "The guideline table gives an example of a 55-year-old White woman with total cholesterol 213 mg/dL, HDL 50 mg/dL, untreated systolic pressure 120 mm Hg, who does not smoke and does not have diabetes. Her individual sum is about −29.67. The mean sum for her group is −29.18 and the group baseline survival is 0.9665. Applying the formula gives about 2.1% over 10 years.",
      ],
    },
    {
      heading: "Worked example: African American woman",
      paragraphs: [
        "The same risk factor profile in the published African American women equation uses a different set of coefficients, a mean sum of 86.61 and a baseline survival of 0.9533. The table result is about 3.0%. The difference shows why race-specific coefficients cannot be swapped or treated as a minor detail. It also shows why any result should be read as a population-based estimate, not a statement about what will happen to one person.",
      ],
    },
    {
      heading: "How to read the percentage",
      paragraphs: [
        "The result is the estimated chance of a first hard ASCVD event during the next 10 years among people with the same measured risk factors. A 10% estimate does not mean 10% of your body is affected or that the outcome is certain. It also does not say how severe an event would be.",
        "For communication, many US resources describe below 5% as low, 5% to below 7.5% as borderline, 7.5% to below 20% as intermediate, and 20% or higher as high. These bands are a way to discuss risk. They are not treatment instructions. Decisions about statins, blood pressure medicine or further tests depend on guidelines, repeat measurements and a clinical conversation.",
      ],
    },
    {
      heading: "Limitations and safe use",
      paragraphs: [
        "The equations may overestimate or underestimate risk for some people. The source paper notes that risk can be lower than predicted in some Asian American groups and higher in some other groups. People with familial hypercholesterolemia, chronic kidney disease, a history of preeclampsia, inflammatory disorders or other risk enhancers may need a different assessment. People with existing heart disease or stroke are not candidates for this first-event tool.",
        "Blood pressure and cholesterol vary from day to day. Use average measurements where possible. Cholesterol is reported in mg/dL because the published equation uses those units. If your results are in mmol/L, convert them before using the tool.",
        "The source is Goff et al., 2013 ACC/AHA Guideline on the Assessment of Cardiovascular Risk, Circulation, doi:10.1161/01.cir.0000437741.48606.98, published online 2013 and in print 2014. This page was checked on 24 November 2026. Talk to a qualified healthcare professional before acting on a result.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does this estimate diagnose heart disease?",
      answer:
        "No. It estimates the chance of a first hard ASCVD event in people without known ASCVD. Symptoms or a prior diagnosis need clinical assessment.",
    },
    {
      question: "Why is it limited to the United States?",
      answer:
        "The Pooled Cohort Equations were developed from US cohort data and published for US White and African American adults. Other countries use different equations.",
    },
    {
      question: "Why do I need to choose a race category?",
      answer:
        "The published equations have separate coefficients and baseline values for White and African American adults. Choosing the wrong group changes the result.",
    },
    {
      question: "Can I lower the number by stopping blood pressure medicine?",
      answer:
        "No. Do not change medicine to alter this estimate. Treatment status is part of the equation because treated pressure is modelled differently.",
    },
    {
      question: "Does it include family history?",
      answer:
        "No. The source equation does not include family history. A clinician may consider it separately as a risk enhancer.",
    },
    {
      question: "What should I do with a high result?",
      answer:
        "Book a conversation with a healthcare professional. Bring your measurements and medicines list. Do not start or stop treatment based only on this number.",
    },
  ],
  privacyNote:
    "Your health answers stay in this browser tab. The calculation happens locally and is not uploaded or stored on our servers.",
  related: ["type-2-diabetes-risk-test", "findrisc-diabetes-risk"],
  updated: "2026-11-24",
};
