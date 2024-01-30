import { lazyWithPreload } from 'react-lazy-with-preload'
import './css/index.scss'
import './css/tailwind.css'

import { CheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import store from './Redux/store'
import { NormalButton } from './components/Button'
import { LoadingButton } from './components/Loading'
import PopupAlert from './components/PopupAlert'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from './components/ui/drawer'
import { PopupAlertContextProvider } from './context/PopupAlertContext'
import { callSubscription_f } from './lib/api'
import icon from './lib/icons'
import Account from './screens/Account/Account'
import Login from './screens/Auth/Login'
import OTP from './screens/Auth/OTP'
import Register from './screens/Auth/Register'
import Category from './screens/Category/Category'
import Creator from './screens/Creator'
import Home from './screens/Home'
import HomeScreen from './screens/Home/HomeScreen'
import AboutUs from './screens/More/AboutUs'
import ContactUs from './screens/More/ContactUs'
import PrivacyPolicy from './screens/More/PrivacyPolicy'
import TermsAndConditions from './screens/More/TermsAndConditions'
import Profile from './screens/Profile/Profile'
import { UserProfile } from './screens/Profile/utils'
import Test from './screens/Test'
import Video from './screens/Video'
import Wallet from './screens/Wallet/Wallet'

const LiveVideo = lazyWithPreload(() => import('./screens/Live/LiveVideo'))

LiveVideo.preload()

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
    path: 'account',
    element: <Account />,
  },
  {
    path: 'wallet',
    element: <Wallet />,
  },
  {
    path: 'creator/:creator',
    element: <Creator />,
  },
  {
    path: 'liveVideo/:video_id',
    element: <LiveVideo />,
  },
  {
    path: 'video/:video_id',
    element: <Video />,
  },
  {
    path: 'category/:cat_id',
    element: <Category />,
  },
  {
    path: 'test',
    element: <Test />,
  },
])

export default function App() {
  return (
    <PopupAlertContextProvider>
      <Provider store={store}>
        <div className='dark bg-bg text-white'>
          <PopupAlert />
          <RouterProvider router={router} />
          <SubScriptionDrawerContainer />
        </div>
      </Provider>
    </PopupAlertContextProvider>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function SubScriptionDrawerContainer() {
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const [isOpened, setIsOpened] = useState(profile?.subscription_status === 'expired')

  return <SubscriptionDrawer isOpened={isOpened} setIsOpened={setIsOpened} />
}

export function SubscriptionDrawer({ isOpened, setIsOpened }: { isOpened: boolean; setIsOpened: any }) {
  const [isLoading, setIsLoading] = useState(false)

  async function subscriptionAPI() {
    setIsLoading(true)
    const res = await callSubscription_f()
    if (!res.status) return
    window.open(res.data.payment_link, '_blank')
    setIsLoading(false)
    setIsOpened(false)
  }

  return (
    <Drawer open={isOpened} onClose={() => setIsOpened(false)}>
      <DrawerContent className='bg-black text-white outline-none'>
        <div className='mx-auto w-full max-w-sm'>
          <div className='mt-3 flex flex-col gap-7 p-3'>
            <div className='flex w-full items-center justify-between   px-5'>
              <div className='flex items-center gap-5'>
                <img src={icon('vip.svg')} className='h-10 w-10' />
                <span className='text-xl font-semibold'>Trapp Premium</span>
              </div>
              <span className='text-2xl font-medium'>$9/m</span>
            </div>
            <div className='flex flex-col gap-2 rounded-xl bg-white/10 p-5'>
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-5 w-5' />
                <span>Access all premium videos</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-5 w-5' />
                <span>Access live streams</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-5 w-5' />
                <span>Superchat feature enabled</span>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              {isLoading ? (
                <LoadingButton text='Loading' />
              ) : (
                <NormalButton onClick={subscriptionAPI}>Continue</NormalButton>
              )}
            </DrawerClose>
            <p className='mt-3 text-center text-xs'>
              By continuing you are accepting the <a href='#'>Terms and Conditions</a>
            </p>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
