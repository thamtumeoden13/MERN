import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useQuery } from '../../../utils';

const SearchSelect = ({ result = [], count = 0 }) => {

    const navigate = useNavigate()
    const query = useQuery()
    const searchQueryprojectName = query.get('projectname')

    const [selectResult, setSelectResult] = useState([])
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        if (!!searchQueryprojectName) {
            setSelectValue(searchQueryprojectName)
            return
        }
        setSelectValue('')
    }, [searchQueryprojectName])

    useEffect(() => {
        if (!!result) {
            setSelectResult(result || [])
        }
    }, [result])

    const handleChange = (f) => {
        if (f.target.value == 'tat-ca-du-an') {
            navigate(`/han-muc-du-an`)
            return
        }
        navigate(`/han-muc-du-an/tim-kiem?projectname=${f.target.value}`)
    };

    return (
        <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="grouped-select">{`Tất cả dự án`}</InputLabel>
            <Select
                id="grouped-select"
                label="Tìm kiếm dự án"
                autoWidth
                value={selectValue || 'tat-ca-du-an'}
                onChange={handleChange}
                sx={{ fontWeight: '300', fontSize: 14 }}
            >
                <MenuItem key={'tat-ca-du-an'} value={'tat-ca-du-an'} >{`Tất cả dự án (${count})`}</MenuItem>
                {selectResult.map(e => (
                    <MenuItem key={e._id} value={e.name} >{`${e.title} (${e.count})`}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SearchSelect