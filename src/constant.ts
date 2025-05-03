import {
  AutoAwesome,
  FamilyRestroom,
  Fort,
  LiveTv,
  LocalMovies,
  Pool,
  Reorder,
  StarPurple500,
  VolunteerActivism,
} from "@mui/icons-material";

export const iconComponents = {
  AutoAwesome,
  FamilyRestroom,
  Fort,
  LiveTv,
  LocalMovies,
  Pool,
  Reorder,
  StarPurple500,
  VolunteerActivism,
};

interface top_lsitMobile {
  title: string;
  icon: string;
  url: string;
  value: string;
}

export const TOP_LIST_MOBILE: top_lsitMobile[] = [
  // {
  //   title: "Каталог",
  //   icon: "AutoAwesome",
  //   url: "/catalog",
  //   value: "",
  // },
  {
    title: "ТОП 100 популярных фильмов",
    icon: "AutoAwesome",
    url: "/collection/popular",
    value: "TOP_POPULAR_MOVIES",
  },
  {
    title: "ТОП 250 лучших фильмов",
    icon: "StarPurple500",
    url: "/collection/best",
    value: "TOP_250_MOVIES",
  },
  {
    title: "Семейные",
    icon: "FamilyRestroom",
    url: "/collection/family",
    value: "FAMILY",
  },
  {
    title: "Романтика",
    icon: "VolunteerActivism",
    url: "/collection/romantic",
    value: "LOVE_THEME",
  },
  {
    title: "Популярные сериалы",
    icon: "LiveT",
    url: "/collection/popular-serials",
    value: "POPULAR_SERIES",
  },
];

export const MOVIE_LISTS = [
  {
    title: "Каталог",
    icon: "LocalMovies",
    url: "/catalog",
    value: "ALL",
  },
  {
    title: "Фильмы",
    icon: "LocalMovies",
    url: "/films",
    value: "FILM",
  },
  {
    title: "Сериалы",
    icon: "Reorder",
    url: "/serials",
    value: "TV_SERIES",
  },
  {
    title: "Мультфильмы",
    icon: "Fort",
    url: "/cartoons",
    value: "FILM",
  },
];
