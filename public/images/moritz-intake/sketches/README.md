# Moritz Intake — ideation sketches

Hand-drawn index cards for `app/projects/moritz-intake/page.tsx`. Originals are
iPhone HEIC photos of the cards on a desk, kept in `content/images/moritz-ideation/`
(gitignored). These are cropped to the card only, deskewed where tilted, and
saved as JPEG q82 at max 1600px on the long edge.

| File | Case-study section | Source original |
| --- | --- | --- |
| `sketch-home-new-case.jpg` | Approach | `IMG_7680 2.HEIC` |
| `sketch-track-states.jpg` | Step mark | `IMG_7687 2.HEIC` |
| `sketch-receipt-in-thread.jpg` | Receipts | `IMG_7678 2.HEIC` |
| `sketch-card-three-faces.jpg` | Submission | `IMG_7684 2.HEIC` |
| `sketch-two-tiles.jpg` | Home (2-up, left) | `IMG_7685 2.HEIC` |
| `sketch-home-your-cases.jpg` | Home (2-up, right) | `IMG_7686 2.HEIC` |
| `sketch-home-lawyers.jpg` | Human | `IMG_7689 2.HEIC` |
| `sketch-no-size-morph.jpg` | Crossed out (3-up) | `IMG_7682 2.HEIC` |
| `sketch-fires-at-top.jpg` | Crossed out (3-up) | `IMG_7688 2.HEIC` |
| `sketch-no-collapse.jpg` | Crossed out (3-up) | `IMG_7690 2.HEIC` |

To regenerate, run `python3 crop_cards.py` (needs Pillow, numpy, scipy and macOS
`sips`). The script lives outside the repo, in the Claude session scratchpad
(`.../scratchpad/crop_cards.py`); it converts each HEIC, finds the card, deskews
and crops it, with per-file inset overrides in its `OVR` dict. Update `width` /
`height` on the matching `<ImageFrame>` if a crop changes.
