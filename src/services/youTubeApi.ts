import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const youtubeApiKey = import.meta.env.VITE_YOUTUBE_KEY;

const excludeGenres = [
  "",
  "новости",
  "для взрослых",
  "церемония",
  "реальное ТВ",
  "ток-шоу",
];

// Определение интерфейса для параметров запроса к API Kinopoisk
interface KinopoiskApiQuery {
  type: string | undefined;
  page: number;
}

// Определение интерфейса для структуры ответа API

interface MoviesListItems {
  nameRu: string;
  kinopoiskId: number;
  posterUrlPreview: string;
  [key: string]: string | number;
}

interface KinopoiskApiResponse {
  items: MoviesListItems[];
  totalPages: number;
}

// Определение интерфейса для структуры ответа API Сиквелы Приквелы

interface SequelsAndPrequels {
  filmId: number;
  nameRu?: string;
  nameEn?: string;
  nameOrigina?: string;
  posterUrl?: string;
  posterUrlPreview?: string;
  elationType?: string;
}

// Define a service using a base URL and expected endpoints
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const {
//   useGetFilmsTopQuery,
//   useGetFilmsQuery,
//   useGetGenresAndCountriesQuery,
//   useGetFilmQuery,
//   useGetSequelsAndPrequelsQuery,
//   useGetStaffQuery,
// } = kinopoiskApi;
