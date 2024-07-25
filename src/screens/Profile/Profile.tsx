import { DrawerWrapper } from '@/App'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TapMotion from '../../components/TapMotion'
import Watermark from '../../components/Watermark'
import { DEFAULT_PP, app } from '../../constants'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import transitions from '../../lib/transition'
import { usePremiumDrawer } from '../Home/HomeScreen/premiumDrawerContext'
import { useSubscriptionDrawer } from '../Home/HomeScreen/subscriptionDrawerContext'
import { UserProfile, updateLocalUserData } from './utils'
type Option = {
  name: string
  icon: string
  link?: string
  small?: string
  onClick?: () => void
}

type OptionGroup = {
  groupName?: string
  options: Option[]
}

type ProfileOptions = OptionGroup[]

export default function Profile() {
  const navigate = useNavigate()
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const name = profile?.data?.name || 'Your Name'
  const pic = profile?.data?.profile_pic || DEFAULT_PP
  const setIsOpenedNormal = useSubscriptionDrawer().setIsOpened
  const setIsOpenedPremium = usePremiumDrawer().setIsOpened

  const OPTIONS: ProfileOptions = [
    {
      groupName: 'Account',
      options: [
        {
          name: 'Your Account',
          icon: '/icons/red/profile.svg',
          link: '/account',
        },
        {
          name: 'Your Wallet',
          icon: '/icons/red/wallet.svg',
          link: '/wallet',
        },
        {
          name: 'Manage Subscription',
          icon: '/icons/red/star.svg',
          small: 'Log out',
          link: '/manage-subscription',
          onClick: () => {
            if (profile?.subscription_status?.status !== 'active') setIsOpenedNormal(true)
            else setIsOpenedPremium(true)
          },
        },
        {
          name: 'Transaction History',
          icon: '/icons/red/clock.svg',
          small: 'Log out',
          link: '/transaction-history',
        },
      ],
    },
    {
      options: [
        {
          name: 'Privacy Policy',
          icon: '/icons/red/shield-done.svg',
          link: '/privacy-policy',
        },
        {
          name: 'Terms & Conditions',
          icon: '/icons/red/doc.svg',
          link: '/terms-and-conditions',
        },
        {
          name: 'About Us',
          icon: '/icons/red/about.svg',
          link: '/about-us',
        },
        {
          name: 'Contact Us',
          icon: '/icons/red/message.svg',
          link: '/contact-us',
        },
        {
          name: 'Share App',
          icon: '/icons/red/send.svg',
          onClick: () => {
            navigator.share({
              text: `Transform your fitness journey with Trapp! Access high-quality gym videos, expert tips, and personalized plans. Download now on the Play Store: ${app.play_store_link}. Let's get stronger together! 💪`,
            })
          },
        },
      ],
      groupName: 'More',
    },
  ]
  useEffect(() => {
    updateLocalUserData()
  }, [])

  return (
    <div className='bg-bg pb-28'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <TapMotion className='w-full' size='lg'>
          <img
            src={pic}
            className='profile-picture tap99 mx-auto mt-16 aspect-square w-2/5 max-w-xs rounded-full border border-white/50'
            onClick={transitions(() => {
              navigate('/account')
            })}
          />
        </TapMotion>
        <p className='user-full-name text-xl font-[450]'>{name}</p>
        {/* <div className='tap97 mt-2 flex items-center justify-center rounded-full bg-color px-3 py-1.5'>
          <img src='/icons/other/star.svg' className='h-3.5' />
          <p
            className='edit-button ml-1.5 pt-[0.07rem] text-sm leading-tight'
            onClick={() => {
              if (profile?.subscription_status.status === 'expired') setIsOpenNormal(true)
              else setIsOpenedPremium(true)
            }}
          >
            Premium
          </p>
          {profile?.subscription_status.status === 'expired' && (
            <img src='/icons/other/arrow.svg' className='ml-2.5 h-2.5' />
          )}
        </div> */}
        {profile?.subscription_status?.status === 'active' && (
          <div className='tap97 mt-2 flex items-center justify-center rounded-full bg-color px-3 py-1.5'>
            <img src='/icons/other/star.svg' className='h-3.5' />
            <p className='edit-button ml-1.5 pt-[0.07rem] text-sm leading-tight'>Premium</p>
          </div>
        )}
      </div>
      <div className='p-5'>
        {OPTIONS.map((optionGroup, i: number) => (
          <div className='mt-5' key={i}>
            <p className='font-normMid pl-2 text-sm text-neutral-300'>{optionGroup.groupName}</p>
            <div className='bg-inputBg/60 mt-3 flex flex-col gap-2 rounded-2xl bg-[rgb(255,255,255,0.06)] p-3'>
              {optionGroup.options.map((option, i: number) => (
                <div
                  className='tap99 flex items-center justify-between p-2 py-2.5 pl-2 pr-0'
                  key={i}
                  onClick={transitions(() => {
                    if (option.onClick) option.onClick()
                    else if (option.link) navigate(option.link)
                  })}
                >
                  <div className='flex w-full items-center justify-between gap-6'>
                    <div className='flex items-center gap-5'>
                      <img
                        src={option.icon}
                        className={`aspect-square w-[1.3rem] opacity-90`}
                        // className={`aspect-square w-6 opacity-90 ${option.classNameIcon ? option.classNameIcon : ''}`}
                      />
                      <span
                        // className={`font-420 text-[0.85rem] opacity-90 ${option.className ? option.className : ''}`}
                        className={`font-420 pl-1 text-[0.9rem] font-[450] opacity-90`}
                      >
                        {option.name}
                      </span>
                    </div>
                    <div className='flex items-center gap-1.5 pr-2.5'>
                      <span className='font-420 text-xs capitalize opacity-50'>
                        {/* {typeof option.small === 'function' ? option.small(profile, settings) : option.small} */}
                      </span>
                      <img src='/icons/other/arrow.svg' className='w-2.5 opacity-40' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <LogOut />
      </div>

      <p className='text-center text-sm opacity-50'>
        Version {app.name} ({app.code})
      </p>
      <Watermark />
      <DrawerWrapper />
    </div>
  )
}

function LogOut() {
  const navigate = useNavigate()
  const { newPopup } = usePopupAlertContext()

  const logOut = () => {
    newPopup({
      title: 'Log Out',
      subTitle: 'Are you sure you want to log out?',
      action: [
        { text: 'Cancel' },
        {
          text: 'Log Out',
          className: 'text-red-500',
          onClick: () => {
            localStorage.clear()
            navigate('/home', { replace: true })
          },
        },
      ],
    })
  }

  return (
    <div className='mt-5'>
      <div className='bg-inputBg/60 mt-3 flex flex-col gap-2 rounded-2xl bg-[rgb(255,255,255,0.06)] p-3'>
        <div className='tap99 flex items-center justify-between p-2 py-2.5 pl-2 pr-0' onClick={transitions(logOut)}>
          <div className='flex w-full items-center justify-between gap-6'>
            <div className='flex items-center gap-5'>
              <img src='/icons/other/logout.svg' className='aspect-square w-[1.5rem] opacity-90' />
              <span className='font-420 pl-1 text-[0.9rem] font-[450] opacity-90'>Log Out</span>
            </div>
            <div className='flex items-center gap-1.5 pr-2.5'>
              <span className='font-420 text-xs capitalize opacity-50'>Log out</span>
              <img src='/icons/other/arrow.svg' className='w-2.5 opacity-40' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
