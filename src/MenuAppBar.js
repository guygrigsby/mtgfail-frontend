import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import Icon from "@material-ui/core/Icon";

import PaymentIcon from "@material-ui/icons/Payment";
import CloudIcon from "@material-ui/icons/Cloud";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import BookIcon from "@material-ui/icons/Book";
import BugReportIcon from "@material-ui/icons/BugReport";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const socialItems = [
    {
      Label: "Twitter",
      Icon: <TwitterIcon />,
      Link: "https://www.twitter.com/usernamevalid"
    },
    {
      Label: "LinkedIn",
      Icon: <LinkedInIcon />,
      Link: "https://www.linkedin.com/guygrigsby"
    },
    {
      Label: "Github",
      Icon: <GitHubIcon />,
      Link: "https://www.github.com/guygrigsby"
    },
    {
      Label: "Blog",
      Icon: <BookIcon />,
      Link: "https://grigsby.dev"
    }
  ];

  const siteItems = [
    {
      Label: "Donate",
      Icon: <PaymentIcon />,
      Link: "https://www.patreon.com/guygrigsby",
      Divider: true
    },
    {
      Label: "Report Bugs",
      Icon: <BugReportIcon />,
      Link: "https://www.github.com/guygrigsby/mtgfail-frontend/issues",
      Divider: false
    },
    {
      Label: "Request Feature",
      Icon: <AddCircleOutlineIcon />,
      Link: "https://www.github.com/guygrigsby/mtgfail-frontend/issues",
      Divider: false
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-haspopup="true"
            onClick={handleMenu}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Drawer
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={open}
              onClose={handleClose}
            >
              <List>
                <ListSubheader
                  color="primary"
                  component="div"
                  id="sitenav-subheader"
                >
                  Site Navigation
                </ListSubheader>
                {siteItems.map((e, i) => (
                  <>
                    <ListItem
                      key={i}
                      button
                      onClick={() => {
                        window.open(e.Link, "_blank");
                      }}
                    >
                      <ListItemIcon>{e.Icon}</ListItemIcon>
                      <ListItemText primary={e.Label} />
                    </ListItem>

                    {e.Divider && <Divider />}
                  </>
                ))}
                <ListSubheader
                  color="primary"
                  component="div"
                  id="abt-me-subheader"
                >
                  About Me
                </ListSubheader>
                {socialItems.map((e, i) => (
                  <ListItem
                    key={i}
                    button
                    onClick={() => {
                      window.open(e.Link, "_blank");
                    }}
                  >
                    <ListItemIcon>{e.Icon}</ListItemIcon>
                    <ListItemText primary={e.Label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </div>
          <Typography variant="h6" className={classes.title}>
            mtg.fail
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
