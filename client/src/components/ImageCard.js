import React from 'react'
import { Grid } from '@material-ui/core'

export default function ImageCard(props) {
    const { imgSrc } = props

    const cardStyle = {
        height: 'auto',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
        transition: '0.3s',
    }
    const imgStyle = {
        height: 'auto',
        width: '100%',
        boxSizing: 'border-box',
        padding: '5px',
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div className="card" style={cardStyle}>
                <img src={imgSrc} alt={''} style={imgStyle} />
            </div>
        </Grid>
    )
}
