---
name: health-library
description: The Growth Framework's checked library of mind exercises, yoga asanas, vitamins and minerals (daily amounts and upper limits), electrolytes, adaptogens (including salajeet), and fruit and herbs. Use whenever a carousel, reel, article, caption or answer touches breathing, stress, anxiety, CBT, yoga, stretching, supplements, minerals, ashwagandha, fruit, herbs or spices, so every piece uses the same facts, evidence wording and safety notes.
---

# Health library

One set of facts for the website, Instagram and chat answers. Read the source file for the topic, reuse its wording, and do not invent new numbers or claims.

## Where the facts live

| Topic | File | What is there |
|---|---|---|
| Mind exercises (7) | `growth-framework/src/practice.mjs` → `MIND_EXERCISES` | Box breathing, cyclic sighing, 5-4-3-2-1 grounding, CBT thought record, worry time, body scan, expressive writing. Each has time, when to use, steps, evidence, caution |
| Yoga asanas (10) and routine | `growth-framework/src/practice.mjs` → `ASANAS`, `ROUTINE` | English and Sanskrit names, steps, hold time, what it works, who should take care; 15-minute beginner routine |
| Sources for both | `growth-framework/src/practice.mjs` → `PRACTICE_SOURCES` | Balban 2023, Goyal 2014, Frattaroli 2006, Cochrane 2022, NICE CG113 |
| Fruit and herbs | `growth-framework/src/foundations.mjs` → Body, `fruit-herbs` | 10 Pakistani fruits, 8 kitchen herbs and spices, evidence strength, cautions |
| Vitamins and minerals | `growth-framework/src/foundations.mjs` → Body, `vitamins-minerals` | Daily amounts for adults, upper limits, Pakistani food sources |
| Electrolytes | `growth-framework/src/foundations.mjs` → Body, `electrolytes` | Sodium and potassium amounts, ORS, who should check first |
| Adaptogens | `growth-framework/src/foundations.mjs` → Body, `adaptogens` | Ashwagandha, rhodiola, tulsi, ginseng, salajeet: amounts used in studies, evidence strength, cautions |

Live pages: `thegrowthframework.live/mind#exercises`, `/body#yoga`, `/body#fruit-herbs`, `/body#vitamins-minerals`, `/body#adaptogens`. Link to these from captions and carousels.

## Rules (always)

1. **Keep the evidence word.** Carry over the library's strength words exactly: "promising, not proven", "small trials", "low", "very low", "mixed". Never upgrade them ("proven", "clinically shown", "cures", "boosts immunity").
2. **Every exercise, pose or herb keeps its caution.** If a slide or reel shows one, its "Take care" or "Note" line goes with it, even if shortened.
3. **Study doses are not advice.** Say "amount used in studies", never "take X mg".
4. **No treatment claims.** Exercises, yoga, fruit and herbs support health; they do not treat anxiety disorders, depression, diabetes or blood pressure. Point to a doctor for those.
5. **Doctor line.** Anything on supplements, herbs in large amounts, or yoga for people with conditions ends with: talk to a doctor first if you are pregnant, take regular medicine, or have a health condition.
6. **Pakistan context.** Use local names (amrood, haldi, kalonji, salajeet), local foods and local conditions (summer heat, Ramadan, iodised salt).
7. **Adding something new.** Add it to the data file first (with its evidence and caution), build and preview the site, then use it in media. Never put a fact in a carousel that is not in the library.

## How to use it with other skills

- **carousel / slides / live-carousel:** one exercise, pose, herb or nutrient per slide. Slide = name, 2–4 short steps or facts, the evidence word, the caution. Last slide links to the matching page above.
- **video-clip:** breathing guides work well as reels: box breathing is 4-4-4-4 seconds; cyclic sighing is double inhale through the nose, long exhale through the mouth, for 5 minutes.
- **Articles:** follow `growth-framework/WRITING.md`; cite the sources listed in the data files.
- **Chat answers:** answer from the library, give the page link, and keep the caution.
