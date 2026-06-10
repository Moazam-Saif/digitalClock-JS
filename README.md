# Digital Clock Widget

A browser-based clock widget with four modes: Clock, Stopwatch, Timer, and Alarm. Styled to look like a physical desk clock with a dark/pink theme.

---

## Features

- **Clock** — live time display, updates every second
- **Stopwatch** — start, stop, reset, and lap recording
- **Timer** — countdown with hours/minutes/seconds inputs; alerts when time is up
- **Alarm** — set an alarm by hour, minute, and AM/PM; fires an alert at the set time
- Switching modes swaps the display and shows/hides the relevant controls
- A small running clock in the top bar stays visible while in non-clock modes

---

## Usage

Open `digi.html` in any browser — no server required.

```
digi.html
digi.css
digi.js
```

Use the left panel (StopWatch / Timer / Alarm) to switch modes. Click a time input field to focus it, then use the ▲/▼ arrows to adjust the value.

---

## Known Limitations / TODOs

- Timer alert uses `window.alert()` — tab must be in focus for it to fire
- Alarm compares time as a formatted string once per second; could miss by up to ~1 second
- No sound — alarm and timer notifications are alerts only
- Lap list has no max cap and no clear button
- `stopTimer()` and `resetTimer()` functions are referenced in the event listener but not defined
