export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Seasonal gradient colors for each month
export const MONTH_THEMES: { gradient: string; accent: string }[] = [
  { gradient: "from-blue-400 to-blue-600", accent: "#3b82f6" }, // January - Winter blue
  { gradient: "from-pink-400 to-red-400", accent: "#f472b6" }, // February - Valentine pink
  { gradient: "from-green-400 to-emerald-500", accent: "#10b981" }, // March - Spring green
  { gradient: "from-pink-300 to-purple-400", accent: "#c084fc" }, // April - Cherry blossom
  { gradient: "from-green-400 to-lime-500", accent: "#84cc16" }, // May - Fresh green
  { gradient: "from-yellow-400 to-orange-400", accent: "#f59e0b" }, // June - Summer sun
  { gradient: "from-cyan-400 to-blue-500", accent: "#06b6d4" }, // July - Ocean blue
  { gradient: "from-orange-400 to-red-500", accent: "#f97316" }, // August - Hot summer
  { gradient: "from-amber-500 to-orange-500", accent: "#d97706" }, // September - Autumn
  { gradient: "from-orange-500 to-red-600", accent: "#ea580c" }, // October - Fall leaves
  { gradient: "from-amber-600 to-yellow-700", accent: "#b45309" }, // November - Thanksgiving
  { gradient: "from-red-500 to-green-600", accent: "#dc2626" }, // December - Christmas
];

// US Federal Holidays (returns holiday name or null)
export function getHoliday(
  year: number,
  month: number,
  day: number,
): string | null {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();

  // Fixed-date holidays
  if (month === 0 && day === 1) return "New Year's Day";
  if (month === 6 && day === 4) return "Independence Day";
  if (month === 10 && day === 11) return "Veterans Day";
  if (month === 11 && day === 25) return "Christmas Day";

  // MLK Day: Third Monday of January
  if (month === 0 && dayOfWeek === 1 && day >= 15 && day <= 21)
    return "MLK Day";

  // Presidents Day: Third Monday of February
  if (month === 1 && dayOfWeek === 1 && day >= 15 && day <= 21)
    return "Presidents Day";

  // Memorial Day: Last Monday of May
  if (month === 4 && dayOfWeek === 1 && day >= 25) return "Memorial Day";

  // Labor Day: First Monday of September
  if (month === 8 && dayOfWeek === 1 && day <= 7) return "Labor Day";

  // Columbus Day: Second Monday of October
  if (month === 9 && dayOfWeek === 1 && day >= 8 && day <= 14)
    return "Columbus Day";

  // Thanksgiving: Fourth Thursday of November
  if (month === 10 && dayOfWeek === 4 && day >= 22 && day <= 28)
    return "Thanksgiving";

  return null;
}

// Get ISO week number
export function getWeekNumber(
  year: number,
  month: number,
  day: number,
): number {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t >= s && t <= e;
}

export function isWeekend(year: number, month: number, day: number): boolean {
  const d = new Date(year, month, day).getDay();
  return d === 0 || d === 6;
}

export function isToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

export interface CalendarNote {
  id: string;
  text: string;
  type: "month" | "range";
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  color?: string;
  createdAt: string;
}

export interface CalendarSettings {
  accentColor: string;
  darkMode: boolean;
  showWeekNumbers: boolean;
}

const DEFAULT_SETTINGS: CalendarSettings = {
  accentColor: "#36a3ef",
  darkMode: false,
  showWeekNumbers: false,
};

export function loadNotes(): CalendarNote[] {
  try {
    return JSON.parse(localStorage.getItem("calendar-notes") || "[]");
  } catch {
    return [];
  }
}

export function saveNotes(notes: CalendarNote[]): void {
  localStorage.setItem("calendar-notes", JSON.stringify(notes));
}

export function loadEvents(): CalendarEvent[] {
  try {
    return JSON.parse(localStorage.getItem("calendar-events") || "[]");
  } catch {
    return [];
  }
}

export function saveEvents(events: CalendarEvent[]): void {
  localStorage.setItem("calendar-events", JSON.stringify(events));
}

export function loadSettings(): CalendarSettings {
  try {
    const saved = localStorage.getItem("calendar-settings");
    return saved
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: CalendarSettings): void {
  localStorage.setItem("calendar-settings", JSON.stringify(settings));
}

export function formatDateKey(
  year: number,
  month: number,
  day: number,
): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
