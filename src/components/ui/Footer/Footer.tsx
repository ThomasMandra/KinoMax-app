import { Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: "row" },
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} &laquo;KinoMAX&raquo; <br />
        Сайт создан исключительно в обучающих целях. <br />
        Все права принадлежат правообладателям.
      </Typography>
      <Typography variant="h4" color="primary.main">
        KinoMAX
      </Typography>
    </Stack>
  );
}
