# 🧮 Calculator

A clean, modern, and fully functional calculator built with **HTML**, **CSS**, and **JavaScript**.

Perfect project for junior web developers to practice DOM manipulation, event handling, and clean UI design.

---

## ✨ Features

- ✅ Basic arithmetic operations: Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`÷`)
- ✅ Percentage calculation (`%`)
- ✅ Toggle positive / negative (`+/−`)
- ✅ All Clear (`AC`) and Delete last digit (`DEL`)
- ✅ Decimal point support
- ✅ Number formatting with thousand separators
- ✅ Error handling (e.g. division by zero)
- ✅ Full **keyboard support**
- ✅ Responsive design (works on mobile & desktop)
- ✅ Dark modern UI
- ✅ Accessible (ARIA labels included)

---

## ⌨️ Keyboard Shortcuts

| Key              | Action                  |
|------------------|-------------------------|
| `0-9`            | Enter numbers           |
| `.` or `,`       | Decimal point           |
| `+`              | Add                     |
| `-`              | Subtract                |
| `*` / `x` / `X`  | Multiply                |
| `/`              | Divide                  |
| `%`              | Percentage              |
| `Enter` or `=`   | Calculate result        |
| `Backspace`      | Delete last digit       |
| `Escape`         | All Clear (AC)          |

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (CSS Variables, Flexbox & Grid)
- **Vanilla JavaScript** (no frameworks or libraries)

---

## 📁 Project Structure

```
calculator/
├── index.html          # Main HTML structure
├── style.css           # All styles (dark theme)
├── script.js           # Calculator logic
├── images/
│   └── cal-logo.png    # Favicon / logo
└── README.md
```

---

## 🚀 Getting Started

### Option 1: Open directly

Just open the `index.html` file in your browser.

### Option 2: Use a local server (recommended)

```bash
# Using VS Code Live Server extension
# or any simple server:
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

---

## 🧠 How it works

The calculator keeps track of three main pieces of state:

- `currentOperand` → the number currently being typed
- `previousOperand` → the first number of an operation
- `operation` → the selected operator (`+`, `−`, `×`, `÷`)

When the user presses `=`, the `compute()` function performs the calculation and updates the display.

---

## 🎯 Learning Goals

This project is great for practicing:

- DOM manipulation
- Event handling (click + keyboard)
- Managing application state
- Handling edge cases (division by zero, long numbers, etc.)
- Writing clean and readable JavaScript
- Modern CSS (variables, grid, responsive design)
- Accessibility basics (ARIA labels)

---

## 📄 License

This project is open source and free to use for learning purposes.
