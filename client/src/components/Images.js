import React, { useState, useEffect } from 'react'
import ImageCard from './ImageCard.js'
import { Grid } from '@material-ui/core'
import Loading from './Loading.js'
export default function Images(props) {
    const { url } = props

    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        async function fetchMyAPI() {
            //base-64 encode url ATOB
            setIsLoading(true)
            const encodedURI = encodeURIComponent(url)
            const res = await fetch('/api/scrape/' + encodedURI)
            const images = await res.json()
            setImages(images.images)
            setIsLoading(false)
        }
        fetchMyAPI()
    }, [url])

    const imageCards = images.map((image, index) => {
        return <ImageCard key={index} imgSrc={image} />
    })

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <Grid container spacing={4}>
                    {imageCards}
                </Grid>
            )}
        </div>
    )
}
