import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";

const AppTheme = createMuiTheme({
  palette: {
    //type: "dark"
    //primary: blue,
    //secondary: green
  },
  status: {
		    danger: "orange"
  }
});

export default AppTheme;
