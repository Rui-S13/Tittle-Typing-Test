# Tittle

**Every keystroke counts.**

Tittle is a typing speed and accuracy test built with vanilla HTML, CSS and JavaScript (ES6+). Instead of random words, you type real passages from public domain books, and every test is saved in your browser so you can watch your progress over time.

The name comes from the *tittle*, the small dot over the letters "i" and "j".

**Live site:** https://rui-s13.github.io/Tittle-Typing-Test/

---

## Features

- **Typing directly on the quote.** Letters turn correct or wrong as you type, with a caret on the next letter. The quote scrolls line by line, so long passages always fit.
- **Live stats:** WPM, accuracy and mistakes update while you type.
- **Timer modes:** no timer (finish the whole quote), 30 seconds or 60 seconds.
- **Sound effects** with a different sound for correct and wrong keystrokes (optional).
- **Keyboard shortcuts:** `Enter` for a new test, `Esc` to cancel the current one.
- **Cancel without losing the quote:** a cancelled test is not saved, and you can still read the rest of the passage and open the book on Project Gutenberg.
- **Personal best message** when you beat your best result of the session or of all time.
- **Session summary and history:** average WPM and accuracy of the current session, plus a table with every test.
- **Stats page:** best WPM (with its date), average WPM, average accuracy, number of tests, total typing time, and a chart of your progress.
- **Dark mode**, remembered between visits.
- **Caps Lock warning**, and a message when the typing area loses focus.
- **Responsive layout** and basic accessibility (keyboard navigation, labels, reduced-motion friendly).

---

## Run it locally

The site uses ES modules and `fetch`, so it must be served over HTTP. Opening `index.html` directly from the file system will not work.

1. Clone the repository:
   ```bash
   git clone https://github.com/Rui-S13/tittle-typing-test.git
   cd tittle-typing-test
   ```
2. Start any local server in that folder. Pick one:
   - **VS Code:** install the *Live Server* extension, then right-click `index.html` and choose *Open with Live Server*.
   - **Node.js:** `npx serve`
   - **Python:** `python -m http.server 8000`
3. Open the address the server prints (for example `http://localhost:8000`).

No installation or build step is needed to run the site.

### Regenerating the quotes (optional)

`data/quotes.json` and `data/books.json` are already included. To rebuild them from Project Gutenberg:

```bash
npm install
node data/generateQuotes.js
```

This needs Node.js 18 or newer and an internet connection, and it takes a while because it downloads every book. The list of books is in `data/bookIds.js`.

---

**Data persistence:** `localStorage` keeps the saved tests, the settings and the dark mode choice. `sessionStorage` keeps the history of the current session.

---

## Project structure

```
tittle-typing-test/
├── index.html           # typing test page
├── stats.html           # statistics page
├── main.js              # entry point of the test page
├── stats.js             # entry point of the stats page
├── style.css            # shared styles
├── stats.css            # styles of the stats page
├── assets/              # logo, icons and sounds
├── fonts/               # Inter font
├── data/
│   ├── bookIds.js       # Project Gutenberg book ids
│   ├── generateQuotes.js# script that builds the JSON files
│   ├── books.json       # book titles, authors and ids
│   └── quotes.json      # the passages used in the tests
└── js/
    ├── calculations.js  # WPM, accuracy and statistics
    ├── chart.js         # progress chart on the stats page
    ├── compareTest.js   # personal best and session best messages
    ├── constants.js     # test states and shared names
    ├── darkMode.js      # dark mode toggle and persistence
    ├── quotes.js        # loading and rendering quotes
    ├── sessionInfo.js   # session history and summary
    ├── settings.js      # timer and sound settings
    ├── sound.js         # keystroke sounds
    ├── storage.js       # localStorage and sessionStorage helpers
    ├── test.js          # test logic and state
    ├── testDisplay.js   # updates the test screen
    └── testScroll.js    # scrolls the quote as you type
```

---

## How the quotes were made

The passages come from public domain books on [Project Gutenberg](https://www.gutenberg.org/). A Node script uses the [Gutendex](https://gutendex.com/) API to get each book, cleans the HTML (page numbers, footnotes, special characters), keeps paragraphs within a fixed length, and saves them to JSON. Only characters that can be typed on a standard keyboard are kept.

---

## Limitations

- **There are no accounts.** Everything is saved in your own browser, so results are not shared between devices, and clearing the browser data deletes them. The *Delete All Data* button on the stats page does the same on purpose.
- **A physical keyboard works best.** The test needs a keyboard to be comfortable, and mobile support is basic.
- **Statistics are calculated from the saved tests only**, so they start from zero in a new browser.

---

## Credits

- Book texts: [Project Gutenberg](https://www.gutenberg.org/) (public domain).
- Book data: [Gutendex](https://gutendex.com/).
- Charts: [Chart.js](https://www.chartjs.org/).
- Font: [Inter](https://rsms.me/inter/).

---

## Author

Built by **Rui Silva** ([@Rui-S13](https://github.com/Rui-S13)), 2026, as a project for a JavaScript course.