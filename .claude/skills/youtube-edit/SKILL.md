---
name: youtube-edit
description: Edit raw talking-head recordings into clean YouTube videos, Shorts or Reels with free tools (local Whisper + ffmpeg). Picks the clean takes, cuts restarts, fillers and dead air, checks the cut, then normalises loudness. Use when the owner gives a raw video to edit, trim, clean up or turn into a Short or Reel.
---

# YouTube edit (free tools: faster-whisper, ffmpeg)

Setup once: `pip install faster-whisper`. The first run downloads the Whisper model; if the network blocks it, tell the owner.
Work in `media-out/<name>/` (git-ignored). Never send the owner's video to a paid service.

## 1. Transcribe

```
python3 .claude/skills/youtube-edit/transcribe.py raw.mp4 media-out/<name>/raw [--language en]
```

Gives `words.json` (every word with start and end seconds and an index) and `transcript.txt`. Use `--language ur` for Urdu; mixed Urdu/English usually works without `--language`.

## 2. Pick the takes (you read and decide; nothing here is automatic)

1. If there is a script, match the transcript to it sentence by sentence. List every attempt of each sentence.
2. **The last complete take wins.** A take is complete if it reaches the end of the sentence without a restart, trail-off, laugh or "sorry, again". If he re-records a whole section later, the later block replaces the earlier one.
3. **Said twice counts as a retake**, even in different words ("we have some API keys" ... "then we have the API keys and docs"). Keep the later, fuller one.
4. Unscripted stretches stay in order, minus restarts, fillers ("uh", "so yeah", repeated openers) and dead air.
5. **No micro-fragments.** A kept piece under 0.8 s between two cuts ("So", "And it") flashes as a double jump cut. Attach it to a neighbour or drop the word. `cut.py` warns about these.
6. Cut points: just after the previous word ends, about 30 ms before the next word starts. Leave 60 to 120 ms of natural air at joins; no gap over 0.25 s inside a section unless it is a deliberate pause before a reveal (max 0.45 s).

Write `media-out/<name>/edl.json`: `{"ranges": [[start, end], ...]}` in source seconds, playback order.

## 3. Check before cutting the final

- **Coverage:** every script sentence appears exactly once, or is listed for the owner as dropped.
- **Duplicates:** read the kept text for any 5-word phrase that appears twice, and for paraphrased repeats.
- **Read-through:** read the kept text top to bottom as a viewer. Flag sentences that start mid-thought, a dangling "and..."/"but...", a pronoun whose noun was cut, or numbers that contradict each other.

## 4. Cut

```
python3 .claude/skills/youtube-edit/cut.py raw.mp4 media-out/<name>/edl.json media-out/<name>/final.mp4 [--vertical] [--music track.m4a]
```

One ffmpeg pass (trim + concat in one filter graph) so lip-sync stays exact; never cut ranges into separate files and join them.
4 ms audio fades at every join, loudness -14 LUFS, true peak -1 dBTP, H.264 30 fps. `--vertical` centre-crops to 1080x1920 for Shorts and Reels (check the face is not cut off; if it is, ask for a different crop). `--music` adds a quiet bed: owner-supplied or the `slides` skill's generated `calm`/`bright` pads only, never downloaded music.

## 5. Check and send

Re-transcribe `final.mp4` and read it once more for repeats and broken sentences. Grab frames around a few joins (`ffmpeg -ss <t> -i final.mp4 -frames:v 1 j.jpg`) and look at them. Send the owner the video plus a short list: what was cut, any dropped sentences, and a chapter list (`00:00 Intro` ...) for YouTube. Expect a round of notes ("tighten this pause", "keep that line"); edit `edl.json` and re-run `cut.py`.

Never show the script on screen. No health or income claims get added in captions or titles that the speaker did not make.
For captions, title cards or animated overlays, use the `video-clip` and `framer-motion` skills.
