import Login from '@/page/user/Login';

export const routes = [
  {
    path: '/',
    component: Login,
    auth: false,
  },
  {
    path: '/login',
    component: Login,
    auth: false,
  },
];
