import React, { useEffect } from 'react'
import { Paragraph } from '../../../components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
    TablePagination,
    Grid
} from '@mui/material'
import { getEmployeeList } from '../../../redux/actions/EmployeeActions'
import PronounciationTool from './PronouncationTool'

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const SearchBar = () => {
    return (
        <Grid container spacing={2}>
            <Grid item>
                Search bar
            </Grid>
        </Grid>
    )
}


const DataTable = () => {
    const { palette } = useTheme()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [filterValue, setFilterValue] = React.useState('all')
    const dispatch = useDispatch()
    const employeeList = useSelector((state) => state.employee)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }
    
    const handleFilter = (event) => {
        setFilterValue(event.target.value)
        dispatch(getEmployeeList(page, 5, rowsPerPage, event.target.value))
    }

    useEffect(() => {
        dispatch(getEmployeeList(page, 5, rowsPerPage, filterValue))
    },[])


    if(employeeList!==undefined) {

        return (
            <>
                <SearchBar />
                <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                <CardHeader>
                    <Title>Employee List</Title>
                    <Select size="small" value={filterValue} onChange={handleFilter} style={{width: 120}}>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                    </Select>
                </CardHeader>
                <Box overflow="auto">
                    <ProductTable>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ px: 3 }} colSpan={2}>
                                    Employee ID
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    UID
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={2}>
                                    First Name
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={2}>
                                    Last Name
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={3}>
                                    Preferred Name
                                </TableCell>
                                <TableCell sx={{ px: 1 }} colSpan={2}>
                                    Pronounciation
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeList.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            ).map((employee, index) => (
                                <TableRow key={index} hover>
                                    <TableCell
                                        align="left"
                                        colSpan={2}
                                        px={{ px: 3, textTransform: 'capitalize' }}
                                    >
                                        {employee.eid}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        colSpan={1}
                                        sx={{ px: 0, textTransform: 'capitalize' }}
                                    >
                                        {employee.uid}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        colSpan={2}
                                        sx={{ px: 0, textTransform: 'capitalize' }}
                                    >
                                        {employee.fname}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        colSpan={2}
                                        sx={{ px: 0, textTransform: 'capitalize' }}
                                    >
                                        {employee.lname}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        colSpan={3}
                                        sx={{ px: 0, textTransform: 'capitalize' }}
                                    >
                                        {employee.preferred_name}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        colSpan={2}
                                        sx={{ px: 1}}
                                    >
                                        <PronounciationTool eid={employee.eid} data={employee}/>
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </ProductTable>
                </Box>
                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[10,25,50]}
                    component="div"
                    count={employeeList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            </>
        )
    }
    else {
        return <></>
    }
}

export default DataTable
