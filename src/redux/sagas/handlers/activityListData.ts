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
  activitiesData,
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
    let response: string[] = activitiesData;
    let attemptNumber: number = 0;

    while (!activitiesData && attemptNumber <= 5) {
      attemptNumber++;
      response = activitiesData;
    }

    if (response) {
      yield put(setActivitiesData(response));
      yield put(setActivitiesDataNU(response));
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
  let response: string[] = yield call(forceUpdateActivities);
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
