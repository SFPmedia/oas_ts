import { initialActivitiesStateTypes, SATypes } from "../customTypes";
import {
  SET_ACTIVITIES,
  SET_ACTIVITIESNU,
  SET_USERSEARCH,
  SET_SEARCHINPUT,
  SET_SEARCHSELECTVISIBLESTATUS,
  SET_POSITIONACCURACY,
  SET_COOKIECONSENTSTATUS,
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
