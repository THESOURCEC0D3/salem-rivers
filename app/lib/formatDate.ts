/**
 * Turn an ISO date (`2026-10-18`) into the long form the rest of the site uses
 * (`18 October 2026`) — matching how events are written in `church.ts`.
 *
 * WHY NOT `new Date(iso).toLocaleDateString(...)`:
 *
 *   `new Date("2026-10-18")` is parsed as midnight UTC. Formatting that in any
 *   timezone BEHIND UTC gives the previous day — a visitor in Lagos sees
 *   18 October, one in New York sees 17 October, from the same string. The
 *   church has diaspora reach (its own conference line-up lists UK ministers),
 *   so that is a real audience, not a hypothetical one.
 *
 *   `Intl` would also format to the visitor's locale, so an en-GB browser might
 *   render "18/10/2026" while the event pages a scroll away say
 *   "Tuesday 10 to Sunday 15 November 2026".
 *
 * Parsing the three parts and building the string avoids both: no Date object,
 * no timezone, no locale, identical output everywhere.
 *
 * STORE ISO, FORMAT HERE. Keeping the data ISO means it stays sortable and
 * unambiguous (`11-10-2026` could be 11 October or 10 November), while the
 * display stays consistent automatically — a new entry cannot drift the way
 * two of the sermon dates had.
 */
const MONTHS = [
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

export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return iso; // Not ISO — show it as given rather than "Invalid Date".

  const [, year, month, day] = match;
  const name = MONTHS[Number(month) - 1];
  if (!name) return iso; // Guards a bad month like "2026-13-01".

  return `${Number(day)} ${name} ${year}`;
}
