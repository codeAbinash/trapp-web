import Login from './screens/Login';
import './css/index.css';
import './css/index.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
