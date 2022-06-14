import { PositionType, SATypes } from "../customTypes";

// When the react component has mounted, the useEffect checks if data can already be found in the local storage and if said data is not older than 18 hours.
// If data has been found and it is not older than 18 hours. Then that data will be inserted into the "activitiesNU" list. This data will then
// be used to generate the list.
// If the 2 conditions are not true. It will retrieve a new set of data from the database on the server, via a webAPI and insert that data into "activitiesNU" instead.
export const fetchActivities = async (): Promise<string[] | undefined> => {
  let localStorageExpirationTimeToNumber: number = JSON.parse(
    localStorage.getItem("lsExpirationTime")!
  );
  if (
    localStorage.getItem("activities") &&
    new Date().getTime() <= localStorageExpirationTimeToNumber
  ) {
    const getLocalStorage: string[] = JSON.parse(
      localStorage.getItem("activities")!
    );
    const activities: string[] = getLocalStorage;
    console.log("LocalStorage activities have been found. Using those.");
    return activities;
  } else {
    await fetch("https://sfpmedia.dk/db_api_oas/readActivities.php")
      .then((response: Response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("activities", JSON.stringify(data));
        localStorage.setItem(
          "lsExpirationTime",
          JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 18)
        );
        const getLocalStorage: Object[] = JSON.parse(
          localStorage.getItem("activities")!
        );
        const activities: Object[] = getLocalStorage;
        console.log(
          "LocalStorage activities were not found. Getting and using new ones."
        );
        return activities;
      });
  }
};

// forceUpdateActivities() gives the user a way to clear the local storage, get the latest data from the server and then insert that into the local storage and "activities" + "activitiesNU" states.
export const forceUpdateActivities = async (): Promise<void> => {
  await fetch("https://sfpmedia.dk/db_api_oas/readActivities.php")
    .then((response: Response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("activities", JSON.stringify(data));
      localStorage.setItem(
        "lsExpirationTime",
        JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 18)
      );
      const getLocalStorage: Object[] = JSON.parse(
        localStorage.getItem("activities")!
      );
      const activities: Object[] = getLocalStorage;
      console.log("Forced update of localstorage data and react state.");
      alert(
        "Forced update successful. The list has the newest data straight from the database."
      );
      console.log(activities);
      return activities;
    });
};

export let filteredActivityList: any;

// Whenever a person types in the search bar, this function filters through the entire list and only returns a list that corresponds with
// what the user is searching for
export const filterActivityList = (searchInputProp: string): SATypes[] => {
  const filterInputValue: string = (
    document.getElementById("filterInput") as HTMLInputElement
  ).value;

  const getLocalStorage: SATypes[] = JSON.parse(
    localStorage.getItem("activities")!
  );
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
  console.log(searchResult);
  return (filteredActivityList = searchResult);
};

export let text: string;
export let userSearchType: string;

// The searchSelect() function allows the user to choose which type of information the filter should search by.
export const searchSelect = (Search: string) => {
  console.log("Test 1");
  let searchType: string = Search;
  console.log("Search = " + searchType);
  console.log("Launch searchSelect action");
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
  console.log("End of searchSelect action");
};

export let searchSelectVisibilityStatus: Boolean = false;

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

export let accuracySuccessResult: string;

export const accuracySuccess = async (
  position: PositionType
): Promise<string> => {
  const accuracyToKiloMeter: number = position.coords.accuracy / 1000;
  accuracySuccessResult = accuracyToKiloMeter.toString().substring(0, 4);
  return accuracySuccessResult;
};

export let filteredActivityListNU: any;

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
