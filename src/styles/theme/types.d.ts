import type { CssVarsTheme } from "@mui/material/styles";
import type { Theme as BaseTheme } from "@mui/material/styles/createTheme";

export type Theme = MuiTheme & CssVarsTheme;

export type ColorScheme = "dark" | "light";
