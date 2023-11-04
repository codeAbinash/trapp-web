import './css/index.css'
import './css/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'
import Register from './screens/Register'
import Profile from './screens/Profile'
import { PopupAlertContextProvider } from './context/PopupAlertContext'
import PopupAlert from './components/PopupAlert'

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
    <PopupAlertContextProvider>
      <div className='bg-bg text-white'>
        <PopupAlert />
        <RouterProvider router={router} />
      </div>
    </PopupAlertContextProvider>
  )
}
