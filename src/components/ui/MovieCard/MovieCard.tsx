import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./MovieCard.module.scss";
import RatingFilms from "../RatingFilms/RatingFilms";

interface MoviesListItems {
  nameRu: string;
  kinopoiskId: number;
  posterUrlPreview: string;
  [key: string]: string | number;
}

interface MovieCardProps {
  movie: MoviesListItems;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Stack>
      <Link className={styles.imgLink} to={`/movie/${movie.kinopoiskId}`}>
        <Stack position="relative">
          <img
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
            className={styles.img}
          ></img>

          {movie.ratingKinopoisk && (
            <Stack
              alignItems="center"
              position="absolute"
              top="5px"
              right="5px"
            >
              <RatingFilms ratingKinopoisk={+movie.ratingKinopoisk} />
            </Stack>
          )}
        </Stack>
        <Typography
          mt={1}
          textAlign="center"
          color="white"
          sx={{ width: "200px" }}
        >
          {movie.nameRu ? movie.nameRu : movie.nameEn}
        </Typography>
      </Link>
    </Stack>
  );
}
