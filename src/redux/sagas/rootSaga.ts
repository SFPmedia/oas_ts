import { ForkEffect, takeLatest } from "redux-saga/effects";
import {
  handleGetActivityListData,
  handleGetPositionAccuracy,
  handleCookieConsentStatus,
  handleForceUpdateActivitiesData,
  handleSearchVisibilityStatus,
  handleUserSearch,
  handleSearchInput,
  handleFilterActivityList,
  handleFilterActivityListNU,
} from "./handlers/activityListData";
import {
  GET_ACTIVITIESDATA,
  GET_POSITIONACCURACY,
  GET_COOKIECONSENTSTATUS,
  GET_FORCEUPDATEACTIVITIESDATA,
  GET_SEARCHVISIBILITYSTATUS,
  GET_USERSEARCH,
  GET_SEARCHINPUT,
  GET_FILTERACTIVITYLIST,
  GET_FILTERACTIVITYLISTNU,
} from "../actionTypes";

export function* watcherSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(GET_ACTIVITIESDATA, handleGetActivityListData);
  yield takeLatest(GET_POSITIONACCURACY, handleGetPositionAccuracy);
  yield takeLatest(GET_COOKIECONSENTSTATUS, handleCookieConsentStatus);
  yield takeLatest(
    GET_FORCEUPDATEACTIVITIESDATA,
    handleForceUpdateActivitiesData
  );
  yield takeLatest(GET_SEARCHVISIBILITYSTATUS, handleSearchVisibilityStatus);
  yield takeLatest(GET_USERSEARCH, handleUserSearch);
  yield takeLatest(GET_SEARCHINPUT, handleSearchInput);
  yield takeLatest(GET_FILTERACTIVITYLIST, handleFilterActivityList);
  yield takeLatest(GET_FILTERACTIVITYLISTNU, handleFilterActivityListNU);
}
