import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
} from "../services/kinopoiskApi";
import { TOP_LIST_MOBILE } from "../constant";
import { useAppSelector } from "./hooksStore";

export default function useMoviesQuery() {
  const { countries, order, year, page } = useAppSelector(
    (state) => state.currentQuery
  );

  const getApi = {
    type: TOP_LIST_MOBILE[0].value,
    page: page,
  };

  const responsePopular = useGetFilmsTopQuery(getApi);

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LIST_MOBILE[1].value,
    page: page,
  });

  const responseFilms = useGetFilmsQuery({
    type: "FILM",
    countries,
    genreId: "1",
    order,
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    type: "TV_SERIES",
    countries,
    genreId: "1",
    order,
    year,
    page,
  });

  const responseCartoons = useGetFilmsQuery({
    type: "FILM",
    countries,
    genreId: "18",
    order,
    year,
    page,
  });

  const isLoading =
    responsePopular.isLoading ||
    responseBest.isLoading ||
    responseFilms.isLoading ||
    responseSerials.isLoading ||
    responseCartoons.isLoading;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilms.error ||
    responseSerials.error ||
    responseCartoons.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  };
}
