import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import transitions from '../../lib/transition'

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: '/icons/navbar/home.svg',
    icon_filled: '/icons/navbar/home_filled.svg',
    className: 'w-[19px]',
    className_filled: 'w-[19px]',
  },
  {
    name: 'Shop',
    path: '/shop',
    icon: '/icons/navbar/shop.svg',
    icon_filled: '/icons/navbar/shop_filled.svg',
    className: 'w-[22px]',
    className_filled: 'w-[22px]',
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: '/icons/navbar/profile.svg',
    icon_filled: '/icons/navbar/profile_filled.svg',
    className: 'w-[17px]',
    className_filled: 'w-[17px]',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
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
            src='/images/other/pic.png'
            className='profile-picture bg-inputBg aspect-square w-9 rounded-full border border-white/60 bg-white/10 object-cover'
            onClick={transitions(() => {
              navigate('/profile')
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
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-2 pb-2.5 pt-3.5 ${
              path === item.path ? 'text-accent' : 'text-white opacity-40'
            }`}
            onClick={transitions(() => navigate(item.path, { replace: true }))}
          >
            <div className='flex aspect-square items-start justify-center'>
              <img
                className={path === item.path ? item.className_filled : 'invert ' + item.className}
                src={path === item.path ? item.icon_filled : item.icon}
              />
            </div>
            <span className='font-normMid text-center text-[0.7rem] font-[450]'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
