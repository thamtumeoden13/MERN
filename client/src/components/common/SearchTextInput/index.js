import React, { useState, useEffect } from 'react'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

const SearchTextInput = ({ searchQuery, onSearch }) => {

    const [search, setSearch] = useState('')

    useEffect(() => {
        setSearch(searchQuery || '')
    }, [searchQuery])

    const handleChangeValue = (event) => {
        // console.log('[handleChangeValue]', event.target.value)
        setSearch(event.target.value)
    }

    const handleSearch = () => {
        if (!!search && onSearch) {
            onSearch(search)
        }
    }

    return (
        <FormControl sx={{ m: 1, }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{`Tìm kiếm`}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                value={search}
                onChange={handleChangeValue}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleSearch}
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        // Prevent's default 'Enter' behavior.
                        event.defaultMuiPrevented = true;
                        // your handler code
                        handleSearch(event)
                    }
                }}
                label="Tìm kiếm..."
                placeholder='nhập tên dự án...'
            />
        </FormControl>
    )
}

export default SearchTextInput