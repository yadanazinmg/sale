import all_constants from "./constants.json";
const env = process.env.NODE_ENV || "development";
//const constants = require(__dirname + "/constants.json")[env];
const constants = all_constants[env];

constants["app_name"] = "Parking Control";
constants["app_id"] = "Parking Control";
constants["sidebar_title"] = "Management";
constants["drawerWidth"] = 240;

export default constants;
