import { createMuiTheme } from "@material-ui/core/styles";

const AppTheme = createMuiTheme({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center"
  },
  palette: {
    type: "dark"
    //primary: blue,
    //secondary: blue
  },
  status: {
		    danger: "orange"
  table: {
    minWidth: 650
  }
});

export default AppTheme;
