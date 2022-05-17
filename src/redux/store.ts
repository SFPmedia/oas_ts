import { createStore, applyMiddleware, combineReducers } from "redux";
import activitiesReducer from "./reducer";
import thunk from "redux-thunk";

const combinedReducer = combineReducers({
  activitiesReducer: activitiesReducer,
});

const store = createStore(combinedReducer, applyMiddleware(thunk));

export default store;
