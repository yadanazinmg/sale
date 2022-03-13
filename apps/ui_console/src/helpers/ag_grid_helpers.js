import moment from "moment";
import { getDifferenceInMinAndSec } from "./date_helpers";

export const dateFormatter = (params) => {
  if (params && params.value) {
    const d = new Date(params.value);
    const m = moment(new Date(params.value));
    if (m.isValid()) return m.format("DD/MM/YYYY hh:mm a");
  }
  return "-";
};

export const dateFormatterReport = (params) => {
  if (params && params.value) {
    const d = new Date(params.value);
    const m = moment(new Date(params.value));
    if (m.isValid()) return m.format("DD/MM/YYYY");
  }
  return "-";
};

export const durationFormatter = (params) => {
  try {
    const duration = params.value;
    //return `${duration.totalSec}`;
    return `${duration.min}min ${duration.sec}sec`;
  } catch (err) {}
  return "-";
};

export const durationGetter = (params) => {
  try {
    if (params.data.entry_at && params.data.exit_at) {
      const entry_at = new Date(params.data.entry_at);
      const exit_at = new Date(params.data.exit_at);
      const diff = getDifferenceInMinAndSec(entry_at, exit_at);
      return diff;
    }
  } catch (err) {}
  return null;
};

export const entryOnlyDurationGetter = (params) => {
  try {
    if (params.data.entry_at) {
      const entry_at = new Date(params.data.entry_at);
      const exit_at = new Date();
      const diff = getDifferenceInMinAndSec(entry_at, exit_at);
      return diff;
    }
  } catch (err) {}
  return null;
};

export const durationComparator = (du1, du2) => {
  if (du1 === null && du2 === null) {
    return 0;
  }
  if (du1 === null) {
    return -1;
  }
  if (du2 === null) {
    return 1;
  }

  return du1.totalSec - du2.totalSec;
};
