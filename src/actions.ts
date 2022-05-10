import { Dispatch } from "redux";

// When the react component has mounted, the useEffect checks if data can already be found in the local storage and if said data is not older than 18 hours.
// If data has been found and it is not older than 18 hours. Then that data will be inserted into the "activitiesNU" list. This data will then
// be used to generate the list.
// If the 2 conditions are not true. It will retrieve a new set of data from the database on the server, via a webAPI and insert that data into "activitiesNU" instead.
export const fetchActivities = () => {
  return async (dispatch: Dispatch) => {
    let localStorageExpirationTimeToNumber: number = JSON.parse(
      localStorage.getItem("lsExpirationTime")!
    );
    if (
      localStorage.getItem("activities") &&
      new Date().getTime() <= localStorageExpirationTimeToNumber
    ) {
      const getLocalStorage: object = JSON.parse(
        localStorage.getItem("activities")!
      );
      const activities = getLocalStorage;
      dispatch({
        type: "SET_ACTIVITIES",
        payload: activities,
      });
      dispatch({
        type: "SET_ACTIVITIESNU",
        payload: activities,
      });
      console.log("LocalStorage activities have been found. Using those.");
    } else {
      localStorage.removeItem("activities");
      localStorage.removeItem("lsExpirationTime");

      fetch("https://sfpmedia.dk/db_api_oas/readActivities.php")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("activities", JSON.stringify(data));
          localStorage.setItem(
            "lsExpirationTime",
            JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 18)
          );
          const getLocalStorage: string = JSON.parse(
            localStorage.getItem("activities")!
          );
          const activities = getLocalStorage;
          console.log(
            "LocalStorage activities were not found. Getting and using new ones."
          );
          dispatch({
            type: "SET_ACTIVITIES",
            payload: activities,
          });
          dispatch({
            type: "SET_ACTIVITIESNU",
            payload: activities,
          });
        });
    }
  };
};

// forceUpdateActivities() gives the user a way to clear the local storage, get the latest data from the server and then insert that into the local storage and "activities" + "activitiesNU" states.
export const forceUpdateActivities = () => {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("activities");
    localStorage.removeItem("lsExpirationTime");

    fetch("https://sfpmedia.dk/db_api_oas/readActivities.php")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("activities", JSON.stringify(data));
        localStorage.setItem(
          "lsExpirationTime",
          JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 18)
        );
        const getLocalStorage: object = JSON.parse(
          localStorage.getItem("activities")!
        );
        const activities = getLocalStorage;
        console.log("Forced update of localstorage data and react state.");
        dispatch({
          type: "SET_ACTIVITIES",
          payload: activities,
        });
        dispatch({
          type: "SET_ACTIVITIESNU",
          payload: activities,
        });
        alert(
          "Forced update successful. The list has the newest data straight from the database."
        );
      });
  };
};

// Whenever a person types in the search bar, this function filters through the entire list and only returns a list that corresponds with
// what the user is searching for
export const filterActivityList = (searchInputProp: string) => {
  return async (dispatch: Dispatch) => {
    const filterInputValue = (
      document.getElementById("filterInput") as HTMLInputElement
    ).value;

    const getLocalStorage = JSON.parse(localStorage.getItem("activities")!);
    let searchResult: string[] = [];

    const searchInput: string = searchInputProp;

    getLocalStorage.map((activity: any) => {
      let filterThisInput: string;
      const userSearchInput = searchInput;

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
          filterThisInput = activity.municipality.toLowerCase();
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

      var filteredInput: number = filterThisInput.indexOf(
        filterInputValue.toLowerCase()
      );
      if (filteredInput > -1) {
        return searchResult.push(activity);
      } else {
        return null;
      }
    });
    dispatch({
      type: "SET_ACTIVITIES",
      payload: searchResult,
    });
  };
};

// The searchSelect() function allows the user to choose which type of information the filter should search by.
export const searchSelect = (Search: string) => {
  return async (dispatch: Dispatch) => {
    var text: string;
    var userSearchType: string;
    var searchType: string = Search;
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
    dispatch({
      type: "SET_USERSEARCH",
      payload: text,
    });
    dispatch({
      type: "SET_SEARCHINPUT",
      payload: userSearchType,
    });
    dispatch({
      type: "SET_SEARCHSELECTVISIBLESTATUS",
      payload: false,
    });
  };
};

// Determines whether or not the list is shown or not, when the button "SEARCH BY" is clicked.
export const searchSelectVisible = (visibilityStatus: boolean) => {
  return async (dispatch: Dispatch) => {
    if (visibilityStatus === false) {
      return dispatch({
        type: "SET_SEARCHSELECTVISIBLESTATUS",
        payload: true,
      });
    } else {
      return dispatch({
        type: "SET_SEARCHSELECTVISIBLESTATUS",
        payload: false,
      });
    }
  };
};

export const accuracySuccess = (position: string | null) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: "SET_POSITIONACCURACY",
      payload: position,
    });
  };
};

export const getCurrentLocation = (position: any) => {
  return async (dispatch: Dispatch) => {
    let searchResultNU: Array<any> = [];
    let latArr: number[] = [];
    let lonArr: number[] = [];
    let k: number;
    let userInput: string = (
      document.getElementById("filterInputNU") as HTMLInputElement
    ).value;

    let userInputToNumber: number = parseInt(userInput);

    const getLocalStorageNU: string[] | null = JSON.parse(
      localStorage.getItem("activities")!
    );
    const activityArr: Array<any> = getLocalStorageNU!;

    activityArr.map((singularActivityArr: any) => {
      latArr.push(singularActivityArr.latitude);
      return lonArr.push(singularActivityArr.longitude);
    });

    for (k = 0; k < latArr.length; k++) {
      const lat1: number = activityArr[k].latitude;
      const lon1: number = activityArr[k].longitude;
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

    return dispatch({
      type: "SET_ACTIVITIESNU",
      payload: searchResultNU,
    });
  };
};

// Determines whether or not the list is shown or not, when the button "SEARCH BY" is clicked.
export const cookieConsentStatus = (status: boolean | null) => {
  return async (dispatch: Dispatch) => {
    if (status === false) {
      return dispatch({
        type: "SET_COOKIECONSENTSTATUS",
        payload: false,
      });
    } else if (status === true) {
      return dispatch({
        type: "SET_COOKIECONSENTSTATUS",
        payload: true,
      });
    } else {
      return dispatch({
        type: "SET_COOKIECONSENTSTATUS",
        payload: null,
      });
    }
  };
};
