import React, { useRef, useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const ChipInput = ({ label, placeholder, onChangeValue }) => {
	const timeoutChange = useRef(null)

	const [values, setValues] = useState([]);

	useEffect(() => {
		if (timeoutChange.current) {
			clearTimeout(timeoutChange.current)
		}
		timeoutChange.current = setTimeout(() => {
			onChangeValue(values)
		}, 300);
	}, [values, onChangeValue])

	return (
		<Autocomplete
			id="tags-filled"
			multiple
			fullWidth
			freeSolo
			sx={{ pr: 2 }}
			options={[]}
			defaultValue={[]}
			onChange={(e, value) => setValues((state) => value)}
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
					label={label}
					placeholder={placeholder}
				/>
			)}
		/>
	);
}

export default ChipInput