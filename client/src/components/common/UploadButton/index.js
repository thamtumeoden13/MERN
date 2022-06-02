import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none',
});

export default function UploadButton({ onSelectFile }) {

    const handleChange = (event) => {
        console.log('[handleChange]', event)
        console.log('[e.target.files]', event.target.files)
        if (!!onSelectFile) {
            onSelectFile(event)
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">
                <Input
                    accept="image/*" id="contained-button-file"
                    name="file" type="file"
                    multiple
                    onChange={handleChange}
                />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
        </Stack>
    );
}
