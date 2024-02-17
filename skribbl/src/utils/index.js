export function getPositionSuffix(position) {
  if (position >= 11 && position <= 13) {
    return "th"; // Special case for 11th, 12th, and 13th
  }

  const lastDigit = position % 10;

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
