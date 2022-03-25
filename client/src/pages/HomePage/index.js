import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material'

import Module from '../../components/Home/Module'
import List from '../../components/Home/List'
import Setting from '../../components/Home/Setting'
import favourite from '../../constants/favourite.json'
import HomeComponent from '../../components/Home'
import StickyFooter from '../../components/StickyFooter';

import { sortBy, useToggle, useInput, useTitle } from '../../utils'

const moduleLayout = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 3
}

const listLayout = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 6,
    xl: 6
}
const HomePage = () => {

    const [sortValue, setLSortValue] = useState('')
    const { toggle, setToggle } = useToggle(true)
    const [searchValue, setSearchValue] = useInput()
    useTitle('Documentaries | Valley');

    const props = {
        toggle,
        setToggle,
        searchValue,
        setSearchValue,
        setLSortValue
    }

    const layout = toggle ? listLayout : moduleLayout
    const documentaries = sortBy(favourite.filter(({ docTitle }) => docTitle.toLowerCase().includes(searchValue.toLowerCase())), (a, b) => b[sortValue] - a[sortValue])

    return (
        <>
            {/* // <Box
                //     sx={{
                //         display: 'flex',
                //         flexDirection: 'column',
                //         minHeight: '100vh',
                //     }}
                // > */}
            {/* <>
                <Setting {...props} />
                <Grid container spacing={4}>
                    {documentaries.map((documentary, key) => (
                        <Grid item key={key} {...layout}>
                            {toggle ? <List {...documentary} /> : <Module {...documentary} />}
                        </Grid>
                    ))}
                </Grid>
            </> */}
            <HomeComponent />
            {/* <StickyFooter /> */}
            {/* </Box> */}
        </>
    );
}

export default HomePage;
