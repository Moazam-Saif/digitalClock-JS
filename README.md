# Digital Clock Widget

A browser-based clock widget with four modes: Clock, Stopwatch, Timer, and Alarm. No build step, no dependencies.

## Essential Files

| File | Role |
|---|---|
| `digi.html` | Structure — clock shell, mode buttons, time display, start/stop/reset/lap controls |
| `digi.js` | All mode logic — clock, stopwatch, timer countdown, alarm, input creation, state machine |
| `digi.css` | Dark theme with pink time display, clock border styling, timer/alarm input appearance |

---

## How It Works

The UI is a single clock shell. `digi.js` manages a `prevop` variable that tracks the current mode and drives all transitions.

```
Mode state machine (prevop)
  "Clock"     → live setInterval updating .time every second
  "StopWatch" → elapsed ms counter; Start/Stop/Reset/Lap buttons active
  "Timer"     → dynamically injects <input type="number"> fields into .time div;
                countdown via setInterval; alerts on zero
  "Alarm"     → injects hour/minute/AM-PM inputs; polls current time every second;
                alerts on match
```

Switching modes:
- Stops the previous mode's interval
- Clears or replaces the `.time` div content
- Shows/hides the bottom control bar and sidebar arrows
- The top bar shows a small running clock whenever a non-Clock mode is active

The ▲/▼ arrows adjust whichever input field is currently focused (`activeInput`). For the AM/PM field they toggle between "AM" and "PM" instead of incrementing.

---

## Usage

Open `digi.html` directly in any browser.

---

## Known Limitations / TODOs

- `stopTimer()` and `resetTimer()` are called from the bottom-bar click handler but are never defined — clicking Stop or Reset in Timer mode silently does nothing
- Alarm fires `window.alert()` — the tab must be in the foreground
- Alarm comparison is string-based on a once-per-second poll; could miss by up to one second
- Lap list has no cap and no clear button
- `activeInput` is used before it is ever assigned if the arrows are clicked before focusing a timer/alarm input field
