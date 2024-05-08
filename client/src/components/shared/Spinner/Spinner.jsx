import { CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = ({ color, size }) => {
    return (
        <CircularProgress
            size={size || 20}
            sx={{
                color: color || 'var(--color-main)'
            }}
        />
    )
}

export default Spinner