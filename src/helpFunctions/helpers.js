export function convertFrom24To12Format(time24) {
  let startString = "" + time24;
  try {
    startString = startString.split("");
    let start =
      startString.length === 3
        ? "0" + startString[0] + ":" + startString[1] + startString[2]
        : startString[0] +
          startString[1] +
          ":" +
          startString[2] +
          startString[3];

    const [sHours, minutes] = start.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "AM" : "PM";
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  } catch {
    startString = "";
    return null;
  }
}
