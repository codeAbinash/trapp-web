import { usePopupAlertContext } from '../../context/PopupAlertContext'
import transitions from '../../lib/transition'
const OPTIONS = [
  {
    groupName: 'Account',
    options: [
      {
        name: 'My Account',
        link: '/profile/edit',
        icon: '/icons/red/profile.svg',
        classNameIcon: 'anim-edit-icon',
      },
      {
        name: 'Manage Subscription',
        icon: '/icons/red/star.svg',
        className: 'text-red-600',
        small: 'Log out',
      },
      {
        name: 'Transaction History',
        icon: '/icons/red/clock.svg',
      },
    ],
  },
  {
    options: [
      {
        name: 'Privacy Policy',
        icon: '/icons/red/shield-done.svg',
      },
      {
        name: 'Terms & Conditions',
        icon: '/icons/red/terms.svg',
      },
      {
        name: 'About Us',
        icon: '/icons/red/about.svg',
      },
      {
        name: 'Contact Us',
        icon: '/icons/red/contact.svg',
      },
      {
        name: 'Share App',
        icon: '/icons/red/send.svg',
      },
    ],
    groupName: 'More',
  },
]

export default function Profile() {
  const { newPopup } = usePopupAlertContext()

  return (
    <div className='bg-bg pb-28'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img
          src='/images/other/pic.png'
          className='tap99 mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50'
          onClick={() => {
            console.log('clicked')
            transitions(() =>
              newPopup({
                title: <span className='font-medium'>Premium</span>,
                subTitle:
                  'Congratulations, you are a premium user. Enjoy the premium features. Thank you. If you have any questions, please contact us at abcd@gmail.com. Thank you.',
                action: [{ text: 'OK' }, { text: 'Cancel' }],
              }),
            )()
          }}
        />
        <p className='text-xl font-[450]'>Leonardo Silva</p>
        <div className='tap97 mt-2 flex items-center justify-center rounded-full bg-accent px-3 py-1.5'>
          <img src='/icons/other/star.svg' className='h-3.5' />
          <p className='ml-1.5 pt-[0.07rem] text-sm leading-tight'>Premium</p>
          <img src='/icons/other/arrow.svg' className='ml-2.5 h-2.5' />
        </div>
      </div>
      <div className='p-5'>
        {OPTIONS.map((optionGroup, i: number) => (
          <div className='mt-5' key={i}>
            <p className='font-normMid pl-2 text-sm text-neutral-300'>{optionGroup.groupName}</p>
            <div className='bg-inputBg/60 mt-3 flex flex-col gap-2 rounded-2xl p-3 dark:bg-[rgb(255,255,255,0.06)]'>
              {optionGroup.options.map((option, i: number) => (
                <div
                  className='tap99 flex items-center justify-between p-2 py-2.5 pl-2 pr-0'
                  key={i}
                  onClick={() => {}}
                >
                  <div className='flex w-full items-center justify-between gap-6'>
                    <div className='flex items-center gap-5'>
                      <img
                        src={option.icon}
                        className={`aspect-square w-6 opacity-80 dark:opacity-90 ${
                          option.classNameIcon ? option.classNameIcon : ''
                        }`}
                      />
                      <span
                        // className={`font-420 text-[0.85rem] opacity-90 ${option.className ? option.className : ''}`}
                        className={`font-420 pl-1 text-[0.95rem] opacity-90`}
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
      </div>
    </div>
  )
}
