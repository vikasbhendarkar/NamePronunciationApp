import React, { Fragment } from 'react'
import RowCards from './shared/RowCards'
import StatCards from './shared/StatCards'
import Campaigns from './shared/Campaigns'
import { Grid, Card } from '@mui/material'
import StatCards2 from './shared/StatCards2'
import DoughnutChart from './shared/Doughnut'
import UpgradeCard from './shared/UpgradeCard'
import { styled, useTheme } from '@mui/system'
import TopSellingTable from './shared/TopSellingTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAnalytics } from '../../redux/actions/EmployeeActions'


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}))

const Analytics = () => {
    const { palette } = useTheme()
    const dispatch = useDispatch()

        return (
            <Fragment>
                <ContentBox className="analytics">
                    <Grid container spacing={3}>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <StatCards />
                            {/* <StatCards2 /> */}
                        </Grid>
    
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card sx={{ px: 3, py: 2, mb: 3 }}>
                                <Title>Overview&emsp;</Title>        
                                    <DoughnutChart
                                        height="300px"
                                        color={[
                                            palette.primary.dark,
                                            palette.primary.main,
                                            palette.primary.light,
                                        ]}
                                    />
                            </Card>
                            <UpgradeCard />
                        </Grid>
                    </Grid>
                </ContentBox>
            </Fragment>
        )
    
    
}

export default Analytics
