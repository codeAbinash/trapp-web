import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import transitions from '../../lib/transition'
import ls, { blank_fn } from '../../lib/util'
import { UserProfile } from '../Profile/utils'

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const pic = profile?.data?.profile_pic || '/images/other/pic.png'
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
              onClick={transitions(() => {
                navigate('/notifications')
              })}
            />
          </div>

          <img
            src={pic}
            className='bg-inputBg aspect-square w-9 rounded-full border border-white/60 bg-white/10 object-cover'
            onClick={transitions(() => {
              navigate('/profile', { replace: true })
            })}
          />
        </div>
        S
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
    </div>
  )
}

{
  /* {navItems.map((item, index) => (
    <div
      key={index}
      className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-1 pb-2.5 pt-4 ${
        path === item.path ? 'text-color' : 'text-white opacity-40'
      }`}
      onClick={
        item.onclick ? () => item.onclick(newPopup) : transitions(() => navigate(item.path, { replace: true }))
      }
    >
      <div className='flex aspect-square items-start justify-center'>
        <img
          className={path === item.path ? item.className_filled : 'invert ' + item.className}
          src={path === item.path ? item.icon_filled : item.icon}
        />
      </div>
      <span className='font-normMid text-center text-[0.7rem] font-[450]'>{item.name}</span>
    </div>
  ))} */
}

// const navItems = [
//   {
//     name: 'Home',
//     path: '/',
//     icon: '/icons/navbar/home.svg',
//     icon_filled: '/icons/navbar/home_filled.svg',
//     className: 'w-[18px]',
//     className_filled: 'w-[18px]',
//   },
//   {
//     name: 'Shop',
//     path: '/shop',
//     icon: '/icons/navbar/shop.svg',
//     icon_filled: '/icons/navbar/shop_filled.svg',
//     className: 'w-[21px]',
//     className_filled: 'w-[21px]',
//     onclick: (newPopup: (popup: PopupAlertType) => void) => {
//       window.open('https://shop.trappmartialarts.com/authwithapp/' + ls.get('token'), '_blank')
//     },
//   },
//   {
//     name: 'Profile',
//     path: '/profile',
//     icon: '/icons/navbar/profile.svg',
//     icon_filled: '/icons/navbar/profile_filled.svg',
//     className: 'w-[16px]',
//     className_filled: 'w-[16px]',
//   },
// ]
