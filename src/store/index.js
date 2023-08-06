import {combineReducers, configureStore} from '@reduxjs/toolkit'
import registrationReducer from './registration/registrationSlice'
import tripsReducer from './trips/tripsSlice'
import {setupListeners} from "@reduxjs/toolkit/query";
import {weatherApi} from "./queries/weatherApi";


export const USER_LOGOUT = '@@logout/USER_LOGOUT'


const combinedReducer = combineReducers({
  registration: registrationReducer,
  trips: tripsReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});


const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return combinedReducer(state, action);
};


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(weatherApi.middleware)
})


setupListeners(store.dispatch)
