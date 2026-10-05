/**
 * Sanskrit Curriculum & Lexicon Data for Sanskrit Guru AI
 * Project: AI-Enabled Technologies for Sanskrit using Natural Language Processing
 * 100% Sanskrit focus. Expanded vocabulary, sentences, and comprehensive dictionary for Voice Bot.
 */

export const SANSKRIT_CURRICULUM = {
  langKey: "sanskrit",
  code: "SA",
  name: "Sanskrit",
  nativeName: "संस्कृतम्",
  accentColor: "#2E7D32",
  description: "Classical Indo-Aryan language with Devanagari script, phonemic vowel length, and precise Vedic consonants.",
  
  lessons: [
    {
      id: "sa_l1",
      number: "01",
      title: "Essential Greetings & Courtesy",
      summary: "नमस्ते, सुप्रभातम्, धन्यवादः, स्वागतम्",
      level: "Beginner",
      words: [
        {
          id: "sa_w1_1",
          text: "नमस्ते",
          script: "na-ma-ste",
          meaning: "Hello / Greetings",
          focus: "Akshara stress on ending 'ste'",
          units: ["na [न]", "ma [म]", "ste [स्ते]"]
        },
        {
          id: "sa_w1_2",
          text: "सुप्रभातम्",
          script: "su-pra-bhā-tam",
          meaning: "Good morning",
          focus: "Aspirated vowel and final anusvāra (म्)",
          units: ["su [सु]", "pra [प्र]", "bhā [भा]", "tam [तम्]"]
        },
        {
          id: "sa_w1_3",
          text: "शुभरात्रिः",
          script: "shu-bha-rā-triḥ",
          meaning: "Good night",
          focus: "Visarga (ः) breath release",
          units: ["shu [शु]", "bha [भ]", "rā [रा]", "triḥ [त्रिः]"]
        },
        {
          id: "sa_w1_4",
          text: "धन्यवादः",
          script: "dhan-ya-vā-daḥ",
          meaning: "Thank you",
          focus: "Dental consonants & Visarga",
          units: ["dhan [धन्]", "ya [य]", "vā [वा]", "daḥ [दः]"]
        },
        {
          id: "sa_w1_5",
          text: "स्वागतम्",
          script: "svā-ga-tam",
          meaning: "Welcome",
          focus: "Semivowel conjunct 'svā'",
          units: ["svā [स्वा]", "ga [ग]", "tam [तम्]"]
        },
        {
          id: "sa_w1_6",
          text: "क्षम्यताम्",
          script: "kṣam-ya-tām",
          meaning: "Excuse me / Forgive me",
          focus: "Conjunct 'kṣ' and final 'tām'",
          units: ["kṣam [क्षम्]", "ya [य]", "tām [ताम्]"]
        },
        {
          id: "sa_w1_7",
          text: "पुनर्दर्शनाय",
          script: "pu-nar-dar-sha-nā-ya",
          meaning: "See you again / Goodbye",
          focus: "Repha (र्) and palatal 'sha'",
          units: ["pu [पु]", "nar [नर्]", "dar [दर्]", "sha [श]", "nā [ना]", "ya [य]"]
        },
        {
          id: "sa_w1_8",
          text: "आम्",
          script: "ām",
          meaning: "Yes",
          focus: "Dīrgha long vowel 'ā'",
          units: ["ām [आम्]"]
        },
        {
          id: "sa_w1_9",
          text: "न",
          script: "na",
          meaning: "No",
          focus: "Short hrasva vowel 'a'",
          units: ["na [न]"]
        },
        {
          id: "sa_w1_10",
          text: "साधु",
          script: "sā-dhu",
          meaning: "Good / Well done",
          focus: "Aspirated dental 'dhu'",
          units: ["sā [सा]", "dhu [धु]"]
        }
      ]
    },
    {
      id: "sa_l2",
      number: "02",
      title: "Pronouns & Identity",
      summary: "अहम्, त्वम्, सः, सा, तत्, अस्ति",
      level: "Beginner",
      words: [
        {
          id: "sa_w2_1",
          text: "अहम्",
          script: "a-ham",
          meaning: "I / Me",
          focus: "Initial short 'a' and anusvāra",
          units: ["a [अ]", "ham [हम्]"]
        },
        {
          id: "sa_w2_2",
          text: "त्वम्",
          script: "tvam",
          meaning: "You (singular)",
          focus: "Conjunct 'tva'",
          units: ["tvam [त्वम्]"]
        },
        {
          id: "sa_w2_3",
          text: "सः",
          script: "saḥ",
          meaning: "He / That (masculine)",
          focus: "Visarga breath 'aḥ'",
          units: ["saḥ [सः]"]
        },
        {
          id: "sa_w2_4",
          text: "सा",
          script: "sā",
          meaning: "She / That (feminine)",
          focus: "Long vowel 'ā'",
          units: ["sā [सा]"]
        },
        {
          id: "sa_w2_5",
          text: "तत्",
          script: "tat",
          meaning: "That (neuter)",
          focus: "Halanta stop 't'",
          units: ["tat [तत्]"]
        },
        {
          id: "sa_w2_6",
          text: "एतत्",
          script: "e-tat",
          meaning: "This (neuter)",
          focus: "Vowel 'e' + stop",
          units: ["e [ए]", "tat [तत्]"]
        },
        {
          id: "sa_w2_7",
          text: "किम्",
          script: "kim",
          meaning: "What?",
          focus: "Short vowel 'i' + 'm'",
          units: ["kim [किम्]"]
        },
        {
          id: "sa_w2_8",
          text: "अस्ति",
          script: "as-ti",
          meaning: "Is (exists)",
          focus: "Cluster 'sti'",
          units: ["as [अस्]", "ti [ति]"]
        },
        {
          id: "sa_w2_9",
          text: "नास्ति",
          script: "nās-ti",
          meaning: "Is not (na + asti)",
          focus: "Sandhi long vowel 'nās'",
          units: ["nās [नास्]", "ti [ति]"]
        },
        {
          id: "sa_w2_10",
          text: "अस्मि",
          script: "as-mi",
          meaning: "Am (to be)",
          focus: "Consonant cluster 'sm'",
          units: ["as [अस्]", "mi [मि]"]
        }
      ]
    },
    {
      id: "sa_l3",
      number: "03",
      title: "Numbers (1 to 10)",
      summary: "एकम्, द्वे, त्रीणि, चत्वारि, पञ्च",
      level: "Beginner",
      words: [
        { id: "sa_w3_1", text: "एकम्", script: "e-kam", meaning: "One (1)", focus: "Vowel 'e'", units: ["e [ए]", "kam [कम्]"] },
        { id: "sa_w3_2", text: "द्वे", script: "dve", meaning: "Two (2)", focus: "Conjunct 'dv'", units: ["dve [द्वे]"] },
        { id: "sa_w3_3", text: "त्रीणि", script: "trī-ṇi", meaning: "Three (3)", focus: "Retroflex 'ṇi'", units: ["trī [त्री]", "ṇi [णि]"] },
        { id: "sa_w3_4", text: "चत्वारि", script: "chat-vā-ri", meaning: "Four (4)", focus: "Palatal 'ch'", units: ["chat [चत्]", "vā [वा]", "ri [रि]"] },
        { id: "sa_w3_5", text: "पञ्च", script: "pañ-cha", meaning: "Five (5)", focus: "Nasal 'ñ'", units: ["pañ [पञ्]", "cha [च]"] },
        { id: "sa_w3_6", text: "षट्", script: "ṣaṭ", meaning: "Six (6)", focus: "Retroflex 'ṣ' and 'ṭ'", units: ["ṣaṭ [षट्]"] },
        { id: "sa_w3_7", text: "सप्त", script: "sap-ta", meaning: "Seven (7)", focus: "Cluster 'pt'", units: ["sap [सप्]", "ta [त]"] },
        { id: "sa_w3_8", text: "अष्ट", script: "aṣ-ṭa", meaning: "Eight (8)", focus: "Retroflex cluster 'ṣṭ'", units: ["aṣ [अष्]", "ṭa [ट]"] },
        { id: "sa_w3_9", text: "नव", script: "na-va", meaning: "Nine (9)", focus: "Balanced moras", units: ["na [न]", "va [व]"] },
        { id: "sa_w3_10", text: "दश", script: "da-sha", meaning: "Ten (10)", focus: "Palatal sibilant 'śa'", units: ["da [द]", "sha [श]"] }
      ]
    },
    {
      id: "sa_l4",
      number: "04",
      title: "Everyday Objects & Nature",
      summary: "जलम्, भोजनम्, पुस्तकम्, गृहम्, सूर्यः",
      level: "Elementary",
      words: [
        { id: "sa_w4_1", text: "जलम्", script: "ja-lam", meaning: "Water", focus: "Final anusvāra", units: ["ja [ज]", "lam [लम्]"] },
        { id: "sa_w4_2", text: "भोजनम्", script: "bho-ja-nam", meaning: "Food / Meal", focus: "Aspirated 'bh'", units: ["bho [भो]", "ja [ज]", "nam [नम्]"] },
        { id: "sa_w4_3", text: "पुस्तकम्", script: "pus-ta-kam", meaning: "Book", focus: "Cluster 'sta'", units: ["pus [पुस्]", "ta [त]", "kam [कम्]"] },
        { id: "sa_w4_4", text: "लेखनी", script: "le-kha-nī", meaning: "Pen", focus: "Aspirated 'kha'", units: ["le [ले]", "kha [ख]", "nī [नी]"] },
        { id: "sa_w4_5", text: "गृहम्", script: "gṛ-ham", meaning: "House / Home", focus: "Vocalic 'ṛ'", units: ["gṛ [गृ]", "ham [हम्]"] },
        { id: "sa_w4_6", text: "फलम्", script: "pha-lam", meaning: "Fruit", focus: "Aspirated 'pha'", units: ["pha [फ]", "lam [लम्]"] },
        { id: "sa_w4_7", text: "पुष्पम्", script: "puṣ-pam", meaning: "Flower", focus: "Retroflex 'ṣpa'", units: ["puṣ [पुष्]", "pam [पम्]"] },
        { id: "sa_w4_8", text: "वृक्षः", script: "vṛk-ṣaḥ", meaning: "Tree", focus: "Vocalic 'ṛ' + visarga", units: ["vṛk [वृक्]", "ṣaḥ [षः]"] },
        { id: "sa_w4_9", text: "सूर्यः", script: "sūr-yaḥ", meaning: "Sun", focus: "Long 'ū' + repha", units: ["sūr [सूर्]", "yaḥ [यः]"] },
        { id: "sa_w4_10", text: "चन्द्रः", script: "chan-draḥ", meaning: "Moon", focus: "Conjunct 'ndra'", units: ["chan [चन्]", "draḥ [द्रः]"] }
      ]
    },
    {
      id: "sa_l5",
      number: "05",
      title: "Basic Actions & Verbs",
      summary: "गच्छति, आगच्छति, पठति, लिखति",
      level: "Elementary",
      words: [
        { id: "sa_w5_1", text: "गच्छति", script: "gach-cha-ti", meaning: "Goes", focus: "Palatal stop cluster 'ccha'", units: ["gach [गच्]", "cha [छ]", "ti [ति]"] },
        { id: "sa_w5_2", text: "आगच्छति", script: "ā-gach-cha-ti", meaning: "Comes", focus: "Prefix 'ā'", units: ["ā [आ]", "gach [गच्]", "cha [छ]", "ti [ति]"] },
        { id: "sa_w5_3", text: "पठति", script: "pa-ṭha-ti", meaning: "Reads / Studies", focus: "Aspirated retroflex 'ṭha'", units: ["pa [प]", "ṭha [ठ]", "ti [ति]"] },
        { id: "sa_w5_4", text: "लिखति", script: "li-kha-ti", meaning: "Writes", focus: "Aspirated velar 'kha'", units: ["li [लि]", "kha [ख]", "ti [ति]"] },
        { id: "sa_w5_5", text: "वदति", script: "va-da-ti", meaning: "Speaks", focus: "Balanced dental 'da'", units: ["va [व]", "da [द]", "ti [ति]"] },
        { id: "sa_w5_6", text: "पश्यति", script: "pash-ya-ti", meaning: "Sees / Looks", focus: "Palatal sibilant 'sh'", units: ["pash [पश्]", "ya [य]", "ti [ति]"] },
        { id: "sa_w5_7", text: "करोति", script: "ka-ro-ti", meaning: "Does / Performs", focus: "Clear 'ro' vowel", units: ["ka [क]", "ro [रो]", "ti [ति]"] },
        { id: "sa_w5_8", text: "खादति", script: "khā-da-ti", meaning: "Eats", focus: "Aspirated 'khā'", units: ["khā [खा]", "da [द]", "ti [ति]"] },
        { id: "sa_w5_9", text: "पिबति", script: "pi-ba-ti", meaning: "Drinks", focus: "Short 'i'", units: ["pi [पि]", "ba [ब]", "ti [ति]"] },
        { id: "sa_w5_10", text: "तिष्ठति", script: "tiṣ-ṭha-ti", meaning: "Stands / Stays", focus: "Retroflex 'ṣṭha'", units: ["tiṣ [तिष्]", "ṭha [ठ]", "ti [ति]"] }
      ]
    }
  ],

  sentences: [
    {
      id: "sa_s1",
      text: "अहं छात्रः अस्मि।",
      script: "a-haṃ chā-traḥ as-mi.",
      meaning: "I am a student.",
      tip: "Notice the Visarga (ः) breath in छात्रः."
    },
    {
      id: "sa_s2",
      text: "भवतः नाम किम्?",
      script: "bha-va-taḥ nā-ma kim?",
      meaning: "What is your name? (polite masculine)",
      tip: "Keep the vowel 'ā' in नाम open and distinct."
    },
    {
      id: "sa_s3",
      text: "भवत्याः नाम किम्?",
      script: "bha-vat-yāḥ nā-ma kim?",
      meaning: "What is your name? (polite feminine)",
      tip: "Aspirated release on 'bhavatyāḥ'."
    },
    {
      id: "sa_s4",
      text: "मम नाम आनन्दः अस्ति।",
      script: "ma-ma nā-ma ā-nan-daḥ as-ti.",
      meaning: "My name is Anand.",
      tip: "Gentle visarga release at the end of आनन्दः."
    },
    {
      id: "sa_s5",
      text: "भवान् कुत्र गच्छति?",
      script: "bha-vān kut-ra gach-cha-ti?",
      meaning: "Where are you going?",
      tip: "Conjunct 'tra' and crisp ending 'ti'."
    },
    {
      id: "sa_s6",
      text: "अहं विद्यालयं गच्छामि।",
      script: "a-haṃ vid-yā-la-yaṃ gach-chhā-mi.",
      meaning: "I am going to school.",
      tip: "First person verb ending 'gacchāmi'."
    },
    {
      id: "sa_s7",
      text: "इदं पुस्तकं अतीव सुन्दरम् अस्ति।",
      script: "i-daṃ pus-ta-kaṃ at-ī-va sun-da-ram as-ti.",
      meaning: "This book is very beautiful.",
      tip: "Smooth conjunct articulation in 'pustakam' and 'asti'."
    },
    {
      id: "sa_s8",
      text: "जलं पिबतु कृपया।",
      script: "ja-laṃ pi-ba-tu kṛ-pa-yā.",
      meaning: "Please drink water.",
      tip: "Imperative polite ending 'pibatu'."
    },
    {
      id: "sa_s9",
      text: "अद्य शुभदिनम् अस्ति।",
      script: "ad-ya shu-bha-di-nam as-ti.",
      meaning: "Today is an auspicious day.",
      tip: "Conjunct 'dya' in adya."
    },
    {
      id: "sa_s10",
      text: "सत्यं वद, धर्मं चर।",
      script: "sat-yaṃ va-da, dhar-maṃ cha-ra.",
      meaning: "Speak the truth, practice righteousness.",
      tip: "Classical Upanishadic dictum. Clear anusvara."
    },
    {
      id: "sa_s11",
      text: "विद्या ददाति विनयम्।",
      script: "vid-yā da-dā-ti vi-na-yam.",
      meaning: "Knowledge bestows humility.",
      tip: "Dīrgha 'dā' vowel in 'dadāti'."
    },
    {
      id: "sa_s12",
      text: "अहं संस्कृतं पठामि।",
      script: "a-haṃ saṃs-kṛ-taṃ pa-ṭhā-mi.",
      meaning: "I study Sanskrit.",
      tip: "Aspirated retroflex 'ṭhā' in paṭhāmi."
    }
  ]
};

