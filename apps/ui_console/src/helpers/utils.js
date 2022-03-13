export const getNameId = (name) => {
  return name.toLowerCase().replace(/ /g, "_");
};

export const isFunc = (v) => {
  return typeof v === "function";
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const cleanString = (string) => string.trim().replace(/(^[,\s]+)|([,\s]+$)/g, "");

export const address2string = (address, line = 0) => {
  const { Line, Township, Town, State, Country, PostalCode } = address;
  let addressParts = [];

  if (line === 0 || line === 1) {
    //console.log(Line);
    if (Line) addressParts.push(cleanString(Line));
    if (Township) addressParts.push(capitalizeFirstLetter(cleanString(Township)) + " Township");
  }

  if (line === 0 || line === 2) {
    if (Town) addressParts.push(capitalizeFirstLetter(cleanString(Town)));
    if (State) addressParts.push(capitalizeFirstLetter(cleanString(State)));
    if (Country) addressParts.push(capitalizeFirstLetter(cleanString(Country)));
    if (PostalCode) addressParts.push(capitalizeFirstLetter(cleanString(PostalCode)));
  }

  let addressString = addressParts.join(", ");
  // if (PostalCode) addressString += ` (${PostCode})`;

  return addressString;
};

const doseData = { "1ST": 1, "2ND": 2, Booster1ST: 3, Booster2ND: 4 };

export const doseTypeSorter = (a, b) => {
  const aValue = doseData[a.DoseType];
  const bValue = doseData[b.DoseType];

  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
};
