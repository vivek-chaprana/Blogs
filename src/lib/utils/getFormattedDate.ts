function getFormattedDate(inputDate: Date): string {
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutesDifference < 1) return "just now";

  if (minutesDifference < 60)
    return `${minutesDifference} ${
      minutesDifference === 1 ? "min" : "mins"
    } ago`;

  if (hoursDifference < 24)
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;

  if (hoursDifference < 48) return "Yesterday";

  if (hoursDifference < 168) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeekIndex = inputDate.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }

  return inputDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default getFormattedDate;
