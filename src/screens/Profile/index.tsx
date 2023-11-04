import { usePopupAlertContext } from '../../context/PopupAlertContext'
import transitions from '../../lib/transition'

export default function Profile() {
  const { newPopup } = usePopupAlertContext()

  return (
    <div>
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
        <img
          src='/images/other/pic.png'
          className='tap99 mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50'
          onClick={() => {
            console.log('clicked')
            transitions(() =>
              newPopup({
                title: 'Premium',
                subTitle: 'You are a premium user',
                action: [{ text: 'OK' }, { text: 'Cancel' }],
              }),
            )()
          }}
        />
        <img
          src='/images/other/pic.png'
          className='tap99 mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50'
          onClick={() => {
            console.log('clicked')
            transitions(() =>
              newPopup({
                title: 'Premium',
                subTitle: 'You are a premium user',
                action: [{ text: 'OK' }, { text: 'Cancel' }],
              }),
            )()
          }}
        />
        <img
          src='/images/other/pic.png'
          className='tap99 mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50'
          onClick={() => {
            console.log('clicked')
            transitions(() =>
              newPopup({
                title: 'Premium',
                subTitle: 'You are a premium user',
                action: [{ text: 'OK' }, { text: 'Cancel' }],
              }),
            )()
          }}
        />
        <img
          src='/images/other/pic.png'
          className='tap99 mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50'
          onClick={() => {
            console.log('clicked')
            transitions(() =>
              newPopup({
                title: 'Premium',
                subTitle: 'You are a premium user.',
                action: [{ text: 'OK' }, { text: 'Cancel' }],
              }),
            )()
          }}
        />
        <p className='text-xl font-[450]'>Leonardo Silva</p>
        <div className='tap97 mt-2 flex items-center justify-center rounded-full bg-accent px-3 py-1'>
          <img src='/icons/other/star.svg' className='h-3.5' />
          <p className='ml-1.5 pt-[0.07rem] text-sm leading-tight'>Premium</p>
          <img src='/icons/other/arrow.svg' className='ml-2.5 h-2.5' />
        </div>
      </div>
    </div>
  )
}
