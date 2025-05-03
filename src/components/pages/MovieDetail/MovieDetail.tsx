import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskApi";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import MovieCard from "../../ui/MovieCard/MovieCard";
import VideoPlayer from "../../ui/VideoPlayer/VideoPlayer";
import RatingFilms from "../../ui/RatingFilms/RatingFilms";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequel = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  interface responseStaffItem {
    staffId: number;
    nameRu: string;
    nameEn: string;
    description: string;
    posterUrl: string;
    professionText: string;
    professionKey: string;
  }

  interface responseSequelsAndPrequelItem {
    filmId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    posterUrl: string;
    posterUrlPreview: string;
    relationType: string;
  }

  // Переименование ключа filmId в интерфейсе на kinopoiskId
  type newResponseSequelsAndPrequelItem = {
    [K in keyof responseSequelsAndPrequelItem as K extends "filmId"
      ? "kinopoiskId"
      : K]: responseSequelsAndPrequelItem[K];
  };

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequel.isLoading ||
    responseStaff.isLoading
  )
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );

  if (responseFilm.error || responseStaff.error) return <ErrorMessage />;

  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ md: 4, sm: 12 }}>
          <Stack position="relative">
            <img
              src={responseFilm.data.posterUrl}
              alt={responseFilm.data.nameRu}
              width="100%"
            />
            <Stack
              alignItems="center"
              position="absolute"
              top="5px"
              right="5px"
            >
              <RatingFilms
                ratingKinopoisk={responseFilm.data.ratingKinopoisk}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Grid container mb={3}>
            <Grid size={{ xs: 2 }} justifyItems="center">
              <Button onClick={() => navigate(-1)}>Назад</Button>
            </Grid>
            <Grid size={{ xs: 4 }} alignContent="center" justifyItems="center">
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid size={{ xs: 2 }}>
              <Typography>Год:</Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              <Typography gutterBottom color="rgb(136, 136, 136)">
                {responseFilm.data.year}
              </Typography>
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Typography>Страна:</Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              {responseFilm.data.countries.map(
                ({ country }: { country: string }) => (
                  <Typography
                    color="rgb(136, 136, 136)"
                    key={country}
                    gutterBottom
                  >
                    {country}
                  </Typography>
                )
              )}
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Typography>Жанры:</Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              {responseFilm.data.genres.map(({ genre }: { genre: string }) => (
                <Typography color="rgb(136, 136, 136)" key={genre} gutterBottom>
                  {genre}
                </Typography>
              ))}
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Typography>Режиссеры:</Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              {responseStaff.data
                .filter(
                  (el: responseStaffItem) => el.professionText === "Режиссеры"
                )
                .slice(0, 3)
                .map(({ nameRu }: { nameRu: string }) => (
                  <Typography
                    color="rgb(136, 136, 136)"
                    key={nameRu}
                    gutterBottom
                  >
                    {nameRu}
                  </Typography>
                ))}
            </Grid>

            <Grid size={{ xs: 2 }}>
              <Typography>Время:</Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              <Typography color="rgb(136, 136, 136)" gutterBottom>
                {responseFilm.data.filmLength} мин
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom>Описание:</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom color="rgb(136, 136, 136)">
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : "Описание отсутствует"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ md: 2, sm: 12 }}>
          <Typography variant="h6">В главных ролях:</Typography>
          {responseStaff.data
            .filter((el: responseStaffItem) => el.professionText === "Актеры")
            .slice(0, 7)
            .map(({ nameRu }: { nameRu: string }) => (
              <Typography key={nameRu} gutterBottom color="rgb(136, 136, 136)">
                {nameRu}
              </Typography>
            ))}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid size={{ xs: 2 }} alignItems="center">
          <ButtonGroup variant="outlined" size="small">
            <Button target="_blank" href={responseFilm.data.webUrl}>
              Кинопоиск
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }} mt={5}>
        <Typography variant="h5" textAlign="center">
          Смотреть трейлер онлайн
        </Typography>
        <VideoPlayer nameRu={responseFilm.data.nameRu} />
      </Grid>

      {typeof responseSequelsAndPrequel.data !== "undefined" ? (
        <Stack alignItems="center">
          <Typography variant="h5" gutterBottom>
            Сиквелы и приквелы
          </Typography>
          <Stack
            flexWrap="wrap"
            justifyContent="center"
            direction="row"
            sx={{ gap: 2 }}
          >
            {responseSequelsAndPrequel.data.map(
              (el: newResponseSequelsAndPrequelItem) => (
                <MovieCard key={el.kinopoiskId} movie={el} />
              )
            )}
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
