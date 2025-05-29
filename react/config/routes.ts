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
    path: '/questions',
    name: 'Questions',
    icon: 'code',
    routes: [
      {
        path: '/questions/all',
        name: 'All Questions',
        component: './Coding/QuestionsAll',
      },
      {
        path: '/questions/question/:id',
        component: './Coding/Question',
      },
      {
        path: '/questions/completed',
        name: 'Completed Questions',
        component: './Coding/QuestionDone',
      },
      {
        path: '/questions/favorite',
        name: 'Favorite Questions',
        component: './Coding/Favorite',
      }
    ]
  },
  { 
    path: "/solutions", 
    name: 'Solutions',
    icon: 'block',
    routes: [
      {
        path: '/solutions/all',
        name: 'All Solutions',
        component: './Coding/SolutionAll',
      },
      {
        path: '/solutions/solution/:id',
        component: './Coding/Solution',
      },
      {
        path: '/solutions/completed',
        name: 'Completed',
        component: './Coding/SolutionsDone',
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
];

// {
//   component: './404',
// },
// {
//   path: '/welcome',
//   name: 'welcome',
//   icon: 'smile',
//   component: './Welcome',
// },
// {
//   path: '/admin',
//   name: 'admin',
//   icon: 'crown',
//   access: 'canAdmin',
//   component: './Admin',
//   routes: [
//     {
//       path: '/admin/sub-page',
//       name: 'sub-page',
//       icon: 'smile',
//       component: './Welcome',
//     },
//     {
//       component: './404',
//     },
//   ],
// },