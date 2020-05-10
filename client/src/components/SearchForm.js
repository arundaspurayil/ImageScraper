import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
    const { handleSubmit, handleDownload, download, downloadText } = props
    console.log('rendering')

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
                className={classes.textfield}
                required
                label="Enter URL"
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
                {download ? <div className={classes.divider} /> : null}
                {downloadButton}
            </div>
        </div>
    )
}
