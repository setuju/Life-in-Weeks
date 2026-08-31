# Life in Weeks

> **A tangible visualization of human time, designed for deep reflection and intentional living.**

![Project Banner](https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80)

---

## 1. Project Overview

**Life in Weeks** visualizes an individual's entire lifespan as a structured **105 × 52 grid**, where every single cell represents one week (7 days) of conscious life. By mapping past, present, and future weeks into a tangible visual landscape of 5,460 squares, the application encourages users to reflect on the finite nature of time, celebrate past chapters, and deliberately shape remaining years.

### Core Philosophy
- **Tangibility over abstraction:** Numbers like "30 years" feel abstract; 1,560 colored squares on a 5,460-square canvas make time real.
- **Privacy by default:** Zero backends, zero logins, zero telemetry. All birthdates, memories, and personal milestones persist exclusively in the browser's `localStorage`.
- **Calm, intentional UI:** Designed without anxiety-inducing alarms or aggressive gamification—fostering stillness, clarity, and mindfulness.

---

## 2. Key Features

### 2.1 Interactive 105×52 Life Grid
- **52 Columns × 105 Rows:** Represents weeks of the year across a full 105-year lifespan horizon.
- **Past Weeks:** Muted slate shading symbolizing lived experiences.
- **Current Week (Now):** Distinct, glowing amber ring with pulsing beacon marking your exact current position in time.
- **Future Weeks:** Subtle, clean light cells representing unwritten possibilities.
- **Milestones & Events:** Vibrant markers highlighting significant memories and goals.
- **Decade & Horizon Dividers:** Clear visual accents marking each 10-year transition (20s, 30s, 40s...) and customizable lifespan horizons (e.g., 90-year mark).

### 2.2 Rich Hover Tooltips & Detail Popover
- Hover over any individual cell to inspect:
  - Exact **Year & Week Number** (e.g., *Year 28, Week 14*)
  - Associated **Age** and approximate **Calendar Year**
  - Formatted **Calendar Date Range** (e.g., *Apr 12, 2023 – Apr 18, 2023*)
  - Status badge (*Past Week*, *Current Week*, or *Future Week*)
  - Logged milestones and event summaries for that week.
- Click any cell or press `Enter` to open the **Cell Detail Modal** to view or record milestones directly for that exact point in time.

### 2.3 Full Keyboard Navigation
Navigate seamlessly across all 5,460 weeks without touching a mouse:
| Key | Action |
|---|---|
| `←` / `→` | Move one week backward or forward |
| `↑` / `↓` | Move one year earlier or later (same week) |
| `Home` | Jump to Week 1 of current year |
| `End` | Jump to Week 52 of current year |
| `PageUp` | Jump 10 years backward (1 decade) |
| `PageDown` | Jump 10 years forward (1 decade) |
| `Enter` / `Space` | Open week details & add/edit milestone |
| `Escape` | Close dialog or tooltip |

### 2.4 Customizable Birthdate & Timeline Configurator
- Replace static defaults with a date picker supporting birthdates across the full 105-year range.
- Quick preset buttons for instant age exploration.
- Instant recalculation of weeks lived, age milestones, and grid coloration.

### 2.5 Reflection & Stats Dashboard
- **Current Age:** Precise breakdown in years, weeks, and total days.
- **Weeks Lived:** Total accumulated weeks lived.
- **Weeks Remaining:** Tailored to customizable lifespan horizons (80, 85, 90, 95, 100, 105 years).
- **Percentage Realized:** Visual gauge showing the proportion of life lived vs. unwritten.
- **Upcoming Milestones:** Next 3 chronological milestones with live countdowns in weeks and years.

### 2.6 Milestones & Life Events Manager
- Record life events with customizable categories:
  - 🏆 *Milestone & Chapter*
  - 💼 *Career & Work*
  - 🌱 *Personal Growth*
  - 🏃 *Health & Wellness*
  - 🎓 *Education*
  - 👨‍👩‍👧 *Family & Relationships*
  - ✈️ *Travel & Adventure*
- Built-in **Brainstorm Templates** for rapid milestone entry (e.g., Graduation, First Job, Turning 30, Retirement).
- Real-time search and category filtering.

### 2.7 Seasonal Ambient Background
- Automatically harmonizes the visual atmosphere to the user's current date (Northern Hemisphere seasons):
  - 🌸 **Spring:** Soft emerald greens and renewal tones.
  - ☀️ **Summer:** Warm golds and bright radiance.
  - 🍂 **Autumn:** Earthy ambers, warm oranges, and reflective tones.
  - ❄️ **Winter:** Crisp slates, cool blues, and quiet stillness.

### 2.8 Print & PDF Export Engine
- Dedicated **Export / Print PDF** mode with custom `@media print` styling:
  - Hides interactive buttons, inputs, and popups.
  - Generates a clean document with a summary header, high-contrast life grid, and a catalog of all recorded milestones for physical journaling or framing.

---

## 3. Tech Stack

- **Framework:** React 18 + TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Utility-first, zero heavy external UI dependencies)
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Persistence:** LocalStorage API (zero backend required)

---

## 4. Project Structure

```
src/
├── components/
│   ├── Background/
│   │   └── SeasonalBackground.tsx    # Ambient seasonal gradient wrapper
│   ├── Events/
│   │   └── EventManager.tsx          # Milestone creation, search & categories
│   ├── Grid/
│   │   ├── CellDetailModal.tsx       # Modal for inspecting a week & adding events
│   │   ├── GridCell.tsx              # Individual week square with focus & pulse states
│   │   ├── GridTooltip.tsx           # Floating hover tooltip for cell details
│   │   ├── LifeGrid.tsx              # Master 105×52 grid with keyboard navigation
│   │   └── YearLabel.tsx             # Left-hand year/age indicators with decade markers
│   ├── Layout/
│   │   ├── BirthdatePicker.tsx       # Date input & quick age presets
│   │   ├── Footer.tsx                # Attribution & reflection quote
│   │   ├── Header.tsx                # App banner, season mood & action toolbar
│   │   └── KeyboardShortcutsModal.tsx# Keyboard shortcuts guide
│   └── Stats/
│       └── StatsPanel.tsx            # Metrics cards, progress bar & milestone countdowns
├── hooks/
│   ├── useLifeWeeks.ts               # Lifespan mathematical calculations
│   └── useLocalStorage.ts           # Type-safe browser storage hook
├── types/
│   └── index.ts                      # Shared TypeScript interfaces & types
├── utils/
│   ├── dateUtils.ts                  # Week conversion & calendar helpers
│   └── seasonUtils.ts                # Seasonal dates & styling presets
├── App.tsx                           # Top-level state coordination
├── index.css                         # Tailwind CSS imports & print styles
└── main.tsx                          # Application entry point
```

---

## 5. Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
npm install
```

### Development
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to view the application.

### Production Build
```bash
npm run build
```

---

## 6. Inspiration & Acknowledgements

This project is directly inspired by **Tim Urban’s** seminal essay [*"Your Life in Weeks"*](https://waitbutwhy.com/2014/05/life-weeks.html) on **Wait But Why** (2014).

> *"Sometimes life seems really long. But the reality is that it’s noticeably short—a finite amount of weeks and days. When you visualize it, you can see how precious each box really is."*
