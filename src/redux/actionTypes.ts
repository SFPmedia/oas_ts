// Variable getters
export const GET_ACTIVITIESDATA = "GET_ACTIVITIESDATA";
export const GET_POSITIONACCURACY = "GET_POSITIONACCURACY";
export const GET_COOKIECONSENTSTATUS = "GET_COOKIECONSENTSTATUS";
export const GET_FORCEUPDATEACTIVITIESDATA = "GET_FORCEUPDATEACTIVITIESDATA";
export const GET_SEARCHVISIBILITYSTATUS = "GET_SEARCHVISIBILITYSTATUS";
export const GET_USERSEARCH = "GET_USERSEARCH";
export const GET_SEARCHINPUT = "GET_SEARCHINPUT";
export const GET_FILTERACTIVITYLIST = "GET_FILTERACTIVITYLIST";
export const GET_FILTERACTIVITYLISTNU = "GET_FILTERACTIVITYLISTNU";

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
export const setActivitiesData = (activitiesData: any) => ({
  type: SET_ACTIVITIES,
  activitiesData,
});
export const setActivitiesDataNU = (activitiesData: any) => ({
  type: SET_ACTIVITIESNU,
  activitiesData,
});
export const setPositionAccuracy = (positionAccuracy: any) => ({
  type: SET_POSITIONACCURACY,
  positionAccuracy,
});
export const setCookieConsentStatus = (cookieConsent: any) => ({
  type: SET_COOKIECONSENTSTATUS,
  cookieConsent,
});
export const setSearchVisibilityStatus = (status: any) => ({
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
