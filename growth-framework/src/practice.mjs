// Mind exercises (shown on /mind) and beginner yoga asanas (shown on /body). Rendered by build.mjs.
// Keep claims modest and sourced; every item has "when to use" and safety notes.

export const MIND_EXERCISES = [
  {
    id: 'box-breathing', name: 'Box breathing', time: '2–5 min', when: 'Before a call, an exam, a trade, or when you feel rushed.',
    steps: ['Sit upright and breathe out fully.', 'Breathe in through the nose for a count of 4.', 'Hold for 4.', 'Breathe out slowly through the mouth for 4.', 'Hold for 4, then repeat. Use the guide above to keep time.'],
    evidence: 'Slow, paced breathing reliably lowers breathing rate and, for many people, the feeling of stress. It is a calming tool, not a treatment for an anxiety disorder.',
    caution: 'If holding your breath makes you dizzy, skip the holds and just breathe in for 4 and out for 6.',
  },
  {
    id: 'cyclic-sighing', name: 'Cyclic sighing', time: '5 min', when: 'Daily, or when stress is already high.',
    steps: ['Breathe in through the nose until the lungs feel full.', 'Take a second, shorter sip of air through the nose on top.', 'Breathe out slowly and completely through the mouth, longer than the in-breath.', 'Repeat for five minutes at an easy pace.'],
    evidence: 'In a 2023 Stanford study (Balban et al., Cell Reports Medicine), five minutes a day of cyclic sighing for a month improved mood and lowered breathing rate slightly more than the same time spent on mindfulness meditation. It was one study of about 100 people, so treat it as promising, not proven.',
    caution: 'Stop if you feel light-headed. Do not practise while driving.',
  },
  {
    id: 'grounding', name: '5-4-3-2-1 grounding', time: '2 min', when: 'When thoughts are racing or panic is building.',
    steps: ['Name 5 things you can see.', 'Name 4 things you can feel, such as your feet on the floor.', 'Name 3 things you can hear.', 'Name 2 things you can smell.', 'Name 1 thing you can taste, or take one slow sip of water.'],
    evidence: 'Widely used by therapists to pull attention back to the present. It has little direct research of its own; it works as a short-term distraction and attention reset.',
    caution: 'If panic attacks happen often, see a doctor or a psychologist. Grounding helps in the moment but does not treat the cause.',
  },
  {
    id: 'thought-record', name: 'Thought record (CBT)', time: '10 min', when: 'After a moment of strong anger, worry or low mood.',
    steps: ['Write the situation in one line: what happened, where, when.', 'Write the automatic thought, for example "I always fail".', 'List the evidence for the thought, then the evidence against it.', 'Write a more balanced thought that fits all the evidence.', 'Rate how strongly you feel the emotion before and after, from 0 to 100.'],
    evidence: 'This is a core tool of cognitive behavioural therapy (CBT), which has strong evidence for anxiety and depression and is recommended by NICE in the UK. Doing it alone is self-help, not therapy.',
    caution: 'If low mood lasts more than two weeks or you have thoughts of harming yourself, contact a doctor straight away.',
  },
  {
    id: 'worry-time', name: 'Worry time', time: '15 min a day', when: 'When worries keep interrupting work or sleep.',
    steps: ['Pick a fixed 15-minute slot each day, not close to bedtime.', 'When a worry comes during the day, write it down in one line and tell yourself "later".', 'In the slot, go through the list. For each worry, write one action you can take, or cross it out if you cannot control it.', 'When the 15 minutes end, stop.'],
    evidence: 'Postponing worry to a set time is part of CBT for generalised anxiety, and small trials show it reduces how much time people spend worrying.',
    caution: 'It takes one to two weeks of practice before it feels natural.',
  },
  {
    id: 'body-scan', name: 'Body scan', time: '10 min', when: 'In the evening, or after a long day at a screen.',
    steps: ['Lie down or sit comfortably and close your eyes.', 'Move your attention slowly from your toes up to your head.', 'At each part, notice tension or warmth without trying to change it.', 'When your mind wanders, which it will, bring it back to the last body part.'],
    evidence: 'Mindfulness programmes that include the body scan showed moderate evidence for reducing anxiety, depression and pain in a large 2014 review (Goyal et al., JAMA Internal Medicine). Effects were similar in size to other active treatments, not larger.',
    caution: 'A small number of people with past trauma find body-focused practice upsetting. Open your eyes and stop if it feels wrong.',
  },
  {
    id: 'expressive-writing', name: 'Expressive writing', time: '15 min, 3–4 days', when: 'After a difficult event you keep thinking about.',
    steps: ['Write for 15 minutes without stopping about the event and how you feel about it.', 'Do not worry about spelling or grammar. No one else will read it.', 'Repeat on three or four days in a row.', 'Tear it up or keep it private afterwards.'],
    evidence: 'Studies since the 1980s (James Pennebaker and others) found small benefits for mood and health. A 2006 review of 146 studies found the average effect was real but small, so expect a modest lift, not a cure.',
    caution: 'It is normal to feel a little worse right after writing; that usually passes within hours.',
  },
];

