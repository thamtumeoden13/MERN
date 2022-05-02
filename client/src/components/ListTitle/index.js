import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import CardItem from './TitleItem'

import useStyles from './styles'

const ListTitle = ({ data = [], onClick }) => {

    const classes = useStyles()

    const handleClickItem = (item) => {
        if (onClick) {
            onClick(item)
        }
    }

    if (!data || data.length <= 0) return null

    return (
        <Box className={classes.container}>
            <List className={classes.listContainer}>
                {data.map((item, i) => (
                    <Fragment key={i.toString()}>
                        <CardItem item={item} onClick={handleClickItem} />
                    </Fragment>
                ))}
            </List>
        </Box>
    );
}

export default ListTitle