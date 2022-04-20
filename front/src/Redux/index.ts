import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { CityApi } from "./Services/City/CityApi";

/**
 * Register and combine stores and middlewares
 */
export const store = configureStore({
  reducer: {
    [CityApi.reducerPath]: CityApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CityApi.middleware),
});

/**
 * Setup redux toolkit listeners to dispatch actions on events
 */
setupListeners(store.dispatch);