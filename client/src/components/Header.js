import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  },
  iconStyles: {
    padding: "5px"
  }
}));
function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          Arundas Purayil
        </Typography>
        <LinkedInIcon className={classes.iconStyles} />
        <GitHubIcon className={classes.iconStyles} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
