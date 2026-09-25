"""Render an original, quiet 6/8 pentatonic instrumental for the gift site.

Synthesized bamboo-flute and plucked-string timbres; no sampled recordings.
Requires NumPy, SciPy and ffmpeg. Run from any directory.
"""
from pathlib import Path
import subprocess
import tempfile
import wave

import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

RATE = 44100
EIGHTH = 60 / 82 / 2
BAR = EIGHTH * 6
RNG = np.random.default_rng(20260925)

A = [
    [(74, 1), (76, 1), (78, 2), (76, 1), (74, 1)],
    [(71, 2), (69, 1), (71, 1), (74, 2)],
    [(76, 1), (78, 1), (81, 2), (78, 1), (76, 1)],
    [(74, 3), (71, 2), (None, 1)],
    [(69, 1), (71, 1), (74, 2), (76, 1), (78, 1)],
    [(76, 2), (74, 1), (71, 1), (69, 2)],
    [(71, 1), (74, 1), (76, 2), (74, 1), (71, 1)],
    [(74, 4), (None, 2)],
]
B = [
    [(78, 1), (81, 1), (83, 2), (81, 1), (78, 1)],
    [(76, 2), (78, 1), (81, 1), (78, 2)],
    [(74, 1), (76, 1), (78, 1), (76, 1), (74, 1), (71, 1)],
    [(69, 3), (71, 2), (None, 1)],
    [(74, 2), (76, 1), (78, 1), (81, 2)],
    [(78, 1), (76, 1), (74, 2), (71, 1), (69, 1)],
    [(71, 1), (74, 1), (76, 1), (74, 1), (71, 1), (69, 1)],
    [(74, 4), (None, 2)],
]
C = [
    [(78, 2), (76, 1), (74, 3)],
    [(71, 2), (69, 1), (71, 2), (None, 1)],
    [(74, 1), (76, 1), (78, 2), (81, 2)],
    [(78, 3), (76, 2), (None, 1)],
    [(74, 2), (71, 1), (69, 2), (71, 1)],
    [(74, 2), (76, 2), (78, 2)],
    [(76, 2), (74, 2), (71, 2)],
    [(74, 4), (None, 2)],
]
CHORDS = [
    [50, 57, 62, 66, 69], [47, 54, 59, 62, 66],
    [43, 50, 55, 59, 62], [45, 52, 57, 59, 64],
    [50, 57, 62, 66, 69], [47, 54, 59, 62, 66],
    [43, 50, 55, 59, 64], [50, 57, 62, 66, 69],
]
SCORE = A + B + A + C
LENGTH = len(SCORE) * BAR + 2.2
bus = np.zeros((round(LENGTH * RATE), 2), dtype=np.float64)


def frequency(note):
    return 440 * 2 ** ((note - 69) / 12)


def mix(signal, start, gain, pan=0):
    offset = max(0, round(start * RATE))
    count = min(len(signal), len(bus) - offset)
    if count <= 0:
        return
    angle = (pan + 1) * np.pi / 4
    bus[offset:offset + count, 0] += signal[:count] * gain * np.cos(angle)
    bus[offset:offset + count, 1] += signal[:count] * gain * np.sin(angle)


def flute(note, duration):
    release = 0.13
    t = np.arange(round((duration + release) * RATE)) / RATE
    vibrato = 0.0028 * np.sin(2 * np.pi * 4.8 * t) * np.clip((t - 0.14) / 0.3, 0, 1)
    scoop = -0.004 * np.exp(-t / 0.035)
    phase = 2 * np.pi * np.cumsum(frequency(note) * (1 + vibrato + scoop)) / RATE
    tone = (np.sin(phase) + 0.2 * np.sin(2 * phase + 0.1)
            + 0.055 * np.sin(3 * phase) + 0.016 * np.sin(4 * phase))
    breath = sosfilt(butter(2, [1300, 4700], btype='bandpass', fs=RATE, output='sos'), RNG.normal(0, 1, len(t)))
    envelope = np.sin(np.minimum(t / 0.065, 1) * np.pi / 2) ** 2
    envelope *= np.cos(np.clip((t - duration) / release, 0, 1) * np.pi / 2) ** 2
    envelope *= 0.94 + 0.06 * np.sin(2 * np.pi * 1.8 * t)
    return (tone + 0.026 * breath) * envelope


