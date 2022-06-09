import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import activitiesReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  activitiesReducer: activitiesReducer,
});

const middleware = [sagaMiddleware];

const store = createStore(combinedReducer, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
