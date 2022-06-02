import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar'

const Input = styled('input')({
    display: 'none',
});

const UploadAvatar = ({ name = '', url = '', onSelectFile }) => {

    const [state, setState] = useState({
        name: '',
        url: ''
    })

    useEffect(() => {
        setState(prev => {
            return {
                ...prev,
                name: name || '',
                url: url || ''
            }
        })
    }, [name, url])

    const handleChange = (event) => {
        if (!!onSelectFile) {
            onSelectFile(event, state.name)
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor={`contained-button-file${state.name}`} style={{ cursor: 'pointer' }}>
                <Input
                    id={`contained-button-file${state.name}`}
                    name={state.name}
                    accept="image/*"
                    type="file"
                    onChange={handleChange}
                />
                <Avatar
                    sx={{ mx: 1 }}
                    alt={'anh-thu-nho'}
                    src={state.url}
                />
            </label>
        </Stack>
    );
}


export default UploadAvatar
