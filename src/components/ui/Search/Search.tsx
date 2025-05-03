import {
  Autocomplete,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetFilmsQuery } from "../../../services/kinopoiskApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksStore";
import { setSearchQuery } from "../../../features/searchQuerySlice";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { countries, genreId, order, type, year, page, keyword } =
    useAppSelector((state) => state.searchQuerySlice);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);

    return () => clearTimeout(setTimeoutId);
  }, [input]);

  const { data, isFetching } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword,
  });

  return (
    <Autocomplete
      sx={{
        width: isMobile ? 250 : 300,
        backgroundColor: "rgba(255,255,255, 0.15)",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
      freeSolo
      getOptionLabel={(option: any) => `${option.nameRu} - ${option.year}`}
      options={data ? data.items : []}
      onInputChange={(_, value) => {
        setInput(value);
      }}
      onChange={(_, value) => {
        navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск"
          slotProps={{
            input: {
              ...params.InputProps,

              endAdornment: (
                <React.Fragment>
                  {isFetching ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
