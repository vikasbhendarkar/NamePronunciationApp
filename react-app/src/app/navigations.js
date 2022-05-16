export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        name: 'Employees',
        path: '/employee/default',
        icon: 'nature_people'
    },
    {
        name: 'Profile',
        icon: 'face',
        children: [
            {
                name: 'Change password',
                path: '/profile/chngpass',
                icon: 'people'
            },
            {
                name: 'Sign out',
                path: '/profile/signout',
                icon: 'exit_to_app'
            }
        ]
    }
]
