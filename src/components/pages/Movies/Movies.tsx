import useMoviesQuery from "../../../hooks/useMoviesQuery";

import styles from "./Movies.module.scss";

import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack } from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import MoviesSkeleton from "./MoviesSkeleton";

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  interface MoviesListItems {
    nameRu: string;
    kinopoiskId: number;
    posterUrlPreview: string;
    [key: string]: string | number;
  }

  // TODO add skeleton
  if (isLoading) return <MoviesSkeleton />;

  // TODO add error component
  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (data: MoviesListItems[] | undefined) => {
    if (typeof data !== "undefined") {
      return data.map((row) => (
        <Stack className={styles.img}>
          <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
            <BearSlideImage imageUrl={row.posterUrlPreview} />
          </RouterLink>
        </Stack>
      ));
    }

    return [];
  };

  const carouselArr = [
    {
      title: "Популярные фильмы",
      url: "/collection/popular",
      data: serializeDataForCarousel(responsePopular.data?.items),
    },
    {
      title: "Лучшие фильмы",
      url: "/collection/best",
      data: serializeDataForCarousel(responseBest.data?.items),
    },
    {
      title: "Фильмы",
      url: "/films",
      data: serializeDataForCarousel(responseFilms.data?.items),
    },
    {
      title: "Сериалы",
      url: "/serials",
      data: serializeDataForCarousel(responseSerials.data?.items),
    },
    {
      title: "Мультфильмы",
      url: "/cartoons",
      data: serializeDataForCarousel(responseCartoons.data?.items),
    },
  ];

  return (
    <>
      {carouselArr.map((carousel) => (
        <Stack key={carousel.title}>
          <Link
            sx={{ mt: 2, mb: 2 }}
            variant="h4"
            component={RouterLink}
            to={carousel.url}
          >
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={1}
            isEnableNavButton
            isEnableMouseMove
            isEnableLoop
            isEnableAutoPlay
            autoPlayTime={5000}
            spaceBetween={7}
            breakpoints={{
              320: {
                isEnableAutoPlay: false,
              },
              768: {
                isEnableMouseMove: false,
                slidesPerView: 5,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
}

// .bear-react-carousel__root[data-mouse-move] .bear-react-carousel__container {
//   cursor: pointer;
// }