/**
 * Extensive Dictionary & Conversational Knowledge Base for the AI Voice Bot.
 * Allows recognition of queries in English, Hindi, and Sanskrit.
 */
export const SANSKRIT_VOICE_KNOWLEDGE_BASE = [
  // Greetings & Courtesies
  {
    keywords: ["hello", "hi", "hey", "greet", "greeting", "namaste", "नमस्ते", "नमस्कार", "pranam"],
    sanskrit: "नमस्ते",
    iast: "namaste",
    meaning: "Hello / I bow to you",
    speechText: "In Sanskrit, hello or greetings is नमस्ते (Namaste). It signifies 'I bow to the divine within you'. Let's repeat: Namaste.",
    note: "Used at any time of day to greet respectfully."
  },
  {
    keywords: ["good morning", "morning", "सुप्रभात", "सुप्रभातम्", "subah"],
    sanskrit: "सुप्रभातम्",
    iast: "suprabhātam",
    meaning: "Good morning",
    speechText: "Good morning in Sanskrit is सुप्रभातम् (Suprabhātam). It translates to 'wishing you an auspicious dawn'.",
    note: "Derived from 'su' (good/auspicious) + 'prabhātam' (dawn/morning)."
  },
  {
    keywords: ["good night", "night", "शुभरात्रि", "शुभरात्रिः", "raat"],
    sanskrit: "शुभरात्रिः",
    iast: "shubharātriḥ",
    meaning: "Good night",
    speechText: "Good night in Sanskrit is शुभरात्रिः (Shubharātriḥ). Remember to aspirate the gentle Visarga breath at the end: trih.",
    note: "Notice the visarga (ः) after tri."
  },
  {
    keywords: ["thank you", "thanks", "dhanyavad", "dhanyavada", "धन्यवाद", "धन्यवादः", "shukriya"],
    sanskrit: "धन्यवादः",
    iast: "dhanyavādaḥ",
    meaning: "Thank you / Gratitude",
    speechText: "Thank you in Sanskrit is धन्यवादः (Dhanyavādaḥ). It conveys blessing and deep appreciation.",
    note: "From 'dhanya' (blessed/virtuous) + 'vāda' (expression)."
  },
  {
    keywords: ["welcome", "swagatam", "स्वागतम्", "swagat"],
    sanskrit: "स्वागतम्",
    iast: "svāgatam",
    meaning: "Welcome",
    speechText: "Welcome in Sanskrit is स्वागतम् (Svāgatam). It combines 'su' (well) and 'āgatam' (arrived).",
    note: "Auspicious arrival."
  },
  {
    keywords: ["please", "kripaya", "कृपया"],
    sanskrit: "कृपया",
    iast: "kṛpayā",
    meaning: "Please (by kindness)",
    speechText: "Please in Sanskrit is कृपया (Kṛpayā). Literally meaning 'through your kindness or grace'.",
    note: "Instrumental singular of kṛpā (grace)."
  },
  {
    keywords: ["sorry", "forgive", "excuse", "maaf", "क्षमा", "क्षम्यताम्"],
    sanskrit: "क्षम्यताम्",
    iast: "kṣamyatām",
    meaning: "Forgive me / Excuse me",
    speechText: "To say forgive me or excuse me, use क्षम्यताम् (Kṣamyatām).",
    note: "Passive imperative form meaning 'let me be forgiven'."
  },
  {
    keywords: ["goodbye", "bye", "see you", "alvida", "पुनर्दर्शनाय"],
    sanskrit: "पुनर्दर्शनाय",
    iast: "punardarśanāya",
    meaning: "Until we see each other again / Goodbye",
    speechText: "In Sanskrit we don't say permanent goodbye, we say पुनर्दर्शनाय (Punardarśanāya) — 'until we meet again'.",
    note: "Punar (again) + darśanāya (for viewing)."
  },
  {
    keywords: ["yes", "haan", "आम्"],
    sanskrit: "आम्",
    iast: "ām",
    meaning: "Yes",
    speechText: "Yes in Sanskrit is आम् (Ām). Prolong the long 'ā' vowel.",
    note: "Affirmative particle."
  },
  {
    keywords: ["no", "nahin", "nahi", "न"],
    sanskrit: "न",
    iast: "na",
    meaning: "No / Not",
    speechText: "No in Sanskrit is simply न (Na). Short and crisp.",
    note: "Negative particle."
  },

  // Everyday Nature & Objects
  {
    keywords: ["water", "pani", "paani", "जलम्", "जल", "water in sanskrit"],
    sanskrit: "जलम्",
    iast: "jalam",
    meaning: "Water",
    speechText: "Water in Sanskrit is जलम् (Jalam). Other classical synonyms include वारि (vāri) and तोयम् (toyam).",
    note: "Neuter noun ending in anusvāra."
  },
  {
    keywords: ["food", "meal", "khana", "bhojan", "भोजनम्", "अन्नम्"],
    sanskrit: "भोजनम्",
    iast: "bhojanam",
    meaning: "Food / Meal",
    speechText: "Food or meal in Sanskrit is भोजनम् (Bhojanam), or sacred grain अन्नम् (Annam).",
    note: "Root: bhuj (to enjoy / consume)."
  },
  {
    keywords: ["book", "kitab", "pustak", "पुस्तकम्"],
    sanskrit: "पुस्तकम्",
    iast: "pustakam",
    meaning: "Book",
    speechText: "Book in Sanskrit is पुस्तकम् (Pustakam). Pronounce the conjunct cluster sta cleanly.",
    note: "Neuter noun."
  },
  {
    keywords: ["tree", "ped", "per", "vriksh", "वृक्षः", "तरुः"],
    sanskrit: "वृक्षः",
    iast: "vṛkṣaḥ",
    meaning: "Tree",
    speechText: "Tree in Sanskrit is वृक्षः (Vṛkṣaḥ). Notice the vocalic ṛ and ending visarga breath: vrik-shah.",
    note: "Masculine noun."
  },
  {
    keywords: ["sun", "surya", "sooraj", "suraj", "सूर्यः", "रविः"],
    sanskrit: "सूर्यः",
    iast: "sūryaḥ",
    meaning: "Sun",
    speechText: "The Sun in Sanskrit is सूर्यः (Sūryaḥ) or रविः (Raviḥ). It symbolizes illumination and cosmic energy.",
    note: "Long ū followed by repha (r) over ya."
  },
  {
    keywords: ["moon", "chandra", "chand", "chandrama", "चन्द्रः"],
    sanskrit: "चन्द्रः",
    iast: "candraḥ",
    meaning: "Moon",
    speechText: "The Moon in Sanskrit is चन्द्रः (Chandraḥ) or सोमः (Somaḥ).",
    note: "From the root cand (to shine/gladden)."
  },
  {
    keywords: ["house", "home", "ghar", "makaan", "गृहम्", "सदनम्"],
    sanskrit: "गृहम्",
    iast: "gṛham",
    meaning: "House / Home",
    speechText: "House or home in Sanskrit is गृहम् (Gṛham). The initial sound is gṛ with the vocalic r.",
    note: "Neuter noun."
  },
  {
    keywords: ["flower", "phool", "fool", "pushpa", "पुष्पम्", "कुसुमम्"],
    sanskrit: "पुष्पम्",
    iast: "puṣpam",
    meaning: "Flower",
    speechText: "Flower in Sanskrit is पुष्पम् (Puṣpam) or कुसुमम् (Kusumam). Pronounce the retroflex ṣp distinctly.",
    note: "Neuter noun."
  },
  {
    keywords: ["fruit", "fal", "phal", "फलम्"],
    sanskrit: "फलम्",
    iast: "phalam",
    meaning: "Fruit / Result",
    speechText: "Fruit in Sanskrit is फलम् (Phalam). It also means result or fruit of an action, as in karma-phalam.",
    note: "Aspirated 'pha'."
  },
  {
    keywords: ["school", "vidyalaya", "school in sanskrit", "विद्यालयः", "पाठशाला"],
    sanskrit: "विद्यालयः",
    iast: "vidyālayaḥ",
    meaning: "School (abode of knowledge)",
    speechText: "School in Sanskrit is विद्यालयः (Vidyālayaḥ) — literally the abode (ālaya) of knowledge (vidyā).",
    note: "Sandhi: vidyā + ālayaḥ."
  },
  {
    keywords: ["pen", "kalam", "pen in sanskrit", "लेखनी"],
    sanskrit: "लेखनी",
    iast: "lekhanī",
    meaning: "Pen / Writing instrument",
    speechText: "Pen or writing instrument in Sanskrit is लेखनी (Lekhanī).",
    note: "Feminine noun with long ī."
  },

  // People & Relationships
  {
    keywords: ["student", "pupil", "vidyarthi", "chatra", "छात्रः", "छात्रा"],
    sanskrit: "छात्रः (M) / छात्रा (F)",
    iast: "chātraḥ / chātrā",
    meaning: "Student (male / female)",
    speechText: "Student in Sanskrit is छात्रः (Chātraḥ) for a male student, and छात्रा (Chātrā) for a female student.",
    note: "From root chatra (protection/covering of guru)."
  },
  {
    keywords: ["teacher", "guru", "shikshak", "शिक्षकः", "गुरुः", "आचार्यः"],
    sanskrit: "गुरुः / शिक्षकः",
    iast: "guruḥ / śikṣakaḥ",
    meaning: "Teacher / Spiritual Master",
    speechText: "Teacher in Sanskrit is शिक्षकः (Śikṣakaḥ) or revered Master गुरुः (Guruḥ). Guru literally dispels darkness.",
    note: "Gu (darkness) + ru (dispeller)."
  },
  {
    keywords: ["friend", "dost", "mitra", "मित्रम्", "सखा"],
    sanskrit: "मित्रम्",
    iast: "mitram",
    meaning: "Friend",
    speechText: "Friend in Sanskrit is मित्रम् (Mitram) as neuter noun, or सखा (Sakhā) as masculine.",
    note: "Neuter noun mitram."
  },
  {
    keywords: ["mother", "maa", "mata", "माता", "जननी"],
    sanskrit: "माता / जननी",
    iast: "mātā / jananī",
    meaning: "Mother",
    speechText: "Mother in Sanskrit is माता (Mātā) or जननी (Jananī) — the bearer of life.",
    note: "Vedic root mātṛ."
  },
  {
    keywords: ["father", "pita", "pitaji", "पिता", "जनकः"],
    sanskrit: "पिता / जनकः",
    iast: "pitā / janakaḥ",
    meaning: "Father",
    speechText: "Father in Sanskrit is पिता (Pitā) or जनकः (Janakaḥ) — the creator.",
    note: "Vedic root pitṛ."
  },

  // Sentences & Questions
  {
    keywords: ["how are you", "katham asti", "kese ho", "kaise ho", "कथम् अस्ति", "कुशलम्"],
    sanskrit: "भवान् कथम् अस्ति? (M) / भवती कथम् अस्ति? (F)",
    iast: "bhavān katham asti? / bhavatī katham asti?",
    meaning: "How are you? (To male / To female)",
    speechText: "To ask 'How are you?' in Sanskrit: For a male, ask भवान् कथम् अस्ति? (Bhavān katham asti?). For a female, ask भवती कथम् अस्ति? (Bhavatī katham asti?). Reply with कुशलम् (Kuśalam) — 'I am well!'.",
    note: "Kuśalam = I am fine."
  },
  {
    keywords: ["what is your name", "aapka naam", "naam kya hai", "name in sanskrit", "भवतः नाम किम्"],
    sanskrit: "भवतः नाम किम्? (M) / भवत्याः नाम किम्? (F)",
    iast: "bhavataḥ nāma kim? / bhavatyāḥ nāma kim?",
    meaning: "What is your name? (polite masculine / feminine)",
    speechText: "To ask 'What is your name?': Ask a man: भवतः नाम किम्? (Bhavataḥ nāma kim?). Ask a woman: भवत्याः नाम किम्? (Bhavatyāḥ nāma kim?). Reply with: मम नाम ... अस्ति (Mama nāma ... asti).",
    note: "Mama nāma = My name is..."
  },
  {
    keywords: ["my name is", "mera naam", "i am", "मम नाम"],
    sanskrit: "मम नाम ... अस्ति।",
    iast: "mama nāma ... asti.",
    meaning: "My name is [name].",
    speechText: "To say your name in Sanskrit, say: मम नाम [your name] अस्ति (Mama nāma ... asti). For example: मम नाम आनन्दः अस्ति (Mama nāma Ānandaḥ asti).",
    note: "Mama = My, nāma = name, asti = is."
  },
  {
    keywords: ["i am a student", "main chhatra hoon", "aham chatrah asmi", "अहं छात्रः अस्मि"],
    sanskrit: "अहं छात्रः अस्मि। (M) / अहं छात्रा अस्मि। (F)",
    iast: "ahaṃ chātraḥ asmi / ahaṃ chātrā asmi",
    meaning: "I am a student (male / female).",
    speechText: "I am a student in Sanskrit is: अहं छात्रः अस्मि (Ahaṁ chātraḥ asmi) for a male, and अहं छात्रा अस्मि (Ahaṁ chātrā asmi) for a female.",
    note: "Aham = I, asmi = am."
  },
  {
    keywords: ["i study sanskrit", "i learn sanskrit", "main sanskrit padhta hoon", "अहं संस्कृतं पठामि"],
    sanskrit: "अहं संस्कृतं पठामि।",
    iast: "ahaṃ saṃskṛtaṃ paṭhāmi.",
    meaning: "I study / read Sanskrit.",
    speechText: "I study Sanskrit is अहं संस्कृतं पठामि (Ahaṁ Saṁskṛtaṁ paṭhāmi). 'Paṭhāmi' is first-person present tense for 'I study'.",
    note: "From root paṭh (to read/study)."
  },
  {
    keywords: ["where are you going", "kahan ja rahe ho", "kaha ja rahe ho", "कुत्र गच्छति"],
    sanskrit: "भवान् कुत्र गच्छति? (M) / भवती कुत्र गच्छति? (F)",
    iast: "bhavān kutra gacchati? / bhavatī kutra gacchati?",
    meaning: "Where are you going?",
    speechText: "To ask 'Where are you going?', say: भवान् कुत्र गच्छति? (Bhavān kutra gacchati?) or भवती कुत्र गच्छति? (Bhavatī kutra gacchati?). 'Kutra' means where.",
    note: "Kutra = where, gacchati = goes."
  },
  {
    keywords: ["i am going to school", "main vidyalaya ja raha hoon", "अहं विद्यालयं गच्छामि"],
    sanskrit: "अहं विद्यालयं गच्छामि।",
    iast: "ahaṃ vidyālayaṃ gacchāmi.",
    meaning: "I am going to school.",
    speechText: "I am going to school is अहं विद्यालयं गच्छामि (Ahaṁ vidyālayaṁ gacchāmi). Notice the accusative ending 'vidyālayam'.",
    note: "Accusative destination."
  },
  {
    keywords: ["speak the truth", "satyam vada", "सत्यं वद धर्मं चर", "truth in sanskrit"],
    sanskrit: "सत्यं वद, धर्मं चर।",
    iast: "satyaṃ vada, dharmaṃ cara.",
    meaning: "Speak the truth, practice righteousness.",
    speechText: "The venerable Taittiriya Upanishad instructs: सत्यं वद, धर्मं चर (Satyaṁ vada, dharmaṁ cara) — 'Speak the truth, walk the righteous path'.",
    note: "Classical Taittirīya Upaniṣad command."
  },
  {
    keywords: ["knowledge gives humility", "vidya dadati vinayam", "विद्या ददाति विनयम्"],
    sanskrit: "विद्या ददाति विनयम्।",
    iast: "vidyā dadāti vinayam.",
    meaning: "True knowledge bestows humility.",
    speechText: "The ancient wisdom states: विद्या ददाति विनयम् (Vidyā dadāti vinayam). Learning brings gentleness, from humility comes capability.",
    note: "From Hitopadeśa."
  },

  // Numbers
  {
    keywords: ["numbers", "counting", "ginti", "sankhya", "numbers in sanskrit", "1 to 10", "एकम्"],
    sanskrit: "एकम्, द्वे, त्रीणि, चत्वारि, पञ्च, षट्, सप्त, अष्ट, नव, दश",
    iast: "ekam (1), dve (2), trīṇi (3), catvāri (4), pañca (5), ṣaṭ (6), sapta (7), aṣṭa (8), nava (9), daśa (10)",
    meaning: "Numbers 1 to 10 in Sanskrit",
    speechText: "Here are Sanskrit numbers from 1 to 10: Ekam (1), Dve (2), Trīṇi (3), Chatvāri (4), Pañcha (5), Shaṭ (6), Sapta (7), Ashṭa (8), Nava (9), and Dasha (10).",
    note: "Neuter cardinal forms 1 to 10."
  },

  // Verbs & Actions
  {
    keywords: ["verbs", "actions", "kriya", "verb in sanskrit", "गच्छति", "पठति"],
    sanskrit: "गच्छति (goes), आगच्छति (comes), पठति (reads), लिखति (writes), पिबति (drinks)",
    iast: "gacchati, āgacchati, paṭhati, likhati, pibati",
    meaning: "Core Sanskrit Action Verbs",
    speechText: "Common third-person Sanskrit verbs end in 'ti': गच्छति (gacchati - goes), आगच्छति (āgacchati - comes), पठति (paṭhati - reads), and लिखति (likhati - writes).",
    note: "Laṭ-lakāra (Present tense) 3rd person singular."
  },

  // Philosophy & Concepts
  {
    keywords: ["peace", "shanti", "शांति", "शान्तिः"],
    sanskrit: "शान्तिः",
    iast: "śāntiḥ",
    meaning: "Peace / Serenity",
    speechText: "Peace in Sanskrit is शान्तिः (Śāntiḥ). It denotes the cessation of inner and outer turmoil. ॐ शान्तिः शान्तिः शान्तिः.",
    note: "From root śam (to become calm)."
  },
  {
    keywords: ["truth", "satya", "सच", "सत्य", "सत्यम्"],
    sanskrit: "सत्यम्",
    iast: "satyam",
    meaning: "Truth / That which exists eternally",
    speechText: "Truth in Sanskrit is सत्यम् (Satyam). It stems from 'sat', meaning reality and existence itself. सत्यमेव जयते — Truth alone triumphs.",
    note: "From root as (to be) -> sat (being)."
  },
  {
    keywords: ["karma", "karm", "कर्म"],
    sanskrit: "कर्म",
    iast: "karma",
    meaning: "Action / Deed / Universal Law of Cause & Effect",
    speechText: "कर्म (Karma) in Sanskrit literally means 'action or deed'. In philosophy, every deliberate action carries an impression that shapes the future.",
    note: "From root kṛ (to do/act)."
  },
  {
    keywords: ["dharma", "dharm", "धर्म", "धर्मः"],
    sanskrit: "धर्मः",
    iast: "dharmaḥ",
    meaning: "Righteous duty / Moral order / That which sustains",
    speechText: "धर्मः (Dharmaḥ) comes from the root 'dhṛ', meaning 'to sustain, uphold, or support'. It refers to cosmic order, universal law, and personal moral duty.",
    note: "Root: dhṛ (to uphold)."
  },
  {
    keywords: ["visarga", "colon", "dots", "विसर्गः", "what is visarga"],
    sanskrit: "विसर्गः (ः)",
    iast: "visargaḥ",
    meaning: "Unvoiced aspiration mark (ः)",
    speechText: "Visarga (विसर्गः) is the Sanskrit phonetic symbol represented by two vertical dots (ः). It is pronounced as a soft unvoiced breath echo of the preceding vowel. For example, रामः sounds like Rāma-ha.",
    note: "Aspirate release at the end of words."
  },
  {
    keywords: ["anusvara", "dot", "nasal", "अनुस्वारः", "what is anusvara"],
    sanskrit: "अनुस्वारः (ं)",
    iast: "anusvāraḥ",
    meaning: "Pure nasal vowel modifier (ं)",
    speechText: "Anusvāra (अनुस्वारः) is the dot placed above a Devanagari character (ं). It creates a sustained humming nasalization, adapting to the phonetic place of the succeeding consonant.",
    note: "Pure nasalization."
  },
  {
    keywords: ["shloka", "sloka", "mantra", "श्लोकः", "teach me a shloka"],
    sanskrit: "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
    iast: "oṃ asato mā sadgamaya | tamaso mā jyotirgamaya | mṛtyormā amṛtaṃ gamaya ||",
    meaning: "Lead me from ignorance to truth, from darkness to light, from death to immortality.",
    speechText: "Here is a timeless Vedic shloka from the Bṛhadāraṇyaka Upaniṣad: असतो मा सद्गमय, तमसो मा ज्योतिर्गमय, मृत्योर्मा अमृतं गमय. 'Lead us from the unreal to the real, from darkness to light, from mortality to immortality.'",
    note: "From Bṛhadāraṇyaka Upaniṣad."
  }
];
