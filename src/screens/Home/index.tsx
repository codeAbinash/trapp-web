import { NormalButton } from '@/components/Button'
import { LoadingButton } from '@/components/Loading'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from '@/components/ui/drawer'
import { cancelSubscription_f } from '@/lib/api'
import icon from '@/lib/icons'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import transitions from '../../lib/transition'
import ls, { blank_fn } from '../../lib/util'
import { UserProfile, updateLocalUserData } from '../Profile/utils'
import { usePremiumDrawer } from './HomeScreen/premiumDrawerContext'
import { useSubscriptionDrawer } from './HomeScreen/subscriptionDrawerContext'

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const pic = profile?.data?.profile_pic || '/AppIcons/t-pp.png'
  const { newPopup } = usePopupAlertContext()

  return (
    <div className='h-dvh'>
      <div
        className={`shadow-[#ffffff15]bg-bg sticky top-0 z-40 flex w-full items-center justify-between bg-bg/90 px-5 py-4 shadow-sm backdrop-blur-md`}
      >
        <div className='flex items-center justify-between gap-2'>
          <img src='/AppIcons/full.png' className='h-8' />
        </div>
        <div className='flex items-center justify-center gap-6'>
          <div className='relative'>
            <img
              src='/icons/other/notification.svg'
              className='tap95 w-4.5 opacity-60 invert'
              // onClick={transitions(() => {
              //   navigate('/notifications')
              // })}
            />
          </div>

          <PremiumIcon />

          <img
            src={pic}
            className='bg-inputBg aspect-square w-9 rounded-full border border-white/60 bg-white/10 object-cover'
            onClick={transitions(() => {
              navigate('/profile', { replace: true })
            })}
          />
        </div>
      </div>
      <Outlet />
      <div
        className='fixed bottom-[-1px] left-0 right-0 z-40 flex items-center justify-between border border-t-[0.5px] border-transparent border-t-[#77777744]
        bg-bg/90 px-2 align-middle backdrop-blur-md md:bottom-4 md:mx-auto md:max-w-sm md:rounded-full md:border-[#77777744]
        md:px-0 md:shadow-lg'
      >
        <div
          className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-1 pb-2.5 pt-4 ${
            path === '/' ? 'text-color' : 'text-white opacity-40'
          }`}
          onClick={transitions(() => navigate('/', { replace: true }))}
        >
          <div className='flex aspect-square items-start justify-center'>
            <img
              className={path === '/' ? 'w-[18px]' : 'invert ' + 'w-[18px]'}
              src={path === '/' ? '/icons/navbar/home_filled.svg' : '/icons/navbar/home.svg'}
            />
          </div>
          <span className='font-normMid text-center text-[0.7rem] font-[450]'>Home</span>
        </div>

        <div
          className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-1 pb-2.5 pt-4 ${
            path === '/shop' ? 'text-color' : 'text-white opacity-40'
          }`}
          onClick={() => {
            if (!profile?.data?.email) {
              newPopup({
                title: 'Please add email',
                subTitle: 'You need to add email to use shop',
                action: [
                  { text: 'Cancel', onClick: blank_fn },
                  { text: 'Add email', onClick: () => navigate('/account'), className: 'text-green-500' },
                ],
              })
            } else {
              window.open('https://shop.trappmartialarts.com/authwithapp/' + ls.get('token'), '_blank')
            }
          }}
        >
          <div className='flex aspect-square items-start justify-center'>
            <img
              className={path === '/shop' ? 'w-[21px]' : 'invert ' + 'w-[21px]'}
              src={path === '/shop' ? '/icons/navbar/shop_filled.svg' : '/icons/navbar/shop.svg'}
            />
          </div>
          <span className='font-normMid text-center text-[0.7rem] font-[450]'>Shop</span>
        </div>

        <div
          className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-1 pb-2.5 pt-4 ${
            path === '/profile' ? 'text-color' : 'text-white opacity-40'
          }`}
          onClick={transitions(() => navigate('/profile', { replace: true }))}
        >
          <div className='flex aspect-square items-start justify-center'>
            <img
              className={path === '/profile' ? 'w-[16px]' : 'invert ' + 'w-[16px]'}
              src={path === '/profile' ? '/icons/navbar/profile_filled.svg' : '/icons/navbar/profile.svg'}
            />
          </div>
          <span className='font-normMid text-center text-[0.7rem] font-[450]'>Profile</span>
        </div>
      </div>
      <PremiumDrawerWrapper />
    </div>
  )
}

function PremiumIcon() {
  const setPremiumOpen = usePremiumDrawer().setIsOpened
  const setNormalOpen = useSubscriptionDrawer().setIsOpened
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const [isLoading, setIsLoading] = useState(false)

  async function onclick() {
    setIsLoading(true)
    await updateLocalUserData()
    if (profile?.subscription_status?.status !== 'active') setNormalOpen(true)
    else setPremiumOpen(true)
    setIsLoading(false)
  }

  if (isLoading) return <img src='/icons/other/loading.svg' className='w-7 p-1 invert' />

  return <img src={icon('vip.svg')} className='bg-inputBg aspect-square w-7' onClick={onclick} />
}

function PremiumDrawerWrapper() {
  const { isOpened, setIsOpened } = usePremiumDrawer()
  return <PremiumDrawer isOpened={isOpened} setIsDrawerOpen={setIsOpened} />
}

export function PremiumDrawer({ isOpened, setIsDrawerOpen: setIsOpened }: { isOpened: boolean; setIsDrawerOpen: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const { newPopup } = usePopupAlertContext()
  const user: UserProfile = useSelector((state: any) => state.profile)

  async function cancelSubscription() {
    setIsOpened(false)
    newPopup({
      title: 'Are you sure?',
      subTitle: (
        <span className=''>
          You will not be able to access premium content after you cancel your subscription. Are you sure you want to
          cancel? This action cannot be undone.
        </span>
      ),
      action: [
        {
          className: 'text-red-500',
          text: 'Yes, cancel',
          onClick: () => {
            setTimeout(() => {
              newPopup({
                title: 'Asking one more time',
                subTitle: 'Are you sure you want to cancel your subscription? Maybe you want to reconsider?',
                action: [
                  {
                    className: 'text-red-500',
                    text: 'Yes, cancel',
                    onClick: async () => {
                      setIsLoading(true)
                      const res = await cancelSubscription_f()
                      if (!res.status) return
                      setIsLoading(false)
                      setIsOpened(false)
                      newPopup({
                        title: 'Subscription Cancelled',
                        subTitle: 'Your subscription has been cancelled successfully.',
                        action: [{ text: 'Okay', onClick: blank_fn }],
                      })
                      updateLocalUserData()
                    },
                  },
                  { text: 'No', onClick: blank_fn },
                ],
              })
            }, 500)
          },
        },
        { text: 'No', onClick: blank_fn },
      ],
    })
  }

  return (
    <Drawer open={isOpened} onClose={() => setIsOpened(false)}>
      <DrawerContent className='bg-black text-white outline-none'>
        <div className='mx-auto w-full max-w-sm'>
          <div className='mt-3 flex flex-col gap-4 p-3'>
            <div className='flex w-full items-center justify-between px-5'>
              <div className='flex items-center gap-5'>
                <img src={icon('vip.svg')} className='h-10 w-10' />
                <span className='text-xl font-semibold'>Trapp Premium</span>
                <span className='rounded-md bg-color px-2 py-1 text-xs font-medium'>Subscribed</span>
              </div>
            </div>
            <div className='mt10 mt-4 flex flex-col gap-2 rounded-xl bg-white/10 p-5'>
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-5 w-5 text-green-500' />
                <span>Access all premium videos</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-5 w-5 text-green-500' />
                <span>Access live streams</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-5 w-5 text-green-500' />
                <span>Superchat feature enabled</span>
              </div>
            </div>
            <div className='flex flex-col gap-2 rounded-xl bg-white/10 p-5 text-sm'>
              <div className='flex items-center gap-2'>
                <span>Subscription ends on {new Date(user?.subscription_status?.end_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              {isLoading ? (
                <LoadingButton text='Loading' />
              ) : (
                <NormalButton onClick={cancelSubscription}>Cancel Subscription</NormalButton>
              )}
            </DrawerClose>
            <p className='mt-3 text-center text-xs'>You are subscribed to Trapp Premium.</p>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
