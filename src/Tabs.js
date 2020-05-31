import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundcolor: theme.palette.background.paper,
    minHeight: "200px"
  }
}));

export default function SimpleTabs({ tabs, ...others }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Box backgroundcolor="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {tabs.map((tab, idx) => {
            return <Tab key={idx} label={tab.Name} />;
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, idx) => {
        return (
          <TabPanel key={idx} value={value} index={idx}>
            {tab.Content}
          </TabPanel>
        );
      })}
    </Paper>
  );
}
