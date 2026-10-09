"""Cut a talking-head video from an edit list in ONE ffmpeg pass (keeps lip-sync exact).

Usage: python3 cut.py <video> <edl.json> <out.mp4> [--music track.m4a] [--vertical]
edl.json: {"ranges": [[start, end], ...]} in source seconds, playback order.
Never cut each range to its own file and join them: frame padding at every join drifts
the picture away from the sound. This trims and concatenates inside one filter graph,
adds 4 ms audio fades at every join, and normalises to -14 LUFS, true peak -1 dBTP.
--vertical crops the centre to 9:16 (1080x1920) for Shorts and Reels.
--music mixes a quiet bed under the voice (owner-supplied or generated tracks only).
"""
import argparse, json, subprocess

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("edl"); ap.add_argument("out")
ap.add_argument("--music"); ap.add_argument("--vertical", action="store_true")
a = ap.parse_args()
ranges = json.load(open(a.edl))["ranges"]
for s, e in ranges:
    if e - s < 0.8:
        print(f"warning: range {s:.2f}-{e:.2f} is under 0.8 s (flashes as a double jump cut)")

f, pairs = [], ""
for k, (s, e) in enumerate(ranges):
    d = e - s
    f.append(f"[0:v]trim={s}:{e},setpts=PTS-STARTPTS[v{k}]")
    f.append(f"[0:a]atrim={s}:{e},asetpts=PTS-STARTPTS,afade=t=in:d=0.004,afade=t=out:st={d - 0.004:.3f}:d=0.004[a{k}]")
    pairs += f"[v{k}][a{k}]"
f.append(f"{pairs}concat=n={len(ranges)}:v=1:a=1[vc][ac]")
vout = "[vc]"
if a.vertical:
    f.append("[vc]crop=ih*9/16:ih,scale=1080:1920,setsar=1[vv]"); vout = "[vv]"
aout = "[ac]"
if a.music:
    f.append("[1:a]volume=0.12[m];[ac][m]amix=inputs=2:duration=first:dropout_transition=0[am]"); aout = "[am]"
f.append(f"{aout}loudnorm=I=-14:TP=-1:LRA=11,aresample=48000[ao]")

cmd = ["ffmpeg", "-y", "-i", a.video]
if a.music:
    cmd += ["-stream_loop", "-1", "-i", a.music]
cmd += ["-filter_complex", ";".join(f), "-map", vout, "-map", "[ao]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30",
        "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", a.out]
subprocess.run(cmd, check=True)
total = sum(e - s for s, e in ranges)
print(f"{len(ranges)} ranges, {total:.1f} s -> {a.out}")
