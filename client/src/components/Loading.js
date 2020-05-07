import React from 'react'
import ReactLoading from 'react-loading'

export default function Loading() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '7%',
            }}
        >
            <ReactLoading type={'spin'} color={'grey'} width={'10%'} />
        </div>
    )
}
