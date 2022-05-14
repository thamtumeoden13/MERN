import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        // prefix="$"
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const NumberTextField = ({
    name = '', label = '', defaultValue = -1,
    placeholder = '', variant = 'outlined',
    fullWidth = false, required = false, error = false,
    helperText = '',
    onChangeValue
}) => {
    const timeoutChange = useRef(null)

    const [value, setValue] = useState(defaultValue);
    const [state, setState] = useState({
        name: '',
        label: '',
        placeholder: '',
        required: false,
    })
    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    useEffect(() => {
        if (timeoutChange.current) {
            clearTimeout(timeoutChange.current)
        }
        timeoutChange.current = setTimeout(() => {
            if (onChangeValue) {
                onChangeValue(name, value)
            }
        }, 500);
    }, [value])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <TextField
            id="formatted-numberformat-input"
            name={name}
            label={label}
            placeholder={placeholder}
            value={value}
            required={required}
            fullWidth={fullWidth}
            variant={variant}
            error={!!required && !!error}
            helperText={!!required && !!helperText ? helperText : ''}
            onChange={handleChange}
            InputProps={{
                inputComponent: NumberFormatCustom,
            }}
        />
    );
}

export default NumberTextField