import React from "react";
import ImageCard from "./ImageCard.js";
import { Grid } from "@material-ui/core";
export default function Images() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>
    </Grid>
  );
}