export const ASANAS = [
  {
    name: 'Mountain pose', sanskrit: 'Tadasana', level: 'Beginner', hold: '5 breaths', works: 'Posture and balance; the starting point for standing poses.',
    steps: ['Stand with feet hip-width apart, weight even on both feet.', 'Lengthen the spine, relax the shoulders down, arms by your sides.', 'Breathe slowly through the nose.'],
    avoid: 'Safe for almost everyone. Hold a wall if you feel unsteady.',
  },
  {
    name: 'Tree pose', sanskrit: 'Vrikshasana', level: 'Beginner', hold: '5 breaths each side', works: 'Balance, ankle strength and focus.',
    steps: ['From Mountain pose, shift weight to the left foot.', 'Place the right sole on the inner left calf or thigh, never on the knee.', 'Bring palms together at the chest and fix your eyes on one point.', 'Switch sides.'],
    avoid: 'Use a wall for support if you have poor balance or dizziness.',
  },
  {
    name: 'Triangle pose', sanskrit: 'Trikonasana', level: 'Beginner', hold: '5 breaths each side', works: 'Side body, hamstrings and hips.',
    steps: ['Step feet about one leg-length apart; turn the right foot out.', 'Reach the arms out at shoulder height.', 'Hinge at the hip and lower the right hand to your shin or a block; raise the left arm.', 'Keep both sides of the waist long. Switch sides.'],
    avoid: 'Look down instead of up if you have neck pain or low blood pressure.',
  },
  {
    name: 'Warrior II', sanskrit: 'Virabhadrasana II', level: 'Beginner', hold: '5 breaths each side', works: 'Leg strength, hips and stamina.',
    steps: ['Feet wide, right foot turned out, left foot slightly in.', 'Bend the right knee over the ankle, not past the toes.', 'Arms out at shoulder height, look over the right hand.', 'Switch sides.'],
    avoid: 'Bend the knee less if you have knee pain.',
  },
  {
    name: 'Cat-cow', sanskrit: 'Marjaryasana-Bitilasana', level: 'Beginner', hold: '6–8 slow rounds', works: 'Gentle spine movement; good warm-up for the back.',
    steps: ['Start on hands and knees, wrists under shoulders, knees under hips.', 'Breathing in, drop the belly and lift the chest (cow).', 'Breathing out, round the back and tuck the chin (cat).', 'Move slowly with the breath.'],
    avoid: 'Keep the movement small with neck or wrist pain; use fists or a folded towel under the wrists.',
  },
  {
    name: 'Downward-facing dog', sanskrit: 'Adho Mukha Svanasana', level: 'Beginner', hold: '5 breaths', works: 'Hamstrings, calves, shoulders and upper back.',
    steps: ['From hands and knees, tuck the toes and lift the hips up and back.', 'Press the floor away with your hands; keep the knees bent if the hamstrings are tight.', 'Let the head hang between the arms.'],
    avoid: 'The head is below the heart: skip it with uncontrolled high blood pressure, glaucoma, late pregnancy or wrist injury.',
  },
  {
    name: 'Cobra pose', sanskrit: 'Bhujangasana', level: 'Beginner', hold: '3–5 breaths, 2–3 times', works: 'Back extensors and chest opening after long sitting.',
    steps: ['Lie on your front, hands under the shoulders, elbows close to the body.', 'Breathing in, lift the chest using the back muscles; press lightly with the hands.', 'Keep the hips on the floor and the shoulders away from the ears.', 'Lower on the out-breath.'],
    avoid: 'Lift only a little with back pain; skip it in pregnancy or after recent abdominal surgery.',
  },
  {
    name: 'Bridge pose', sanskrit: 'Setu Bandhasana', level: 'Beginner', hold: '5 breaths, 2–3 times', works: 'Glutes, hamstrings and lower back strength.',
    steps: ['Lie on your back, knees bent, feet flat and hip-width apart.', 'Press into the feet and lift the hips.', 'Keep the knees pointing forward and the neck relaxed; do not turn the head.', 'Lower slowly, one part of the spine at a time.'],
    avoid: 'Skip with a neck injury. Keep the lift low with knee or back pain.',
  },
  {
    name: "Child's pose", sanskrit: 'Balasana', level: 'Beginner', hold: '1–2 min', works: 'Rest pose; gentle stretch for the back and hips.',
    steps: ['Kneel and sit back on your heels, knees together or apart.', 'Fold forward and rest the forehead on the floor or a cushion.', 'Arms forward or by your sides. Breathe into the back of the ribs.'],
    avoid: 'Put a cushion behind the knees or under the hips if they hurt. Use a wide-knee version in pregnancy.',
  },
  {
    name: 'Corpse pose', sanskrit: 'Shavasana', level: 'Beginner', hold: '3–5 min', works: 'Relaxation at the end of practice.',
    steps: ['Lie on your back, legs apart, arms by your sides, palms up.', 'Close your eyes and let the body feel heavy.', 'Breathe naturally. Use the body scan above if your mind is busy.'],
    avoid: 'In late pregnancy, lie on your left side instead.',
  },
];

// 15-minute beginner routine, by asana sanskrit name and minutes
export const ROUTINE = [
  ['Tadasana', 1], ['Marjaryasana-Bitilasana', 2], ['Adho Mukha Svanasana', 1], ['Virabhadrasana II', 2], ['Trikonasana', 2],
  ['Vrikshasana', 2], ['Bhujangasana', 1], ['Setu Bandhasana', 1], ['Balasana', 1], ['Shavasana', 2],
];

export const PRACTICE_SOURCES = [
  ['Balban MY et al. Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine, 2023', 'https://doi.org/10.1016/j.xcrm.2022.100895'],
  ['Goyal M et al. Meditation programs for psychological stress and well-being. JAMA Internal Medicine, 2014', 'https://doi.org/10.1001/jamainternmed.2013.13018'],
  ['Frattaroli J. Experimental disclosure and its moderators: a meta-analysis. Psychological Bulletin, 2006', 'https://doi.org/10.1037/0033-2909.132.6.823'],
  ['Wieland LS et al. Yoga for chronic non-specific low back pain. Cochrane Database of Systematic Reviews, 2022', 'https://doi.org/10.1002/14651858.CD010671.pub3'],
  ['NICE. Generalised anxiety disorder and panic disorder in adults: management (CG113)', 'https://www.nice.org.uk/guidance/cg113'],
];
