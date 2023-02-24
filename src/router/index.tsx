import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from '@/router/interface';
import Layout from '@/components/Layout/index';
import Login from '@/views/login/index';
import Home from '@/views/home/index';
import ProjectList from '@/views/project/list';
import Echarts from '@/components/charts/Echarts';

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login',
    },
  },
  {
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/project',
        children: [
          {
            path: 'list',
            element: <ProjectList />,
          }
        ]
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: 'echarts',
        element: <Echarts />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
