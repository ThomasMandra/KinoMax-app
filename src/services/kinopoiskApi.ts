import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

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
export const kinopoiskApi = createApi({
  reducerPath: "kinopoiskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kinopoiskapiunofficial.tech/api",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", kinopoiskApiKey);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilmsTop: builder.query<KinopoiskApiResponse, KinopoiskApiQuery>({
      query: (params) =>
        `/v2.2/films/collections?type=${params.type}&page=${params.page}`,
    }),

    getFilms: builder.query({
      query: ({
        countries,
        genreId,
        order = "NUM_VOTE",
        type = "FILM",
        year,
        page,
        keyword = "",
      }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}&keyword=${keyword}`,
    }),
    getGenresAndCountries: builder.query({
      query: () => `/v2.2/films/filters`,
      transformResponse: (response) => ({
        ...response,
        genres: response.genres.filter(
          (item: { genre: string }) => !excludeGenres.includes(item.genre)
        ),
      }),
    }),
    getFilm: builder.query({
      query: (id) => `/v2.2/films/${id}`,
    }),
    getSequelsAndPrequels: builder.query({
      query: (id) => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: (response) =>
        response.map((el: SequelsAndPrequels) => ({
          ...el,
          kinopoiskId: el.filmId,
        })),
    }),

    getStaff: builder.query({
      query: (id) => `/v1/staff?filmId=${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} = kinopoiskApi;
