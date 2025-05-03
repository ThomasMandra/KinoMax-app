import { Stack, Tooltip, Typography } from "@mui/material";

interface ratingFilmsProps {
  ratingKinopoisk: number;
}

export default function RatingFilms({ ratingKinopoisk }: ratingFilmsProps) {
  if (ratingKinopoisk === null) return <div></div>;

  return (
    <Tooltip title={`${ratingKinopoisk} / 10`}>
      <Stack
        sx={{
          background: "linear-gradient(315deg, #20bf55 0%, #01baef 74%)",
          color: "dark",
          borderRadius: "3px",
        }}
      >
        <Typography paddingInline={1} variant="subtitle1" color="rgb(0, 0, 0)">
          {+ratingKinopoisk % 1 !== 0
            ? +ratingKinopoisk
            : +ratingKinopoisk + ".0"}
        </Typography>
      </Stack>
    </Tooltip>
  );
}
