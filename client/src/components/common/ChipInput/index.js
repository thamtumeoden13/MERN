import React, { useRef, useEffect, useState, memo } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const ChipInput = (props) => {
	const timeoutChange = useRef(null)

	const [values, setValues] = useState([]);
	const [state, setState] = useState({
		label: '',
		placeholder: '',
	})

	useEffect(() => {
		setValues(props.defaultValue || [])
	}, [props.defaultValue])

	useEffect(() => {
		setState(prev => { return { ...prev, placeholder: props.placeholder || '' } })
	}, [props.placeholder])

	useEffect(() => {
		setState(prev => { return { ...prev, label: props.label || '' } })
	}, [props.label])

	useEffect(() => {
		if (timeoutChange.current) {
			clearTimeout(timeoutChange.current)
		}
		timeoutChange.current = setTimeout(() => {
			props.onChangeValue(values)
		}, 500);
	}, [values])

	const handleChangeValue = (value) => {
		setValues(value)
	}

	return (
		<Autocomplete
			id="tags-filled"
			multiple
			fullWidth
			freeSolo
			sx={{ pr: 2 }}
			options={[]}
			value={values}
			onChange={(e, value) => handleChangeValue(value)}
			renderTags={(value, getTagProps) =>
				value.map((option, index) => {
					return (
						<Chip
							key={index}
							size="small"
							// variant="outlined"
							label={option}
							{...getTagProps({ index })}
						/>
					);
				})
			}
			renderInput={(params) => (
				<TextField
					{...params}
					// variant="filled"
					label={state.label}
					placeholder={state.placeholder}
				/>
			)}
		/>
	);
}

export default memo(ChipInput)