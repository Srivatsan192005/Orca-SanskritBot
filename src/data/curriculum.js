/**
 * Curriculum Data for ORCA — Sanskrit Guru AI
 */

export const CURRICULUM_DATA = {
  lessons: [
    {
      id: 1,
      number: "01",
      title: "Greetings",
      sanskritSummary: "नमस्ते",
      completed: true,
      tier: "Beginner",
      words: [
        {
          id: "w1_1",
          sanskrit: "नमस्ते",
          meaning: "Hello / Greetings",
          pronunciation: "na-ma-ste",
          syllables: ["na [न]", "ma [म]", "ste [स्ते]"],
          phoneticFocus: "Syllables & Ending Stress",
          baselineScore: 82,
          defaultEvaluation: "Good",
          checks: [
            { pass: true, text: "Correct syllables" },
            { pass: true, text: "Correct vowel sound" },
            { pass: false, text: "Improve the final sound" }
          ],
          aiFeedback: "“Try saying the final syllable more clearly.”"
        },
        {
          id: "w1_2",
          sanskrit: "सुप्रभातम्",
          meaning: "Good morning",
          pronunciation: "su-pra-bhā-tam",
          syllables: ["su [सु]", "pra [प्र]", "bhā [भा]", "tam [तम्]"],
          phoneticFocus: "Aspiration & Anusvāra",
          baselineScore: 88,
          defaultEvaluation: "Very Good",
          checks: [
            { pass: true, text: "Clear initial sibilant" },
            { pass: true, text: "Vowel length accurate" },
            { pass: false, text: "Sustain the anusvāra nasalization" }
          ],
          aiFeedback: "“Great rhythm. Prolong the final nasal 'm' sound slightly.”"
        },
        {
          id: "w1_3",
          sanskrit: "शुभरात्रिः",
          meaning: "Good night",
          pronunciation: "shu-bha-rā-triḥ",
          syllables: ["shu [शु]", "bha [भ]", "rā [रा]", "triḥ [त्रिः]"],
          phoneticFocus: "Visarga (ः) breath",
          baselineScore: 79,
          defaultEvaluation: "Good",
          checks: [
            { pass: true, text: "Correct retroflex sibilant" },
            { pass: false, text: "Visarga (ः) breath too soft" },
            { pass: true, text: "Correct vowel duration" }
          ],
          aiFeedback: "“Pay attention to the visarga at the end of rātriḥ.”"
        }
      ]
    },
    {
      id: 2,
      number: "02",
      title: "Introducing Yourself",
      sanskritSummary: "अहं छात्रः अस्मि।",
      completed: true,
      tier: "Beginner",
      words: [
        {
          id: "w2_1",
          sanskrit: "अहं छात्रः अस्मि।",
          meaning: "I am a student.",
          pronunciation: "a-haṃ chā-traḥ as-mi",
          syllables: ["a-haṃ", "chā-traḥ", "as-mi"],
          phoneticFocus: "Visarga & Conjuncts",
          baselineScore: 76,
          defaultEvaluation: "Good attempt",
          checks: [
            { pass: true, text: "Clear sentence cadence" },
            { pass: false, text: "Aspiration on middle word छात्रः" },
            { pass: true, text: "Final verb अस्मि articulation clear" }
          ],
          aiFeedback: "“Good attempt. Practice the pronunciation of the middle word again.”"
        }
      ]
    },
    {
      id: 3,
      number: "03",
      title: "Numbers",
      sanskritSummary: "एकम्, द्वे, त्रीणि",
      completed: true,
      tier: "Beginner",
      words: [
        {
          id: "w3_1",
          sanskrit: "एकम्, द्वे, त्रीणि",
          meaning: "One, Two, Three",
          pronunciation: "e-kam, dve, trī-ṇi",
          syllables: ["e-kam", "dve", "trī-ṇi"],
          phoneticFocus: "Retroflex 'ṇi' & Numeric rhythm",
          baselineScore: 86,
          defaultEvaluation: "Very Good",
          checks: [
            { pass: true, text: "Clear numeric inflection" },
            { pass: true, text: "Correct retroflex 'ṇi'" },
            { pass: false, text: "Sharpen the initial vowel 'e'" }
          ],
          aiFeedback: "“Very crisp pronunciation of trīणि.”"
        }
      ]
    },
    {
      id: 4,
      number: "04",
      title: "Family",
      sanskritSummary: "माता, पिता, भ्राता",
      completed: true,
      tier: "Beginner",
      words: [
        {
          id: "w4_1",
          sanskrit: "माता, पिता, भ्राता",
          meaning: "Mother, Father, Brother",
          pronunciation: "mā-tā, pi-tā, bhrā-tā",
          syllables: ["mā-tā", "pi-tā", "bhrā-tā"],
          phoneticFocus: "Dīrgha vowels & Dental 't'",
          baselineScore: 84,
          defaultEvaluation: "Good",
          checks: [
            { pass: true, text: "Proper vowel lengthening (dīrgha)" },
            { pass: true, text: "Clear dental consonants" },
            { pass: false, text: "Aspirate the 'bh' in bhrātā" }
          ],
          aiFeedback: "“Ensure the 'bh' sound has adequate vocal cord vibration.”"
        }
      ]
    },
    {
      id: 5,
      number: "05",
      title: "Everyday Words",
      sanskritSummary: "जलम्, भोजनम्, पुस्तकम्",
      completed: false,
      tier: "Beginner",
      words: [
        {
          id: "w5_1",
          sanskrit: "जलम्",
          meaning: "Water",
          pronunciation: "ja-lam",
          syllables: ["ja [ज]", "lam [लम्]"],
          phoneticFocus: "Anusvāra (ं)",
          baselineScore: 88,
          defaultEvaluation: "Very Good",
          checks: [
            { pass: true, text: "Pure vowel articulation" },
            { pass: true, text: "Precise palatal consonant" },
            { pass: false, text: "Pronounce final nasal clearly" }
          ],
          aiFeedback: "“Nice attempt! Your pronunciation is 88% accurate. Try to pronounce the final sound more clearly.”"
        },
        {
          id: "w5_2",
          sanskrit: "भोजनम्",
          meaning: "Food / Meal",
          pronunciation: "bho-ja-nam",
          syllables: ["bho [भो]", "ja [ज]", "nam [नम्]"],
          phoneticFocus: "Aspirated 'bh' & Vowel 'o'",
          baselineScore: 85,
          defaultEvaluation: "Good",
          checks: [
            { pass: true, text: "Accurate aspirated 'bh'" },
            { pass: true, text: "Correct syllable timing" },
            { pass: true, text: "Proper nasal ending" }
          ],
          aiFeedback: "“Steady pace and accurate vowel duration.”"
        },
        {
          id: "w5_3",
          sanskrit: "पुस्तकम्",
          meaning: "Book",
          pronunciation: "pus-ta-kam",
          syllables: ["pus [पुस्]", "ta [त]", "kam [कम्]"],
          phoneticFocus: "Consonant cluster (स्त)",
          baselineScore: 91,
          defaultEvaluation: "Excellent",
          checks: [
            { pass: true, text: "Exact conjunct consonant cluster" },
            { pass: true, text: "Short 'u' sound preserved" },
            { pass: true, text: "Final anusvara well formed" }
          ],
          aiFeedback: "“Excellent cluster pronunciation on 'sta'.”"
        }
      ]
    },
    {
      id: 6,
      number: "06",
      title: "Daily Inquiries",
      sanskritSummary: "किं भवति? कुशलं वा?",
      completed: false,
      tier: "Intermediate",
      words: [
        {
          id: "w6_1",
          sanskrit: "किं भवति?",
          meaning: "What is happening?",
          pronunciation: "kim bha-va-ti?",
          syllables: ["kim", "bha-va-ti"],
          phoneticFocus: "Interrogative Inflection",
          baselineScore: 80,
          defaultEvaluation: "Good",
          checks: [
            { pass: true, text: "Correct interrogative pitch" },
            { pass: true, text: "Correct vowel 'i'" },
            { pass: false, text: "Soft dental 't'" }
          ],
          aiFeedback: "“Keep the ending vowel short and crisp.”"
        }
      ]
    },
    {
      id: 7,
      number: "07",
      title: "Basic Actions",
      sanskritSummary: "गच्छति, आगच्छति, पठति",
      completed: false,
      tier: "Intermediate",
      words: [
        {
          id: "w7_1",
          sanskrit: "गच्छति",
          meaning: "Goes / Is going",
          pronunciation: "gach-cha-ti",
          syllables: ["gach", "cha", "ti"],
          phoneticFocus: "Double palatal stop (च्छ)",
          baselineScore: 83,
          defaultEvaluation: "Good",
          checks: [
            { pass: true, text: "Aspirated 'chha' emphasized" },
            { pass: true, text: "Voiced initial velar 'g'" },
            { pass: false, text: "Maintain dental 'ti'" }
          ],
          aiFeedback: "“Pay attention to the slight pause in the conjunct 'ccha'.”"
        }
      ]
    }
  ],

  practiceSentences: [
    {
      id: 1,
      sanskrit: "अहं छात्रः अस्मि।",
      meaning: "I am a student.",
      phonetics: "a-haṃ chā-traḥ as-mi",
      baselineAccuracy: 76,
      feedback: "Good attempt. Practice the pronunciation of the middle word again.",
      defect: "Notice the Visarga (ः) sound in छात्रः (chā-traḥ). Release gentle breath at the end."
    },
    {
      id: 2,
      sanskrit: "भवतः नाम किम्?",
      meaning: "What is your name?",
      phonetics: "bha-va-taḥ nā-ma kim",
      baselineAccuracy: 85,
      feedback: "Well articulated. Notice the interrogative inflection.",
      defect: "Keep the vowel 'ā' in नाम open and distinct from short 'a'."
    },
    {
      id: 3,
      sanskrit: "मम नाम आनन्दः।",
      meaning: "My name is Anand.",
      phonetics: "ma-ma nā-ma ā-nan-daḥ",
      baselineAccuracy: 89,
      feedback: "Strong pronunciation throughout the sentence.",
      defect: "Maintain the gentle visarga release at the end of आनन्दः."
    }
  ]
};
