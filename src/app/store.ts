import { configureStore } from "@reduxjs/toolkit";
import currentQueryReducer from "../features/currentQuerySlice";
import { kinopoiskApi } from "../services/kinopoiskApi";
import { searchQuerySlice } from "../features/searchQuerySlice";
import { youTubeApi } from "../services/youTubeApi";

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    [youTubeApi.reducerPath]: youTubeApi.reducer,
    currentQuery: currentQueryReducer,
    searchQuerySlice: searchQuerySlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(kinopoiskApi.middleware)
      .concat(youTubeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
