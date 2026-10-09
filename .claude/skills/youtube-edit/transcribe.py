"""Word-level transcript with free local Whisper (faster-whisper).

Usage: python3 transcribe.py <video> <out_dir> [--model small] [--language en]
Writes <out_dir>/words.json ([{i, w, s, e}] in source seconds) and
<out_dir>/transcript.txt (one segment per line, "[start-end] #first_word_index text").
Install once: pip install faster-whisper
"""
import argparse, json, os
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("out")
ap.add_argument("--model", default="small"); ap.add_argument("--language", default=None)
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)

segments, _ = WhisperModel(a.model, compute_type="int8").transcribe(
    a.video, language=a.language, word_timestamps=True, vad_filter=False)
words, lines = [], []
for seg in segments:
    first = len(words)
    for w in seg.words:
        words.append({"i": len(words), "w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)})
    lines.append(f"[{seg.start:.2f}-{seg.end:.2f}] #{first} {seg.text.strip()}")

json.dump(words, open(f"{a.out}/words.json", "w"), ensure_ascii=False, indent=0)
open(f"{a.out}/transcript.txt", "w").write("\n".join(lines) + "\n")
print(f"{len(words)} words, {len(lines)} segments -> {a.out}")
