import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'


const EmployeeList = Loadable(lazy(() => import('./EmployeePage')))

const employeeRoutes = [
    {
        path: '/employee/default',
        element: <EmployeeList />,
        auth: authRoles.admin,
    },
]

export default employeeRoutes


