import Login from './screens/Login'
import './css/index.css'
import './css/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './screens/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

export default function App() {
  return (
    <div className='bg-black text-white'>
      <RouterProvider router={router} />
    </div>
  )
}
