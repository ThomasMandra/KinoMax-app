import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/hooksStore";
import { resetQuery, selectQuery } from "../../../features/currentQuerySlice";

interface CountriesObj {
  id: number;
  country: string;
}

interface GenresObj {
  id: number;
  genre: string;
}

interface SelectMoviesProps {
  countriesList: CountriesObj[];
  genresList: GenresObj[];
  countries: string;
  order: string;
  year: string;
  genreId: string;
}

export default function SelectMovies(props: SelectMoviesProps) {
  const { countriesList, genresList, countries, order, year, genreId } = props;

  const dispatch = useAppDispatch();

  const orderList = [
    {
      title: "По рейтингу",
      value: "RATING",
    },
    {
      title: "По оценкам",
      value: "NUM_VOTE",
    },
    {
      title: "По году",
      value: "YEAR",
    },
  ];

  const yearsList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  return (
    <Stack
      mt={2}
      mb={2}
      sx={{ flexDirection: { sm: "column", md: "row" }, gap: 1 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={order}
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
        >
          {orderList.map((order) => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select
          value={countries}
          onChange={(e) => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {countriesList.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          value={genreId}
          onChange={(e) => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {genresList.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select
          value={year}
          onChange={(e) => dispatch(selectQuery({ year: e.target.value }))}
        >
          {yearsList.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button variant="outlined" onClick={() => dispatch(resetQuery())}>
          сбросить
        </Button>
      </Box>
    </Stack>
  );
}
