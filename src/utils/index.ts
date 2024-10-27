import { DropdownItem } from "../components/DatePicker/types";

export const MONTHS: DropdownItem[] = [
  { id: 0, label: "JAN" },
  { id: 1, label: "FEB" },
  { id: 2, label: "MAR" },
  { id: 3, label: "APR" },
  { id: 4, label: "MAY" },
  { id: 5, label: "JUN" },
  { id: 6, label: "JUL" },
  { id: 7, label: "AUG" },
  { id: 8, label: "SEP" },
  { id: 9, label: "OCT" },
  { id: 10, label: "NOV" },
  { id: 11, label: "DEC" },
];

export const WEEK_DAYS: DropdownItem[] = [
  { id: 0, label: "SUN" },
  { id: 1, label: "MON" },
  { id: 2, label: "TUE" },
  { id: 3, label: "WED" },
  { id: 4, label: "THU" },
  { id: 5, label: "FRI" },
  { id: 6, label: "SAT" },
];

export function createYearsArray(date: Date): DropdownItem[] {
  const year = date.getFullYear();
  const yearsArray: DropdownItem[] = [];

  for (let i = year + 10; i > year - 50; i--) {
    yearsArray.push({ id: i, label: i.toString() });
  }

  return yearsArray;
}