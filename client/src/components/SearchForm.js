import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

import { Button, Typography, TextField } from '@material-ui/core'

const useStyles = makeStyles({
    header: {
        textAlign: 'center',
        padding: '50px 25px',
    },
    textfield: {
        paddingBottom: '25px',
    },
    button: {
        width: '200px',
        textAlign: 'center',
        margin: '5px 20px 15px 20px',
    },
    divider: {
        width: '5%',
        height: 'auto',
        display: 'inline-block',
    },
})

export default function SearchForm(props) {
    const classes = useStyles()
    const [input, setInput] = useState('')
    const {
        handleSubmit,
        handleDownload,
        download,
        downloadText,
        error,
    } = props

    const downloadButton = download ? (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleDownload}
        >
            {downloadText}
        </Button>
    ) : null
    //

    return (
        <div className="searchForm">
            <Typography
                className={classes.header}
                color="primary"
                variant="h2"
                align="center"
            >
                Image Scraper
            </Typography>
            {error.length > 0 ? (
                <Alert severity="warning">{error}</Alert>
            ) : null}
            <TextField
                className={classes.textfield}
                required
                label="Enter URL to scrape images from"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth={true}
            />
            <div style={{ textAlign: 'center', paddingBottom: '50px' }}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    name="scrape"
                    size="large"
                    onClick={(e) => handleSubmit(e, input)}
                >
                    Scrape
                </Button>
                {downloadButton}
            </div>
        </div>
    )
}
