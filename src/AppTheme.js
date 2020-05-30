import { createMuiTheme } from "@material-ui/core/styles";
const primary = {
  extralight: "#f3e5f5",
  light: "#c7a4ff",
  main: "#311b92",
  dark: "#000070",
  contrastText: "#fafafa"
};
const secondary = {
  light: "#8d8d8d",
  main: "#606060",
  dark: "#363636",
  contrastText: "#311b92"
};
const info = {
  main: "#64b5f6"
};
const success = {
  main: "#bf360c"
};
const error = {
  main: "#880e4f"
};
const warning = {
  main: "#880e4f"
};

const palette = {
  primary: primary,
  secondary: secondary,
  error: error,
  warning: warning,
  info: info,
  success: success,
  action: {
    hover: `${primary.extralight}`
    //hover: `linear-gradient(45deg, #${primary.light} 50%, #${secondary.dark} 90%)`,
  }
};
const t = {
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    elevation: 3
  },
  palette: palette,
  deckTable: {
    minWidth: 650,
    color: "black"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto"
        }
      }
    },
    MuiTableHead: {
      root: {
        color: secondary.light,
        height: 25
      }
    },
    MuiTableRow: {
      root: {
        height: 10
      }
    }
  }
};
const AppTheme = createMuiTheme(t);

export default AppTheme;
