import { useEffect, useState } from "react";
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from "../../../services/kinopoiskApi";
import { MOVIE_LISTS, TOP_LIST_MOBILE } from "../../../constant";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList/MoviesList";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { useAppSelector } from "../../../hooks/hooksStore";
import SelectMovies from "../../ui/SelectMovies/SelectMovies";
import MoviesListMainSkeleton from "./MoviesListMainSkeleton";

export default function MoviesListMain() {
  const location = useLocation();
  const { countries, order, year, genreId } = useAppSelector(
    (state) => state.currentQuery
  );
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find((el) => el.url === location.pathname);
  const myGenreId = movieType?.url === "/cartoons" ? 18 : genreId;

  const getApi = {
    type: movieType?.value,
    page: page,
    countries,
    order,
    year,
    genreId: myGenreId,
  };

  const responseFilms = useGetFilmsQuery(getApi);

  const responseGenresAndCountries = useGetGenresAndCountriesQuery("");

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error || responseGenresAndCountries.error)
    return <ErrorMessage />;

  if (responseFilms.isLoading || responseGenresAndCountries.isLoading)
    return <MoviesListMainSkeleton />;

  if (typeof responseFilms.data !== "undefined") {
    return (
      <>
        <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
          <Button onClick={() => navigate(-1)}>Назад</Button>
          <Typography variant="h4" ml={3}>
            {movieType?.title}
          </Typography>
        </Stack>
        <SelectMovies
          countriesList={responseGenresAndCountries.data.countries}
          genresList={responseGenresAndCountries.data.genres}
          countries={countries}
          order={order}
          year={year}
          genreId={genreId}
        />
        <MoviesList
          movies={responseFilms.data.items}
          totalPages={responseFilms.data.totalPages}
          page={page}
          setPage={setPage}
        />
      </>
    );
  }
}
