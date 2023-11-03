import './css/index.css'
import './css/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'
import Register from './screens/Register'

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
