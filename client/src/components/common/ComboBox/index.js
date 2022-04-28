import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ComboBox = (props) => {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [state, setState] = useState({
        name: 'name',
        placeholder: 'placeholder',
        label: 'label',
        options: [],
        disabled: false,
        readOnly: false,
        required: false
    })

    useEffect(() => {
        setState(prev => { return { ...prev, name: props.name || '' } })
    }, [props.name])

    useEffect(() => {
        setState(prev => { return { ...prev, placeholder: props.placeholder || '' } })
    }, [props.placeholder])

    useEffect(() => {
        setState(prev => { return { ...prev, label: props.label || '' } })
    }, [props.label])

    useEffect(() => {
        setState(prev => { return { ...prev, disabled: props.disabled || false } })
    }, [props.disabled])

    useEffect(() => {
        setState(prev => { return { ...prev, readOnly: props.readOnly || false } })
    }, [props.readOnly])

    useEffect(() => {
        setState(prev => { return { ...prev, required: props.required || false } })
    }, [props.required])

    useEffect(() => {
        if (!!props.defaultValue && Object.keys(props.defaultValue).length > 0) {
            setValue(props.defaultValue)
        } else {
            setValue(null)
        }
    }, [props.defaultValue])

    useEffect(() => {
        setInputValue(props.defaultInputValue || '')
    }, [props.defaultInputValue])

    useEffect(() => {
        setState(prev => { return { ...prev, options: props.options || [] } })
    }, [props.options])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (props.onChange) {
            props.onChange(state.name, newValue)
        }
    }

    const handleInputChange = (event, newinputValue) => {
        setInputValue(newinputValue);
        if (props.onInputChange) {
            props.onInputChange(state.name, newinputValue)
        }
    }

    return (
        <Autocomplete
            id="combo-box"
            sx={{ pr: 2 }}
            fullWidth
            disablePortal
            readOnly={state.readOnly}
            disabled={state.disabled}
            options={state.options}
            value={value}
            onChange={(event, newValue) => handleChange(event, newValue)}
            renderInput={(params) => <TextField {...params} label={state.label} required={state.required} />}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
        />
    )
}

export default memo(ComboBox)