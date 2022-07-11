import { SATypes } from "../customTypes";

// Variable getters
export const GET_ACTIVITIESDATA: string = "GET_ACTIVITIESDATA";
export const GET_POSITIONACCURACY: string = "GET_POSITIONACCURACY";
export const GET_COOKIECONSENTSTATUS: string = "GET_COOKIECONSENTSTATUS";
export const GET_FORCEUPDATEACTIVITIESDATA: string =
  "GET_FORCEUPDATEACTIVITIESDATA";
export const GET_SEARCHVISIBILITYSTATUS: string = "GET_SEARCHVISIBILITYSTATUS";
export const GET_USERSEARCH: string = "GET_USERSEARCH";
export const GET_SEARCHINPUT: string = "GET_SEARCHINPUT";
export const GET_FILTERACTIVITYLIST: string = "GET_FILTERACTIVITYLIST";
export const GET_FILTERACTIVITYLISTNU: string = "GET_FILTERACTIVITYLISTNU";

// Variable setters
export const SET_ACTIVITIES: string = "SET_ACTIVITIES";
export const SET_ACTIVITIESNU: string = "SET_ACTIVITIESNU";
export const SET_USERSEARCH: string = "SET_USERSEARCH";
export const SET_SEARCHINPUT: string = "SET_SEARCHINPUT";
export const SET_SEARCHSELECTVISIBLESTATUS: string =
  "SET_SEARCHSELECTVISIBLESTATUS";
export const SET_POSITIONACCURACY: string = "SET_POSITIONACCURACY";
export const SET_COOKIECONSENTSTATUS: string = "SET_COOKIECONSENTSTATUS";
export const SET_SEARCHVISIBILITYSTATUS: string = "SET_SEARCHVISIBILITYSTATUS";

// Function getters
export const getActivitiesData = () => ({
  type: GET_ACTIVITIESDATA,
});
export const getPositionAccuracy = () => ({
  type: GET_POSITIONACCURACY,
});
export const getCookieConsentStatus = () => ({
  type: GET_COOKIECONSENTSTATUS,
});
export const getForceUpdateActivitiesData = () => ({
  type: GET_FORCEUPDATEACTIVITIESDATA,
});
export const getSearchVisibilityStatus = () => ({
  type: GET_SEARCHVISIBILITYSTATUS,
});
export const getUserSearch = () => ({
  type: GET_USERSEARCH,
});
export const getSearchInput = () => ({
  type: GET_SEARCHINPUT,
});
export const getFilterActivityList = () => ({
  type: GET_FILTERACTIVITYLIST,
});
export const getFilterActivityListNU = () => ({
  type: GET_FILTERACTIVITYLISTNU,
});

// Function setters
export const setActivitiesData = (activitiesData: SATypes[]) => ({
  type: SET_ACTIVITIES,
  activitiesData,
});
export const setActivitiesDataNU = (activitiesData: SATypes[]) => ({
  type: SET_ACTIVITIESNU,
  activitiesData,
});
export const setPositionAccuracy = (positionAccuracy: string) => ({
  type: SET_POSITIONACCURACY,
  positionAccuracy,
});
export const setCookieConsentStatus = (cookieConsent: string | null) => ({
  type: SET_COOKIECONSENTSTATUS,
  cookieConsent,
});
export const setSearchVisibilityStatus = (status: Boolean) => ({
  type: SET_SEARCHSELECTVISIBLESTATUS,
  status,
});
export const setUserSearch = (selection: any) => ({
  type: SET_USERSEARCH,
  selection,
});
export const setSearchInput = (input: any) => ({
  type: SET_SEARCHINPUT,
  input,
});
