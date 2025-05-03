import { Pagination, Stack } from "@mui/material";
import { SetStateAction } from "react";
import MovieCard from "../MovieCard/MovieCard";

interface MoviesListItems {
  nameRu: string;
  kinopoiskId: number;
  posterUrlPreview: string;
  [key: string]: string | number;
}

interface MoviesListProps {
  movies: MoviesListItems[];
  totalPages: number;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

export default function MoviesList({
  movies,
  totalPages,
  page,
  setPage,
}: MoviesListProps) {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        columnGap="15px"
        rowGap="15px"
        alignItems="center"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
      <Stack alignItems="center" mt={2}>
        <Pagination
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </>
  );
}
