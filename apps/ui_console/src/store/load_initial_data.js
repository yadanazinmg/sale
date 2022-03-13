import { map, mergeMap, tap } from "rxjs/operators";
import { from } from "rxjs";
import constants from "../constants";

const createXHR = () => new XMLHttpRequest();

const loadInitialData = (store, apolloClient) => {
  console.log(constants.app_name);
};

export default loadInitialData;
