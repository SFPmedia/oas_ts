import * as Effects from "redux-saga/effects";
import { userSearchFilter } from "../../../frontendComponents/AllActivities";
import {
  fetchActivities,
  cookieConsentStatus,
  accuracySuccessResult,
  forceUpdateActivities,
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
} from "../../reducer";
const put: any = Effects.put;
const call: any = Effects.call;

export function* handleGetActivityListData(): any {
  try {
    let response = yield call(fetchActivities);
    let attemptNumber: number = 0;

    while (!response && attemptNumber <= 5) {
      attemptNumber++;
      response = yield call(fetchActivities);
    }

    if (response) {
      yield put(setActivitiesData(response));
      yield put(setActivitiesDataNU(response));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetPositionAccuracy(): any {
  try {
    yield put(setPositionAccuracy(accuracySuccessResult));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCookieConsentStatus(): any {
  yield put(setCookieConsentStatus(yield call(cookieConsentStatus)));
}

export function* handleForceUpdateActivitiesData(): any {
  let response = yield call(forceUpdateActivities);
  let attemptNumber: number = 0;

  while (!response && attemptNumber <= 5) {
    attemptNumber++;
    response = yield call(fetchActivities);
  }

  if (response) {
    yield put(setActivitiesData(response));
    yield put(setActivitiesDataNU(response));
  }
}

export function* handleSearchVisibilityStatus(): any {
  yield put(setSearchVisibilityStatus(yield call(searchSelectVisible)));
}

export function* handleUserSearch(): any {
  yield searchSelect(userSearchFilter);
  yield put(setUserSearch(text));
}

export function* handleSearchInput(): any {
  yield put(setSearchInput(userSearchType));
}

export function* handleFilterActivityList(): any {
  yield put(setActivitiesData(filteredActivityList));
}

export function* handleFilterActivityListNU(): any {
  yield put(setActivitiesDataNU(filteredActivityListNU));
}
