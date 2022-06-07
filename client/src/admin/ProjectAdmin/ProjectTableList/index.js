import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit'

import { visuallyHidden } from '@mui/utils';
import { removeAccents } from '../../../utils';

function createData(portfolioName, title, description, tags, thumbnail) {
    return {
        portfolioName,
        title,
        description,
        tags,
        thumbnail,
    };
}

const rows = [
    createData('Cupcake', '305', '3.7', '67', '4.3'),
    createData('Donut', '452', '25.0', '51', '4.9'),
    createData('Eclair', '262', '16.0', '24', '6.0'),
    createData('Frozen yoghurt', '159', '6.0', '24', '4.0'),
    createData('Gingerbread', '356', '16.0', '49', '3.9'),
    createData('Honeycomb', '408', '3.2', '87', '6.5'),
    createData('Ice cream sandwich', '237', '9.0', '37', '4.3'),
    createData('Jelly Bean', '375', '0.0', '94', '0.0'),
    createData('KitKat', '518', '26.0', '65', '7.0'),
    createData('Lollipop', '392', '0.2', '98', '0.0'),
    createData('Marshmallow', '318', '0', '81', '2.0'),
    createData('Nougat', '360', '19.0', '9', '37.0'),
    createData('Oreo', '437', '18.0', '63', '4.0'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'portfolioName',
        numeric: false,
        disablePadding: false,
        label: 'Hạn mục dự án',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Tiêu đề',
    },
    {
        id: 'thumbnail',
        numeric: false,
        disablePadding: false,
        label: 'Ảnh đại diện',
    },
    {
        id: 'tags',
        numeric: false,
        disablePadding: false,
        label: 'tags',
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: false,
        label: 'Chỉnh sửa',
    },
    {
        id: 'viewDetail',
        numeric: false,
        disablePadding: false,
        label: 'Chi tiết',
    },
];

const EnhancedTableHead = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <Typography variant='span'
                                sx={{ maxWidth: 240, minWidth: 120 }}
                            >
                                {headCell.label}
                            </Typography>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead >
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    const handleRemove = () => {
        if (props.onRemove) {
            props.onRemove(numSelected)
        }
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {`Dự Án`}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton sx={{ color: red[500] }} onClick={handleRemove}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = ({ data, onViewDetail, onEdit, onRemove }) => {
    const timeoutSearch = useRef(null)

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('portfolioName');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const [resultFilter, setResultFilter] = useState([])

    useEffect(() => {
        setResult(data || [])
        setResultFilter(data || [])
    }, [data])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = resultFilter.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    const handleViewDetail = (event, row) => {
        // console.log('handleViewDetail', row)
        if (onViewDetail) {
            onViewDetail(row)
        }

    }

    const handleEdit = (event, row) => {
        // console.log('handleEdit', row)
        if (onEdit) {
            onEdit(row._id)
        }
    }

    const handleRemove = (isSelected) => {
        // console.log('[handleRemove]', isSelected, selected)
        if (onRemove) {
            onRemove(selected)
            setSelected([])
        }
    }

    const searchFilter = (text) => {
        if (timeoutSearch.current) {
            clearTimeout(timeoutSearch.current)
        }
        timeoutSearch.current = setTimeout(() => {
            if (text) {
                const newData = result.filter((item) => {
                    const textData = removeAccents(text.toUpperCase())
                    const itemData = removeAccents(`${item.portfolioName.toUpperCase()},${item.title.toUpperCase()}}`)
                    return itemData.indexOf(textData) > -1
                })

                setResultFilter(newData)
            } else {
                setResultFilter(result)
            }
        }, 300);
        setSearch(text)
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TextField
                    variant='outlined'
                    placeholder='search...'
                    type='search'
                    fullWidth
                    value={search}
                    onInput={(e) => searchFilter(e.target.value)}
                />
                <EnhancedTableToolbar numSelected={selected.length} onRemove={handleRemove} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={resultFilter.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(resultFilter, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                onClick={(event) => handleClick(event, row._id)}
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.portfolioName}
                                            </TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="center">
                                                <Avatar
                                                    sx={{ bgcolor: red[500] }}
                                                    alt={'thumbnail'}
                                                    src={row.thumbnail}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{`[${row.tags.toString()}]`}</TableCell>
                                            <TableCell align="left">
                                                <Button onClick={(event) => handleEdit(event, row)}>
                                                    <EditIcon fontSize='small' />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button onClick={(event) => handleViewDetail(event, row)} >
                                                    <VisibilityIcon fontSize='small' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={resultFilter.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default EnhancedTable