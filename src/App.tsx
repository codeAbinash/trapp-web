import './css/tailwind.css'
import './css/index.scss'

import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PopupAlert from './components/PopupAlert'
import { PopupAlertContextProvider } from './context/PopupAlertContext'
import store from './Redux/store'
import MyAccount from './screens/Account/MyAccount'
import Login from './screens/Auth/Login'
import OTP from './screens/Auth/OTP'
import Register from './screens/Auth/Register'
import Creator from './screens/Creator'
import Playlist from './screens/Creator/Playlist'
import Videos from './screens/Creator/Videos'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'
import AboutUs from './screens/More/AboutUs'
import ContactUs from './screens/More/ContactUs'
import PrivacyPolicy from './screens/More/PrivacyPolicy'
import TermsAndConditions from './screens/More/TermsAndConditions'
import Profile from './screens/Profile/Profile'
import Video from './screens/Video'

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
      <Provider store={store}>
        <div className='bg-bg text-white'>
          <PopupAlert />
          <RouterProvider router={router} />
        </div>
      </Provider>
    </PopupAlertContextProvider>
  )
}
