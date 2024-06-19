export function localDate(date) {
  const utcDateStr = date;

  // Create a Date object from the UTC string
  const utcDate = new Date(utcDateStr);

  // Get the local date and time strings
  const localDateStr = utcDate.toLocaleDateString(); // Local date (mm/dd/yyyy or dd/mm/yyyy depending on the locale)
  const localTimeStr = utcDate.toLocaleTimeString();

  return localDateStr + " " + localTimeStr;
}
