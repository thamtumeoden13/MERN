import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ComboBox = ({ name = 'comboBox', placeholder = '', label = 'comboBox',
    options = [], defaultValue,
    disabled = false, readOnly = false,
    onChange, onInputChange
}) => {
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

    // console.log({ value })
    // console.log({ inputValue })

    return (
        <>
            {!readOnly ?
                <Autocomplete
                    fullWidth
                    readOnly={readOnly}
                    disabled={disabled}
                    disablePortal
                    id="combo-box"
                    options={options}

                    isOptionEqualToValue={(option, value) => option.value === value}
                    renderInput={(params) => <TextField {...params} name={name} fullWidth label={label} placeholder={placeholder} />}
                    value={value}
                    sx={{ pr: 2 }}
                    onChange={(event, newValue) => handleChange(event, newValue)}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
                />
                :
                <Autocomplete
                    fullWidth
                    // readOnly={readOnly}
                    // disabled
                    disablePortal
                    id="combo-box-read-only"
                    options={options}
                    value={value}
                    // defaultValue={top100Films[1].label}
                    renderInput={(params) => <TextField {...params} name={name} fullWidth label={label} />}
                    sx={{ pr: 2 }}
                />
            }
        </>
    );
}

export default ComboBox

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', value: 1994 },
    { label: 'The Godfather', value: 1972 },
    { label: 'The Godfather: Part II', value: 1974 },
    { label: 'The Dark Knight', value: 2008 },
    { label: '12 Angry Men', value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: 'Pulp Fiction', value: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        value: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', value: 1966 },
    { label: 'Fight Club', value: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        value: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        value: 1980,
    },
    { label: 'Forrest Gump', value: 1994 },
    { label: 'Inception', value: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        value: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", value: 1975 },
    { label: 'Goodfellas', value: 1990 },
    { label: 'The Matrix', value: 1999 },
    { label: 'Seven Samurai', value: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        value: 1977,
    },
    { label: 'City of God', value: 2002 },
    { label: 'Se7en', value: 1995 },
    { label: 'The Silence of the Lambs', value: 1991 },
    { label: "It's a Wonderful Life", value: 1946 },
    { label: 'Life Is Beautiful', value: 1997 },
    { label: 'The Usual Suspects', value: 1995 },
    { label: 'Léon: The Professional', value: 1994 },
    { label: 'Spirited Away', value: 2001 },
    { label: 'Saving Private Ryan', value: 1998 },
    { label: 'Once Upon a Time in the West', value: 1968 },
    { label: 'American History X', value: 1998 },
    { label: 'Interstellar', value: 2014 },
    { label: 'Casablanca', value: 1942 },
    { label: 'City Lights', value: 1931 },
    { label: 'Psycho', value: 1960 },
    { label: 'The Green Mile', value: 1999 },
    { label: 'The Intouchables', value: 2011 },
    { label: 'Modern Times', value: 1936 },
    { label: 'Raiders of the Lost Ark', value: 1981 },
    { label: 'Rear Window', value: 1954 },
    { label: 'The Pianist', value: 2002 },
    { label: 'The Departed', value: 2006 },
    { label: 'Terminator 2: Judgment Day', value: 1991 },
    { label: 'Back to the Future', value: 1985 },
    { label: 'Whiplash', value: 2014 },
    { label: 'Gladiator', value: 2000 },
    { label: 'Memento', value: 2000 },
    { label: 'The Prestige', value: 2006 },
    { label: 'The Lion King', value: 1994 },
    { label: 'Apocalypse Now', value: 1979 },
    { label: 'Alien', value: 1979 },
    { label: 'Sunset Boulevard', value: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        value: 1964,
    },
];
