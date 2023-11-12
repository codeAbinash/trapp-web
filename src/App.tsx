import './css/index.css'
import './css/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PopupAlert from './components/PopupAlert'
import { PopupAlertContextProvider } from './context/PopupAlertContext'
import MyAccount from './screens/Account/MyAccount'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'
import AboutUs from './screens/More/AboutUs'
import ContactUs from './screens/More/ContactUs'
import PrivacyPolicy from './screens/More/PrivacyPolicy'
import TermsAndConditions from './screens/More/TermsAndConditions'
import Profile from './screens/Profile'
import Register from './screens/Auth/Register'
import Login from './screens/Auth/Login'
import Creator from './screens/Creator'
import Videos from './screens/Creator/Videos'
import Playlist from './screens/Creator/Playlist'
import Video from './screens/Video'
import OTP from './screens/Auth/OTP'

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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/otp',
    element: <OTP />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
  {
    path: 'contact-us',
    element: <ContactUs />,
  },
  {
    path: 'my-account',
    element: <MyAccount />,
  },
  {
    path: 'creator/:creator',
    element: <Creator />,
    children: [
      {
        path: 'videos',
        element: <Videos />,
      },
      {
        path: 'playlist',
        element: <Playlist />,
      },
    ],
  },
  {
    path: 'video/:video',
    element: <Video />,
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