def pluck(note, duration=1.85):
    t = np.arange(round(duration * RATE)) / RATE
    f = frequency(note)
    result = np.zeros_like(t)
    for harmonic in range(1, 9):
        detune = 1 + 0.000055 * harmonic * harmonic
        decay = 0.62 / (1 + harmonic * 0.24)
        result += np.sin(2 * np.pi * f * harmonic * detune * t) * np.exp(-t / decay) / harmonic ** 1.55
    result *= np.minimum(t / 0.004, 1)
    result *= np.clip((duration - t) / 0.1, 0, 1)
    return result


def warm_string(note, duration):
    t = np.arange(round(duration * RATE)) / RATE
    f = frequency(note)
    signal = (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 1.0018 * t)
              + 0.12 * np.sin(2 * np.pi * f * 2 * t))
    env = np.minimum(t / 0.55, 1) * np.clip((duration - t) / 0.65, 0, 1)
    return signal * env


for bar_index, melody in enumerate(SCORE):
    assert sum(beats for _, beats in melody) == 6
    start = 0.2 + bar_index * BAR
    chord = CHORDS[bar_index % 8]
    phrase_gain = 0.105 if bar_index < 8 or bar_index >= 24 else 0.12
    cursor = 0
    for note, beats in melody:
        if note is not None:
            length = beats * EIGHTH * 0.89
            mix(flute(note, length), start + cursor * EIGHTH + 0.045, phrase_gain, -0.055)
        cursor += beats
    for pulse, index in enumerate([0, 2, 3, 1, 2, 4]):
        gain = 0.071 if pulse in (0, 3) else 0.057
        mix(pluck(chord[index]), start + pulse * EIGHTH, gain, (-0.35 if pulse % 2 == 0 else 0.35))
    for note in (chord[0] - 12, chord[1] - 12):
        mix(warm_string(note, BAR + 0.1), start, 0.019, 0)
    if bar_index in (0, 8, 16, 24):
        mix(pluck(86, 2.5), start + EIGHTH * 0.5, 0.026, 0.45)

# A short diffuse room, rendered once into the audio file for light playback.
room_length = round(1.7 * RATE)
t = np.arange(room_length) / RATE
for channel in range(2):
    noise = RNG.normal(0, 1, room_length) * np.exp(-t * 4.0)
    noise = sosfilt(butter(2, 4300, fs=RATE, output='sos'), noise)
    noise[:round(RATE * 0.025)] = 0
    noise /= np.sqrt(np.sum(noise * noise))
    wet = fftconvolve(bus[:, channel], noise)[:len(bus)]
    bus[:, channel] += wet * 0.17

fade_in = round(RATE * 0.08)
fade_out = round(RATE * 1.8)
bus[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
bus[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 1.5
bus *= 0.82 / max(0.82, float(np.max(np.abs(bus))))
assert np.isfinite(bus).all()
output = Path(__file__).resolve().parents[1] / 'assets/dem-trang-doan-vien-v16.mp3'
with tempfile.TemporaryDirectory(prefix='midautumn-music-') as temp:
    wav_path = Path(temp) / 'master.wav'
    with wave.open(str(wav_path), 'wb') as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes((np.clip(bus, -1, 1) * 32767).astype('<i2').tobytes())
    subprocess.run([
        'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(wav_path),
        '-af', 'loudnorm=I=-19:TP=-2:LRA=8', '-ar', str(RATE),
        '-codec:a', 'libmp3lame', '-b:a', '128k',
        '-metadata', 'title=Đêm trăng đoàn viên',
        '-metadata', 'comment=Original synthesized instrumental for the Mid-Autumn gift site',
        str(output),
    ], check=True)
print(f'{output.name}: {LENGTH:.2f} seconds, {output.stat().st_size} bytes')
