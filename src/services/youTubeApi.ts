import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const youTubeApi = createApi({
  reducerPath: "youTubeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube-search-results.p.rapidapi.com/youtube-search",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-host", "youtube-search-results.p.rapidapi.com");
      headers.set(
        "x-rapidapi-key",
        "b7d60ad4d7msh0b9d56d6a08cd48p1f4897jsn7726286fdea3"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrailer: builder.query({
      query: (nameFilms) => `/?q=trailer%2B${nameFilms}`,
    }),
  }),
});

export const { useGetTrailerQuery } = youTubeApi;
