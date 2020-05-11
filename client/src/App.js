import React, { useState } from 'react'
import { Grid } from '@material-ui/core'

import Header from './components/Header.js'
import SearchForm from './components/SearchForm.js'
import Images from './components/Images.js'
import validUrl from 'valid-url'

import './App.css'
export default function App() {
    const [url, setUrl] = useState(null)
    const [download, setDownload] = useState(false)
    const [downloadText, setDownloadText] = useState('Download as ZIP')
    const [urlError, setUrlError] = useState('')

    function handleSubmit(event, url) {
        event.preventDefault()
        if (validUrl.isWebUri(url)) {
            setUrl(url)
            setDownload(false)
            setDownloadText('Download as ZIP')
            setUrlError('')
        } else {
            setUrlError('Enter a valid URL.')
        }
    }
    async function handleDownload(event) {
        event.preventDefault()
        setDownloadText('Downloading...')
        const encodedURI = encodeURIComponent(url)
        const response = await fetch('/api/download/' + encodedURI)

        response.blob().then((blob) => {
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            document.body.appendChild(a)

            a.download = 'ScrapedImages.zip'
            a.click()
            a.parentNode.removeChild(a)
            setDownloadText('Download as ZIP')
        })
    }

    const imagesComponent = url ? (
        <Images url={url} setDownload={setDownload} />
    ) : null

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
                                handleSubmit={handleSubmit}
                                handleDownload={handleDownload}
                                download={download}
                                downloadText={downloadText}
                                error={urlError}
                            />
                        </Grid>
                        {imagesComponent}
                    </Grid>
                    <Grid item xs={2} md={2} />
                </Grid>
            </Grid>
        </div>
    )
}
