import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
    padding: "50px 25px"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    padding: "25px"
  },
  button: {
    width: "200px;"
  }
});

export default function SearchForm() {
  const classes = useStyles();
  //      <InputLabel>Enter URL</InputLabel>

  //      <Input fullWidth={true} />

  return (
    <div>
      <Typography
        className={classes.header}
        color="primary"
        variant="h1"
        align="center"
      >
        Image Scraper
      </Typography>
      <TextField
        required
        label="Enter URL"
        variant="outlined"
        fullWidth={true}
      />
      <form className={classes.form}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
        >
          Scrape
        </Button>
      </form>
    </div>
  );
}
