import { initialActivitiesStateTypes, SATypes } from "../customTypes";
import {
  SET_ACTIVITIES,
  SET_ACTIVITIESNU,
  SET_USERSEARCH,
  SET_SEARCHINPUT,
  SET_SEARCHSELECTVISIBLESTATUS,
  SET_POSITIONACCURACY,
  SET_COOKIECONSENTSTATUS,
  GET_ACTIVITIESDATA,
  GET_POSITIONACCURACY,
  GET_COOKIECONSENTSTATUS,
  GET_FORCEUPDATEACTIVITIESDATA,
  GET_SEARCHVISIBILITYSTATUS,
  GET_USERSEARCH,
  GET_SEARCHINPUT,
  GET_FILTERACTIVITYLIST,
  GET_FILTERACTIVITYLISTNU,
} from "./actionTypes";

const initialActivitiesState: initialActivitiesStateTypes = {
  activities: [] as SATypes[],
  activitiesNU: [] as SATypes[],
  userSearch: "  Name",
  searchInput: "name",
  searchSelectVisibleStatus: false,
  positionAccuracy: null,
  cookieConsentChoiceMade: null,
};

// Getters
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

// Setters
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

const activitiesReducer = (state = initialActivitiesState, action: any) => {
  const { activitiesData } = action;
  const { cookieConsent } = action;
  const positionAccuracyResult = action.positionAccuracy;
  const searchVisibilityStatus = action.status;
  const userSearch = action.selection;
  const searchInput = action.input;
  console.log(action);
  switch (action.type) {
    case SET_COOKIECONSENTSTATUS:
      return {
        ...state,
        cookieConsentChoiceMade: cookieConsent,
      };
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: activitiesData,
      };
    case SET_ACTIVITIESNU:
      return {
        ...state,
        activitiesNU: activitiesData,
      };
    case SET_USERSEARCH:
      return {
        ...state,
        userSearch: userSearch,
      };
    case SET_SEARCHINPUT:
      return {
        ...state,
        searchInput: searchInput,
      };
    case SET_SEARCHSELECTVISIBLESTATUS:
      return {
        ...state,
        searchSelectVisibleStatus: searchVisibilityStatus,
      };
    case SET_POSITIONACCURACY:
      return {
        ...state,
        positionAccuracy: positionAccuracyResult,
      };
    default:
      return state;
  }
};

export default activitiesReducer;
