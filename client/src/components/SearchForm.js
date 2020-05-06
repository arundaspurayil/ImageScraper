import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Typography,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
    padding: "50px 25px"
  },
  form: {
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent: "center",
    padding: "10 15 25 15"
  },
  textfield:{
    paddingBottom:"25px"
  },
  button: {
    width: "200px",
  }
});

export default function SearchForm(props) {
  const classes = useStyles();
  const {input, setInputUrl, handleSubmit} = props

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

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField className={classes.textfield}
          required
          label="Enter URL"
          variant="outlined"
          value={input}
          onChange={e=>setInputUrl(e.target.value)}
          fullWidth={true}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Scrape
        </Button>
      </form>
    </div>
  );
}
