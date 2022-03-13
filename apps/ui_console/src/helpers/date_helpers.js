import moment from "moment";

export const getDifferenceInDays = (date1, date2) => {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
};

export const getDifferenceInHours = (date1, date2) => {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
};

export const getDifferenceInMinutes = (date1, date2) => {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
};

export const getDifferenceInMinAndSec = (date1, date2) => {
  const totalSec = getDifferenceInSeconds(date1, date2);
  let min = parseInt(totalSec / 60);
  let sec = parseInt(totalSec % 60);
  return { min, sec, totalSec };
};

export const getDifferenceInSeconds = (date1, date2) => {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / 1000;
};

export const getDifferenceInHourAndMin = (date1, date2) => {
  const totalMin = getDifferenceInMinutes(date1, date2);
  let hour = parseInt(totalMin / 60);
  let min = parseInt(totalMin % 60);
  return { hour, min, totalMin };
};

export const dateStringFormatter = (date) => {
  if (date) {
    try {
      const dObj = new Date(date);
      const m = moment(dObj);
      if (m.isValid()) return m.format("DD/MM/YYYY hh:mm a");
    } catch (err) {
      console.log(err);
      return "-";
    }
  } else return "-";
};
export const durationCalculator = (entry, exit) => {
  try {
    if (entry) {
      const entry_at = moment(entry);
      const exit_at = moment(exit);
      const diff = exit_at.diff(entry_at, "minutes");
      return `${diff} min`;
    } else {
      return " ";
    }
  } catch (err) {}
};

export const dateFormatterExcel = (params) => {
  console.log(params);
  if (params) {
    const m = moment(params);
    console.log(m);
    if (m.isValid()) return m.format("DD/MM/YYYY");
  }
  return "-";
};
