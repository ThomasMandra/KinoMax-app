import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  countries: string;
  genreId: string;
  order: string;
  type: string;
  year: string;
  page: number;
  keyword: string;
}

const initialState: CounterState = {
  countries: "",
  genreId: "",
  order: "NUM_VOTE",
  type: "",
  year: "",
  page: 1,
  keyword: "",
};

export const searchQuerySlice = createSlice({
  name: "searchQuerySlice",
  initialState,
  reducers: {
    setSearchQuery: (state, actions) => ({
      ...state,
      ...actions.payload,
    }),
  },
});

export const { setSearchQuery } = searchQuerySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.page

export default searchQuerySlice.reducer;
