#!/usr/bin/env bash
# Renders public/videos/showreel/arshita-showreel.mp4 (~28s, 1920x1080, 60fps, with sound).
# The reel is a canvas animation (index.html) rendered frame-by-frame in headless
# Chromium (render.mjs) and piped to ffmpeg. Needs: node + playwright, ffmpeg with libx264
# (e.g. `pip install imageio-ffmpeg`), echo -n "window.VCOUNT={" > v/manifest.js; for d in v/*/; do echo -n ""$(basename $d)":$(ls $d | wc -l)," >> v/manifest.js; done; echo "};" >> v/manifest.js
npx http-server, and the fonts in ./fonts
# (Inter, Playfair Display + italic, JetBrains Mono woff2 from Google Fonts).
set -euo pipefail
cd "$(dirname "$0")"
FF="${FF:-ffmpeg}"; export FF
V=../../public/videos
ln -sfn ../../public p
ext() { mkdir -p "v/$1"; "$FF" -loglevel error -y -ss "$3" -t 12 -i "$V/$2" -vf "fps=30,scale='min($4,iw)':-2" -q:v 3 "v/$1/%04d.jpg"; }
ext cwd design-system/chat-web-dark.mp4 3 1440
ext cml design-system/chat-mobile-light.mp4 1 640
ext owd design-system/onboarding-web-dark.mp4 4 1440
ext oml design-system/onboarding-mobile-light.mp4 2 640
ext pers design-system/personalization-web-light.mp4 2 1440
ext mem design-system/my-memories-web-light.mp4 0 1440
ext bw my-world/breakthrough-widget.mp4 0.5 1322
ext pg my-world/playground.mp4 1 1440
ext tbd my-world/topics-by-dimension.mp4 0 1440
ext drag gmail-job-tracker/drag.mp4 0 1440
ext board gmail-job-tracker/board.mp4 0 1440
ext steps moritz-intake/steps.mp4 0 1440
ext journey moritz-intake/journey.mp4 0 1440
ext cross switcharoo/crossy-roads.mp4 0 956
ext pop switcharoo/pop-the-balloon.mp4 1 500
ext stack switcharoo/stacking-blocks.mp4 1 504
npx http-server -p 8123 -s -c-1 . & SRV=$!
trap 'kill $SRV' EXIT
sleep 2
node render.mjs full   # or: node render.mjs preview 1.5 6 10  → stills in ./prev
python3 score.py score.wav   # original soundtrack (numpy + scipy), synced to the edit
"$FF" -loglevel error -y -i out.mp4 -i score.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "$V/showreel/arshita-showreel.mp4"
