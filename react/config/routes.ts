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
    name: 'Coding',
    icon: 'apartment',
  
    routes: [
      {
        path: '/coding/question/:id',
        component: './Coding/Question',
      },
      {
        path: '/coding/datastructure',
        name: 'Data Structures',
        component: './Coding/DataStructure',
      },
      {
        path: '/coding/datastructure/:id',
        component: './Coding/DataStructure',
      },
      {
        path: '/coding/algorithm',
        name: 'Algorithm',
        component: './Coding/Algorithm',
      },
      {
        path: '/coding/questions',
        name: 'All',
        component: './Coding/All',
      },
      {
        path: '/coding/favourite',
        name: 'Favorite',
        component: './Coding/Favourite',
      }
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
