import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import { CookiesProvider } from "react-cookie";
import theme from "./AppTheme.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
