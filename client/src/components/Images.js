import React, {useState, useEffect} from "react";
import ImageCard from "./ImageCard.js";
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from "@material-ui/core";
export default function Images(props) {
  const {url} = props

  const [images, setImages] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      const encodedURI = encodeURIComponent(url)
      console.log(encodedURI)
      const res = await fetch('/api/'+ encodedURI)
      const images = await res.json()
      setImages(images.images)
    }
    fetchMyAPI();

  }, [])

  /*
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ImageCard />
      </Grid>

  */

  const imageCards = images.map((image, index) => {
    return (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <CardMedia
          component="img"
          image={image}
          title={image}
        />
      </Grid>
    )

  })

  return (
    <Grid container spacing={4}>
      {imageCards}
    </Grid>
  );
}
