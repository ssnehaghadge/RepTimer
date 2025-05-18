# RepTimer - Fitness Routine Checklist

RepTimer is a simple, user-friendly web application for tracking your fitness exercises with individual timers. It allows you to start, pause, reset, and remove exercises from your routine while keeping track of your daily progress and motivating you with encouraging messages.

---

## Features

- Preloaded list of common exercises with specified durations.
- Add new exercises by specifying the name and duration.
- Individual timers for every exercise with Start, Pause, Reset controls.
- Mark exercises as complete manually or automatically when the timer finishes.
- Remove exercises from the routine.
- Tracks daily completion status and saves progress using `localStorage`.
- Displays daily progress count and motivational messages.
- Responsive and accessible design.

---

## How to Use

1. Open the `index.html` file in your favorite modern browser.
2. Use the "Add new exercise" form to add your own custom exercises.
3. Start each exercise timer and track your progress.
4. Mark exercises complete manually or let the timer auto-complete them.
5. Remove exercises you want to discard from the routine.
6. Your daily progress will persist across page reloads until the day changes.

---

## Getting Started

No installation or server is required. Simply open the files locally:

- `index.html` — The main HTML file that includes the UI and script.
- `style.css` — The CSS styles for the application.
- `script.js` — The JavaScript to handle exercise timers and logic.

---

## Code Structure

- **HTML**: Provides semantic structure with form, exercise list, and progress display.
- **CSS**: Uses the Poppins font, clean, relaxing color scheme, and responsive layout.
- **JavaScript**:
  - Manages exercise state and timers.
  - Persists daily completion in `localStorage`.
  - Updates UI dynamically.
  - Handles adding, removing, and controlling exercises.

---

## Accessibility

- Labels and ARIA attributes are added for screen reader support.
- Keyboard navigable controls.
- Live regions provide updates for progress and encouragement messages.

---

## Future Improvements

- Export and import routine feature.
- Detailed statistics and reports.
- Customizable themes and timer sounds.
- Sync across devices with backend support.

---

## License

This project is open-source and free to use.

---

Enjoy your workouts with RepTimer! Feel free to contribute or suggest features.

