import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ComboBox = ({ name = 'comboBox', placeholder = '', label = 'comboBox', options = [], onChange, onInputChange }) => {
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!!options) {
            setValue(options[10])
        }
    }, [options])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange(name, newValue)
        }
    }

    const handleInputChange = (event, newinputValue) => {
        setInputValue(newinputValue);
        if (onInputChange) {
            onInputChange(name, newinputValue)
        }
    }

    console.log({ value })
    console.log({ inputValue })

    return (
        <Autocomplete
            fullWidth
            disablePortal
            id="combo-box"
            options={options}
            renderInput={(params) => <TextField {...params} name={name} fullWidth label={label} placeholder={placeholder} />}
            value={value}
            sx={{ pr: 2 }}
            onChange={(event, newValue) => handleChange(event, newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
        />
    );
}

export default ComboBox
