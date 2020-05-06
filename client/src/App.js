import React, {useState} from "react";
import { Grid } from "@material-ui/core";

import Header from "./components/Header.js";
import SearchForm from "./components/SearchForm.js";
import Images from "./components/Images.js";
export default function App() {

  const [inputUrl, setInputUrl] = useState("")
  const [renderImages, setRenderImages] = useState(false)
  function handleSubmit(event){
    event.preventDefault()
    if(renderImages){
      setRenderImages(false)
    }
    setRenderImages(true)
  }

  const imagesComponent = renderImages ? <Images url={inputUrl} /> : null

  return (
    <div className="App">
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={2} md={2} />
          <Grid item xs={8} md={8}>
            <Grid item>
              <SearchForm 
                input={inputUrl} 
                setInputUrl={setInputUrl} 
                handleSubmit={handleSubmit}
              />
            </Grid>
            {imagesComponent}
          </Grid>
          <Grid item xs={2} md={2} />
        </Grid>
      </Grid>
    </div>
  );
}
