import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface CounterState {
  countries: string;
  genreId: string;
  order: string;
  type: string;
  year: string;
  page: number;
}

const initialState: CounterState = {
  countries: "",
  genreId: "",
  order: "NUM_VOTE",
  type: "",
  year: "",
  page: 1,
};

export const currentQuerySlice = createSlice({
  name: "currentQuerySlice",
  initialState,
  reducers: {
    selectQuery: (state, actions) => ({
      ...state,
      ...actions.payload,
    }),
    resetQuery: () => ({
      ...initialState,
    }),
  },
});

export const { selectQuery, resetQuery } = currentQuerySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.page

export default currentQuerySlice.reducer;
