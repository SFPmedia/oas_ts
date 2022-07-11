import { PositionType, SATypes } from "../customTypes";

export let filteredActivityList: SATypes[];
export let filteredActivityListNU: SATypes[];
export let text: string;
export let userSearchType: string;
export let searchSelectVisibilityStatus: Boolean = false;
export let accuracySuccessResult: string;

// Whenever a person types in the search bar, this function filters through the entire list and only returns a list that corresponds with
// what the user is searching for
export const filterActivityList = (searchInputProp: string): SATypes[] => {
  const filterInputValue: string = (
    document.getElementById("filterInput") as HTMLInputElement
  ).value;
  const getLocalStorage: SATypes[] = filteredActivityListNU;
  let searchResult: SATypes[] = [];
  const searchInput: string = searchInputProp;

  getLocalStorage.map((activity: SATypes) => {
    let filterThisInput: string;
    const userSearchInput: string = searchInput;

    switch (userSearchInput) {
      case "name":
        filterThisInput = activity.name.toLowerCase();
        break;
      case "type":
        filterThisInput = activity.type.toLowerCase();
        break;
      case "description":
        filterThisInput = activity.description.toLowerCase();
        break;
      case "city":
        filterThisInput = activity.city.toLowerCase();
        break;
      case "municipality":
        filterThisInput = activity.municipality.toLowerCase()!;
        break;
      case "county":
        filterThisInput = activity.county.toLowerCase();
        break;
      case "opening-hours":
        filterThisInput = activity.open_hours.toLowerCase();
        break;
      case "closing-hours":
        filterThisInput = activity.closing_hours.toLowerCase();
        break;
      case "country":
        filterThisInput = activity.country.toLowerCase();
        break;
      case "subregion":
        filterThisInput = activity.subregion.toLowerCase();
        break;
      case "region":
        filterThisInput = activity.region.toLowerCase();
        break;

      default:
        filterThisInput = activity.name.toLowerCase();
    }

    let filteredInput: number = filterThisInput.indexOf(
      filterInputValue.toLowerCase()
    );
    if (filteredInput > -1) {
      return searchResult.push(activity);
    } else {
      return null;
    }
  });
  return (filteredActivityList = searchResult);
};

// The searchSelect() function allows the user to choose which type of information the filter should search by.
export const searchSelect = (Search: string) => {
  let searchType: string = Search;
  switch (searchType) {
    case "Name":
      text = " Name";
      userSearchType = "name";
      break;
    case "Type":
      text = " Type";
      userSearchType = "type";
      break;
    case "Description":
      text = " Description";
      userSearchType = "description";
      break;
    case "City":
      text = " City";
      userSearchType = "city";
      break;
    case "Municipality":
      text = " Municipality";
      userSearchType = "municipality";
      break;
    case "County":
      text = " County";
      userSearchType = "county";
      break;
    case "Opening-Hours":
      text = " Opening Hours";
      userSearchType = "opening-hours";
      break;
    case "Closing-Hours":
      text = " Closing Hours";
      userSearchType = "closing-hours";
      break;
    case "Country":
      text = " Country";
      userSearchType = "country";
      break;
    case "Subregion":
      text = " Subregion";
      userSearchType = "subregion";
      break;
    case "Region":
      text = " Region";
      userSearchType = "region";
      break;

    default:
      text = " Name";
      userSearchType = "name";
  }
};

// Determines whether or not the list is shown or not, when the button "SEARCH BY" is clicked.
export const searchSelectVisible = async (): Promise<Boolean> => {
  if (searchSelectVisibilityStatus === false) {
    searchSelectVisibilityStatus = true;
    return true;
  } else {
    searchSelectVisibilityStatus = false;
    return false;
  }
};

export const accuracySuccess = async (
  position: PositionType
): Promise<string> => {
  const accuracyToKiloMeter: number = position.coords.accuracy / 1000;
  accuracySuccessResult = accuracyToKiloMeter.toString().substring(0, 4);
  return accuracySuccessResult;
};

export const getCurrentLocation = (position: PositionType): SATypes[] => {
  let searchResultNU: SATypes[] = [];
  let latArr: number[] = [];
  let lonArr: number[] = [];
  let k: number;
  let userInput: string = (
    document.getElementById("filterInputNU") as HTMLInputElement
  ).value;
  let userInputToNumber: number = parseInt(userInput);

  const getLocalStorageNU: SATypes[] = JSON.parse(
    localStorage.getItem("activities")!
  );
  const activityArr: SATypes[] = getLocalStorageNU!;

  activityArr.map((singularActivityArr: SATypes) => {
    latArr.push(singularActivityArr.latitude!);
    return lonArr.push(singularActivityArr.longitude!);
  });

  for (k = 0; k < latArr.length; k++) {
    const lat1: number = activityArr[k].latitude!;
    const lon1: number = activityArr[k].longitude!;
    const lat2: number = position.coords.latitude;
    const lon2: number = position.coords.longitude;

    const R: number = 6371e3; // metres
    const φ1: number = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2: number = (lat2 * Math.PI) / 180;
    const Δφ: number = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ: number = ((lon2 - lon1) * Math.PI) / 180;

    const a: number =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d: number = R * c; // in metres
    const kmConverstion: number = d / 1000;

    if (kmConverstion < userInputToNumber) {
      searchResultNU.push(getLocalStorageNU![k]);
    }
  }
  return (filteredActivityListNU = searchResultNU);
};

export const cookieConsentStatus = (): string | null => {
  const lsConsentStatus: string | null = localStorage.getItem(
    "CookieConsentStatus"
  );
  if (lsConsentStatus === "false") {
    return "false";
  } else if (lsConsentStatus === "true") {
    return "true";
  } else {
    return null;
  }
};
