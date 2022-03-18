import React from "react";
import { Typography } from '@mui/material'

import useStyle from './styles'

function Header() {

    const classes = useStyle()

    return (
        <Typography variant="h4" align="center" className={classes.container}>
            Blog
        </Typography>
    )
}

export default Header