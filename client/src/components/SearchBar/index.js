import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.75),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginLeft: 0,
    // marginRight: '10px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchAppBar = ({ onSearch }) => {

    const [search, setSearch] = useState('')

    const handleChange = (event) => {
        // console.log('[handleChange]', event.target.value)
        setSearch(event.target.value)
    }

    const handleSearch = () => {
        if (!!search && onSearch) {
            onSearch(search)
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <InputAdornment position='start'>
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleSearch}
                        edge="end"
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            </SearchIconWrapper>
            <StyledInputBase
                id="outlined-adornment-password"
                type={'text'}
                value={search}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                onKeyDown={(event) => {
                    // console.log('[onKeyDown]', event.key)
                    if (event.key === 'Enter') {
                        // Prevent's default 'Enter' behavior.
                        event.defaultMuiPrevented = true;
                        // your handler code
                        handleSearch(event)
                    }
                }}
            />
        </Search>
    );
}

export default SearchAppBar