import React, { Fragment } from 'react'
import DataTable from './shared/DataTable'
import SearchBar from './shared/SearchBar'
import { styled, useTheme } from '@mui/system'
import {Grid} from '@mui/material'
import PaginationTable from '../material-kit/tables/PaginationTable'


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const EmployeePage = () => {

    const {palette} = useTheme()
    return (
        <Fragment>
            <ContentBox className="search">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <DataTable />
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    )
}

export default EmployeePage;