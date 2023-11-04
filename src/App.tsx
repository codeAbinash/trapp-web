import './css/index.css'
import './css/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'
import Register from './screens/Register'
import Profile from './screens/Profile'

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
        element: <Profile />,
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
