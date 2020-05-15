import React, { useState, useEffect } from 'react'
import ImageCard from './ImageCard.js'
import { Grid } from '@material-ui/core'
import Loading from './Loading.js'
export default function Images(props) {
    const { url, setDownload } = props

    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const [jobId, setJobId] = useState(null)

    useEffect(() => {
        async function fetchMyAPI() {
            //base-64 encode url ATOB
            setIsLoading(true)
            const encodedURI = encodeURIComponent(url)
            const res = await fetch('/api/scrape/' + encodedURI)
            const data = await res.json()
            if (data.images) {
                setImages(data.images)
                setIsLoading(false)
                setDownload(true)
            } else {
                const jobId = data.id
                setJobId(jobId)
            }
        }
        fetchMyAPI()
    }, [url])

    useEffect(() => {
        if (jobId) {
            const interval = setInterval(async () => {
                let res = await fetch('/job/' + jobId)
                if (res.status !== 404) {
                    let data = await res.json()
                    console.log(data)
                    if (data.state === 'completed') {
                        clearInterval(interval)
                        setImages(data.images)
                        setIsLoading(false)
                        setDownload(true)
                        setJobId(null)
                    }
                }
            }, 3000)
        }
    }, [jobId, setDownload])

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
