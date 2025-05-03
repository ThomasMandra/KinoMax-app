import { useEffect, useState } from "react";
import { useGetFilmsTopQuery } from "../../../services/kinopoiskApi";
import { TOP_LIST_MOBILE } from "../../../constant";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList/MoviesList";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import MoviesListTopSkeleton from "./MoviesListTopSkeleton";

export default function MoviesListTop() {
  const location = useLocation();
  const [page, setPage] = useState<number>(1);

  const movieType = TOP_LIST_MOBILE.find((el) => el.url === location.pathname);

  const navigate = useNavigate();

  const getApi = {
    type: movieType?.value,
    page: page,
  };

  const { data, error, isLoading } = useGetFilmsTopQuery(getApi);

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (error) return <ErrorMessage />;

  if (isLoading) return <MoviesListTopSkeleton />;

  if (typeof data !== "undefined") {
    return (
      <>
        <Stack flexDirection="row" sx={{ mt: 3, mb: 3 }}>
          <Button onClick={() => navigate(-1)}>Назад</Button>
          <Typography variant="h4" ml={3}>
            {movieType?.title}
          </Typography>
        </Stack>
        <MoviesList
          movies={data.items}
          totalPages={data.totalPages}
          page={page}
          setPage={setPage}
        />
      </>
    );
  }
}
