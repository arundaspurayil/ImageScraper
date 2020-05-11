import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1,
    },
    iconStyles: {
        padding: '5px',
    },
}))
function Header() {
    const classes = useStyles()
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    Arundas Purayil
                </Typography>
                <a
                    style={{ color: 'inherit' }}
                    href="https://www.linkedin.com/in/arundas-purayil/"
                >
                    <LinkedInIcon className={classes.iconStyles} />
                </a>
                <a
                    style={{ color: 'inherit' }}
                    href="https://github.com/arundaspurayil"
                >
                    <GitHubIcon className={classes.iconStyles} />
                </a>
            </Toolbar>
        </AppBar>
    )
}

export default Header
