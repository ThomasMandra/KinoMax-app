import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ContextType>({
  mode: "dark",
  toggleColorMode: () => {},
});

export default function ToggleColorMode({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    const modeFromLocalStorage = localStorage.getItem(
      "theme"
    ) as PaletteMode | null;
    if (modeFromLocalStorage) {
      setMode(modeFromLocalStorage);
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
