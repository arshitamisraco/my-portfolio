"""Original soundtrack for the showreel, synthesized from scratch and synced to the edit.

126 BPM, F-major dreamy pop: pad + bass + drums + plucks, with sound design
(whooshes, impacts, risers, ticks, pops) placed on the reel's real cut times.
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
import wave, sys

SR = 44100
LEN = 32.0
N = int(LEN * SR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)


# ---------- real event times (from the renderer's time-remap) ----------
import json, os
_e = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "events.json")))
EV = dict(wipe=_e["s1wipe"], s2=_e["s2start"], beats=[_e[f"beat{i}"] for i in (1, 2, 3, 4)], radial=_e["radial"], s3=_e["s3"],
          stats=[_e["stat1"], _e["stat2"], _e["stat3"]], callout=_e["callout"], zoom=_e["zoom"], s4=_e["s4"],
          cards=[_e["s4"], _e["p2"], _e["p3"]], stamps=[_e["stamp1"], _e["stamp2"], _e["stamp3"]], mint=_e["mint"], s5=_e["s5"],
          fwipe=_e["fwipe"], fun=_e["fun"], tiles=[_e[f"fun{i}"] for i in (1, 2, 3, 4)],
          s6=_e["s6"], collapse=_e["collapse"], lockup=_e["lockup"], button=_e["button"], end=_e["end"])

B = 60 / 126.3                    # beat
O = EV["beats"][0] - 12 * B       # grid origin: the first "Research." cut is a downbeat
def beat(i): return O + i * B

def t_(d): return np.arange(int(d * SR)) / SR
def env(n, a=.005, d=.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def lp(x, f, o=2): return sosfilt(butter(o, f, "low", fs=SR, output="sos"), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, "high", fs=SR, output="sos"), x)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], "band", fs=SR, output="sos"), x)
def add(sig, t, g=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N or i + len(sig) <= 0: return
    if i < 0: sig = sig[-i:]; i = 0
    s = sig[: N - i]
    L[i:i + len(s)] += s * g * np.sqrt((1 - pan) / 2) * 1.414
    R[i:i + len(s)] += s * g * np.sqrt((1 + pan) / 2) * 1.414
def hz(m): return 440 * 2 ** ((m - 69) / 12)

# ---------- instruments ----------
def kick(g=1.0):
    t = t_(.5); f = 45 + 110 * np.exp(-t / .045)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * np.exp(-t / .22) + .3 * np.sin(ph) * np.exp(-t / .02)) * g
def clap():
    n = rng.standard_normal(int(.35 * SR)); e = np.zeros(len(n)); t = np.arange(len(n)) / SR
    for k, d in enumerate([0, .011, .022]): e += (t >= d) * np.exp(-np.maximum(t - d, 0) / (.012 if k < 2 else .14))
    return bp(n * e, 900, 5000) * .7
def hat(open_=False):
    n = rng.standard_normal(int((.25 if open_ else .06) * SR))
    return hp(n, 7000, 4) * env(len(n), .001, .09 if open_ else .018) * .35
def saw(f, d, detune=(0,)):
    t = t_(d); out = np.zeros(len(t))
    for dt in detune:
        ff = f * 2 ** (dt / 1200); out += 2 * ((t * ff + rng.random()) % 1) - 1
    return out / len(detune)
def pad(notes, d, cutoff=1800):
    s = sum(saw(hz(m), d, (-9, -3, 4, 10)) for m in notes) / len(notes)
    s = lp(s, cutoff, 2); t = t_(d)
    return s * np.minimum(1, t / .5) * np.minimum(1, (d - t) / .6) * .5
def bass(m, d, cutoff=500):
    t = t_(d); s = saw(hz(m), d, (0, 7)) * .6 + np.sin(2 * np.pi * hz(m - 12) * t) * .7
    return lp(s, cutoff) * env(len(t), .004, d * .9) * np.minimum(1, (d - t) / .02)
def pluck(m, d=.6, bright=1.0):
    t = t_(d); f = hz(m)
    s = np.sin(2 * np.pi * f * t) + .45 * np.sin(4 * np.pi * f * t) * np.exp(-t / .08) * bright + .2 * np.sin(6 * np.pi * f * t) * np.exp(-t / .04)
    return s * env(len(t), .002, .22) * .35
def bell(m, d=1.4):
    t = t_(d); f = hz(m)
    s = np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / .3) + .25 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t / .1)
    return s * env(len(t), .002, .6) * .25
def whoosh(d=.6, lo=300, hi=6000, rev=False):
    n = rng.standard_normal(int(d * SR)); t = np.arange(len(n)) / SR
    k = 24; seg = np.array_split(n, k); out = []
    for i, sgm in enumerate(seg):
        c = lo * (hi / lo) ** (i / (k - 1)); out.append(bp(sgm, c * .7, min(c * 1.4, 18000)))
    out = np.concatenate(out); e = np.sin(np.pi * t / d) ** 2
    out = out * e
    return (out[::-1] if rev else out) * .6
def riser(d=1.0):
    t = t_(d); f = 200 * (8 ** (t / d)); ph = 2 * np.pi * np.cumsum(f) / SR
    n = hp(rng.standard_normal(len(t)), 2000) * (t / d) ** 2
    return (np.sin(ph) * .15 + n * .35) * (t / d) ** 1.5
def impact(g=1.0):
    t = t_(2.2); sub = np.sin(2 * np.pi * (38 + 40 * np.exp(-t / .08)) * t) * np.exp(-t / .7)
    n = lp(rng.standard_normal(len(t)), 3000) * np.exp(-t / .15) * .5
    return (sub + n) * g
def tick():
    t = t_(.03); return np.sin(2 * np.pi * 2600 * t) * np.exp(-t / .006) * .25
def pop(m=84):
    t = t_(.12); f = hz(m) * (1 + 1.5 * np.exp(-t / .01)); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(len(t), .001, .035) * .45

# ---------- harmony: Fmaj7 – Am7 – Dm7 – Bbmaj7, one chord per bar ----------
CH = [[53, 57, 60, 64], [57, 60, 64, 67], [50, 53, 57, 60], [46, 50, 53, 57]]
ROOT = [41, 45, 38, 46]
BAR = 4 * B
first_bar = int(np.floor((0 - O) / BAR)) - 1
bars = range(first_bar, int((EV["end"] - O) / BAR) + 2)

def section(t):
    if t < EV["wipe"]: return "intro"
    if t < EV["beats"][0]: return "manifesto"
    if t < EV["radial"]: return "beats"
    if t < EV["s3"]: return "break"
    if t < EV["zoom"]: return "coros"
    if t < EV["s4"]: return "rise"
    if t < EV["mint"]: return "work"
    if t < EV["fwipe"]: return "play"
    if t < EV["s6"]: return "fun"
    if t < EV["lockup"]: return "mosaic"
    return "end"

# pads + bass
for b in bars:
    t0 = O + b * BAR
    if t0 > EV["lockup"] - .1: break
    ci = b % 4
    sec = section(max(t0, 0))
    cut = {"intro": 900, "manifesto": 1200, "beats": 2200, "coros": 1600, "work": 2600, "play": 2800, "fun": 1100}.get(sec, 1500)
    add(pad(CH[ci], BAR + .7, cut), t0, .32 if sec != "intro" else .38)
    if sec in ("beats", "coros", "work", "play", "fun"):
        for k in range(8):  # eighth-note bass
            bt = t0 + k * B / 2
            if bt >= EV["s6"]: break
            if sec == "beats" and bt >= EV["radial"]: break
            if sec == "coros" and bt >= EV["zoom"]: break
            if sec == "fun" and k % 3 == 1: continue
            add(bass(ROOT[ci] + (12 if k in (3, 7) and sec == "work" else 0), B / 2 * .9, 380 if sec in ("coros", "fun") else 650), bt, .5)
    elif sec == "manifesto":
        add(bass(ROOT[ci], BAR * .95, 250), t0, .5)

# drums on the beat grid
for i in range(int((0 - O) / B), int((EV["end"] - O) / B) + 1):
    bt = beat(i); sec = section(bt); pos = i % 4
    if sec == "manifesto" and bt > EV["s2"]:
        if pos == 0: add(kick(.8), bt)
        if pos == 2: add(hat(True), bt, .5, .2)
    elif sec in ("beats", "coros", "work", "play"):
        if (sec == "beats" and bt > EV["radial"] - .02) or (sec == "coros" and bt > EV["zoom"] - .02): continue
        add(kick(), bt)
        if pos in (1, 3): add(clap(), bt, .8)
        add(hat(), bt + B / 2, .9, .3); add(hat(), bt, .5, -.3)
        if sec in ("work", "play"): add(hat(), bt + B / 4, .35, .5); add(hat(), bt + 3 * B / 4, .35, -.5)
        if sec == "coros" and pos == 3: add(hat(True), bt + B / 2, .4, .4)
    elif sec == "fun":
        if pos in (0, 2) or (pos == 3): add(kick(.9 if pos != 3 else .5), bt + (B / 2 if pos == 3 else 0))
        if pos == 2: add(clap(), bt, .9)
        for q in range(4): add(hat(), bt + q * B / 4, .45 if q % 2 else .25, (-1) ** q * .5)
    elif sec == "mosaic":
        add(hat(), bt, .7, .3); add(hat(), bt + B / 2, .7, -.3)

# melodic layers
SCALE = [65, 67, 69, 72, 74, 77, 79, 81, 84]   # F major pentatonic-ish
# intro: sparkling bell arpeggio as clouds build
for k, tt in enumerate(np.arange(.05, EV["wipe"], B / 2)):
    add(bell(SCALE[[0, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7][k % 12]]), tt, .95 * min(1, .45 + tt / 2), (-1) ** k * .4)
# coros: dark sixteenth arp
for i in range(int((EV["s3"] - O) / (B / 4)), int((EV["zoom"] - O) / (B / 4))):
    tt = O + i * B / 4; b = int(np.floor((tt - O) / BAR)) % 4
    add(pluck(CH[b][i % 4] + 12, .3, .6), tt, .28, (-1) ** i * .5)
# work: bright plucked chord stabs on the off-beats
for i in range(int((EV["s4"] - O) / (B / 2)), int((EV["mint"] - O) / (B / 2))):
    if i % 2 == 1 or i % 8 == 6:
        tt = O + i * B / 2; b = int(np.floor((tt - O) / BAR)) % 4
        for m in CH[b][1:]: add(pluck(m + 12, .4), tt, .22, .2)
# play: marimba-ish melody
MEL = [77, 79, 81, 84, 81, 79, 77, 74, 77, 81, 84, 86, 84, 81, 79, 81]
for k, tt in enumerate(np.arange(beat(int((EV["s5"] - O) / B)), EV["s6"], B / 2)):
    add(pluck(MEL[k % 16], .5, 1.3), tt, .45, (-1) ** k * .3)

# fun: glassy bell chops that stutter like tracked fingertips
for k, tt in enumerate(np.arange(EV["fun"], EV["s6"] - .1, B / 4)):
    if k % 3 == 2: continue
    add(bell([77, 81, 84, 88, 84, 81][k % 6], .35), tt, .35, np.sin(k) * .7)

# ---------- sound design on cuts ----------
add(riser(.9), EV["wipe"] - .45, .8)
for k in range(12): add(tick(), EV["wipe"] + k * .035, .6, rng.uniform(-.6, .6))   # pixel wipe
add(impact(.9), EV["s2"])
for i, bt in enumerate(EV["beats"]):                                               # Research / Interface / Prompts / Code
    add(whoosh(.35, 800, 9000), bt - .2, .7, (-1) ** i * .5); add(impact(.35), bt)
add(riser(1.1), EV["radial"] - .6, 1.0); add(whoosh(.8, 200, 5000), EV["radial"] - .1, .6)
add(impact(1.2), EV["s3"])
for st in EV["stats"]:                                                             # count-up ticks
    for k in range(14): add(tick(), st + k * .045 * (1 + k / 14), .7 - k * .03, .3)
    add(bell(84 + (EV["stats"].index(st)) * 2, .9), st + .75, .5)
add(pop(79), EV["callout"], .6)
add(riser(1.0), EV["zoom"] - .4, .9); add(whoosh(.7, 400, 12000), EV["zoom"] + .1, .8)
add(impact(.8), EV["s4"])
for i, c in enumerate(EV["cards"]): add(whoosh(.5, 500, 8000), c - .15, .8, .6)
for s in EV["stamps"]: add(pop(86), s, .8); add(pop(91), s + .06, .4)
add(whoosh(.55, 300, 7000), EV["mint"] - .1, .9, -.5)
add(impact(.5), EV["s5"])
for k, d in enumerate([0, .1, .2]): add(pop(79 + 3 * k), EV["s5"] + d + .15, .7, -.4 + .4 * k)
for k in range(10): add(tick(), EV["fwipe"] + k * .03, .7, rng.uniform(-.7, .7))   # pixel wipe into For fun
add(impact(.6), EV["fun"])
for k, tt in enumerate(EV["tiles"]): add(whoosh(.3, 1200, 9000), tt - .05, .5, -.6 + .4 * k); add(pop(84 + 2 * k), tt + .2, .55, -.6 + .4 * k)
for k in range(24): add(pop(int(rng.choice(SCALE)) + 12), EV["s6"] + rng.uniform(0, .45), .35, rng.uniform(-.8, .8))
add(whoosh(.5, 6000, 300, rev=False), EV["collapse"] - .15, .7)
add(impact(1.0), EV["lockup"])
add(pad([41, 53, 57, 60, 64, 69], 3.2, 1400), EV["lockup"], .55)
for k, m in enumerate([65, 69, 72, 76, 81]): add(bell(m, 2.2), EV["lockup"] + .05 + k * .09, .5, (-1) ** k * .4)
add(pop(84), EV["button"], .7); add(bell(89, 1.8), EV["button"] + .05, .35)

# ---------- master ----------
mix = np.stack([L, R])
ir_t = np.arange(int(1.6 * SR)) / SR
ir = rng.standard_normal((2, len(ir_t))) * np.exp(-ir_t / .45)
ir = np.stack([lp(ir[0], 5000), lp(ir[1], 5000)])
wet = np.stack([fftconvolve(mix[c], ir[c])[:N] for c in range(2)])
wet /= np.max(np.abs(wet)) + 1e-9
mix = mix / (np.max(np.abs(mix)) + 1e-9) + wet * .22
mix = np.stack([hp(mix[c], 28) for c in range(2)])
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.6) / np.tanh(1.6)
t = np.arange(N) / SR
fade = np.clip((EV["end"] - t) / 1.4, 0, 1) ** 1.5 * np.clip(t / .03, 0, 1)
mix = mix * fade * .89
mix = mix[:, : int(EV["end"] * SR)]
pcm = (mix.T * 32767).astype(np.int16)
with wave.open(sys.argv[1] if len(sys.argv) > 1 else "score.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print("wrote", pcm.shape[0] / SR, "s")
