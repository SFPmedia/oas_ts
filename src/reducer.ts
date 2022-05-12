import { SATypes } from "./customTypes";

const initialState = {
  activities: [] as SATypes[],
  activitiesNU: [] as SATypes[],
  userSearch: "  Name",
  searchInput: "name",
  searchSelectVisibleStatus: false,
  positionAccuracy: null,
  cookieConsentChoiceMade: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_COOKIECONSENTSTATUS":
      return {
        ...state,
        cookieConsentChoiceMade: action.payload,
      };
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "SET_ACTIVITIESNU":
      return {
        ...state,
        activitiesNU: action.payload,
      };
    case "SET_USERSEARCH":
      return {
        ...state,
        userSearch: action.payload,
      };
    case "SET_SEARCHINPUT":
      return {
        ...state,
        searchInput: action.payload,
      };
    case "SET_SEARCHSELECTVISIBLESTATUS":
      return {
        ...state,
        searchSelectVisibleStatus: action.payload,
      };
    case "SET_POSITIONACCURACY":
      return {
        ...state,
        positionAccuracy: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
