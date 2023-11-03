import Login from './screens/Login'
import './css/index.css'
import './css/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './screens/Register'
import OTP from './screens/OTP'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },
      {
        path: '/shop',
        element: <div> Shop </div>,
      },
      {
        path: '/profile',
        element: <div> Profile </div>,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
])

export default function App() {
  return (
    <div className='bg-bg text-white'>
      <RouterProvider router={router} />
    </div>
  )
}
