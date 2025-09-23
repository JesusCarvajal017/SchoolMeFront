import { TuiDay } from "@taiga-ui/cdk/date-time";

export function formatTuiDay(day:TuiDay): string {
  const d = String(day.day).padStart(2, '0');        // 01–31
  const m = String(day.month).padStart(2, '0');      // 01–12  👈 Ojo: TuiDay.month ya es 1–12
  const y = day.year;
  return `${y}-${m}-${d}`;
}

export function parseTuiDay(dateStr: string): TuiDay | null {
  // Espera formato YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;

  const [y, m, d] = parts.map(Number);

  if (!y || !m || !d) return null;

  try {
    return new TuiDay(y, m, d); // 👈 usa el constructor
  } catch {
    return null; // si los valores no son válidos
  }
}