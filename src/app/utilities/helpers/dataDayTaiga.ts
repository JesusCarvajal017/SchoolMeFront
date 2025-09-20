import { TuiDay } from "@taiga-ui/cdk/date-time";

export function formatTuiDay(day:TuiDay): string {
  const d = String(day.day).padStart(2, '0');        // 01–31
  const m = String(day.month).padStart(2, '0');      // 01–12  👈 Ojo: TuiDay.month ya es 1–12
  const y = day.year;
  return `${d}-${m}-${y}`;
}