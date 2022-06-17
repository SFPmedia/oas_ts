import * as Effects from "redux-saga/effects";
import { userSearchFilter } from "../../../frontendComponents/AllActivities";
import {
  cookieConsentStatus,
  accuracySuccessResult,
  searchSelectVisible,
  text,
  userSearchType,
  searchSelect,
  filteredActivityList,
  filteredActivityListNU,
} from "../../actions";
import {
  setActivitiesData,
  setActivitiesDataNU,
  setPositionAccuracy,
  setCookieConsentStatus,
  setSearchVisibilityStatus,
  setUserSearch,
  setSearchInput,
} from "../../actionTypes";
const put: any = Effects.put;
const call: any = Effects.call;

export function* handleGetActivityListData(): Generator<any, void, string[]> {
  try {
    const response: any = yield call(
      fetch,
      "https://sfpmedia.dk/db_api_oas/readActivities.php"
    );
    const activities: string[] = yield response.json();
    const getLocalStorageActivities: string[] = JSON.parse(
      localStorage.getItem("activities")!
    );
    let localStorageExpirationTimeToNumber: number = JSON.parse(
      localStorage.getItem("lsExpirationTime")!
    );

    if (
      localStorage.getItem("activities") &&
      new Date().getTime() <= localStorageExpirationTimeToNumber
    ) {
      console.log("LocalStorage activities have been found. Using those.");
      yield put(setActivitiesData(getLocalStorageActivities));
      yield put(setActivitiesDataNU(getLocalStorageActivities));
    } else {
      localStorage.setItem("activities", JSON.stringify(activities));
      localStorage.setItem(
        "lsExpirationTime",
        JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 18)
      );
      console.log(
        "LocalStorage activities were not found. Getting and using new ones."
      );
      yield put(setActivitiesData(activities));
      yield put(setActivitiesDataNU(activities));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetPositionAccuracy(): Generator<any, void, unknown> {
  try {
    yield put(setPositionAccuracy(accuracySuccessResult));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCookieConsentStatus(): Generator<
  any,
  void,
  string | null
> {
  yield put(setCookieConsentStatus(yield call(cookieConsentStatus)));
}

export function* handleForceUpdateActivitiesData(): Generator<
  any,
  void,
  string[]
> {
  const response: any = yield call(
    fetch,
    "https://sfpmedia.dk/db_api_oas/readActivities.php"
  );
  const activities: string[] = yield response.json();
  alert(
    "Forced update successful. The list has the newest data straight from the database."
  );

  localStorage.setItem("activities", JSON.stringify(activities));
  localStorage.setItem(
    "lsExpirationTime",
    JSON.stringify(new Date().getTime() + 1000 * 60 * 60 * 18)
  );

  yield put(setActivitiesData(activities));
  yield put(setActivitiesDataNU(activities));
}

export function* handleSearchVisibilityStatus(): Generator<any, void, Boolean> {
  yield put(setSearchVisibilityStatus(yield call(searchSelectVisible)));
}

export function* handleUserSearch(): Generator<any, void, unknown> {
  yield searchSelect(userSearchFilter);
  yield put(setUserSearch(text));
}

export function* handleSearchInput(): Generator<any, void, unknown> {
  yield put(setSearchInput(userSearchType));
}

export function* handleFilterActivityList(): Generator<any, void, unknown> {
  yield put(setActivitiesData(filteredActivityList));
}

export function* handleFilterActivityListNU(): Generator<any, void, unknown> {
  yield put(setActivitiesDataNU(filteredActivityListNU));
}
