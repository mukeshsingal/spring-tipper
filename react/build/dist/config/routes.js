export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user',
                routes: [
                    {
                        name: 'login',
                        path: '/user/login',
                        component: './user/Login',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        path: '/coding',
        name: 'Problems',
        icon: 'apartment',
        routes: [
            {
                path: '/coding/question/:id',
                component: './Coding/Question',
            },
            {
                path: '/coding/questions',
                name: 'All',
                component: './Coding/All',
            },
            {
                path: '/coding/donequestions',
                name: 'Completed',
                component: './Coding/DoneQuestion',
            },
            {
                path: '/coding/favourite',
                name: 'Favorite',
                component: './Coding/Favourite',
            }
        ]
    },
    {
        path: "/solutions",
        name: 'Solutions',
        icon: 'apartment',
        routes: [
            {
                path: '/solutions/solution/:id',
                component: './Coding/Solution',
            },
            {
                path: '/solutions/all',
                name: 'All Solutions',
                component: './Coding/SolutionAll',
            },
            {
                path: '/solutions/completed',
                name: 'Completed',
                component: './Coding/DoneSolutions',
            }
        ]
    },
    {
        path: '/jobs/',
        name: 'Jobs',
        icon: 'apartment',
        routes: [
            {
                path: '/jobs/dashboard',
                name: 'Dashboard',
                component: './Jobs/JobDashboard',
            },
            {
                path: '/jobs/unsaved',
                name: 'New',
                component: './Jobs/NewJobs',
            },
            {
                path: '/jobs/saved',
                name: 'Saved',
                component: './Jobs/SavedJobs',
            },
        ]
    },
    {
        path: '/coding/ds/:id',
        component: './Coding/Question',
    },
    {
        name: 'List',
        icon: 'table',
        path: '/list',
        component: './TableList',
    },
    {
        path: '/',
        redirect: '/Coding/questions',
    },
    {
        component: './404',
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
    },
    {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        component: './Admin',
        routes: [
            {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
            },
            {
                component: './404',
            },
        ],
    },
];
//# sourceMappingURL=routes.js.map