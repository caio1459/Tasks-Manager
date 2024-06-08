// src/routes/index.js ou Rotas.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Users } from '../pages/users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/users',
    element: <Users />,
  },
]);

export const Rotas = () => {
  return <RouterProvider router={router} />;
};
