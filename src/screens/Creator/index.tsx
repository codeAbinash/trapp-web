import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import transitions from '../../lib/transition'
import Videos from './Videos'

function Creator() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname

  return (
    <div className='h-dvh select-none'>
      <div className='stacked xxs:h-[45vh] relative h-[50vh] grid-cols-1 overflow-hidden'>
        <div className='darken_top_bottom h-full w-full '>
          <header className='absolute flex p-3'>
            <div className='tap95 mr-2 rounded-full p-3.5 active:bg-white/10' onClick={transitions(() => navigate(-1))}>
              <img src='/icons/other/arrow.svg' className='aspect-square w-[1.1rem] rotate-180' />
            </div>
          </header>
          <img src='/images/creator-background.png' className='xxs:h-[45vh] h-[50vh] w-full object-cover' />
        </div>
        <div className='h-full w-full'>
          <div className='from-bg h-1/2 w-full bg-gradient-to-b to-black/60'></div>
          <div className='from-bg h-1/2 w-full bg-gradient-to-t to-black/60'></div>
        </div>
        <div className=''>
          <div className='flex w-full flex-col items-center justify-center gap-1.5'>
            <img src='/icons/other/pic.png' className='w-28 rounded-full border border-white/50' />
            <p className='text-[1.3rem] font-medium'>Coach Steve</p>
            <p className='text-sm opacity-90'>Wrestling Coach</p>
            <button className='highlight-none tap95 bg-color mt-2 rounded-full px-7 py-2 text-sm font-[420] text-white'>
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[1.3rem] font-[450]'>20</p>
          <p className='text-[0.82rem] opacity-70'>Videos</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[1.3rem] font-[450]'>32M</p>
          <p className='text-[0.82rem] opacity-70'>Followers</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[1.3rem] font-[450]'>7</p>
          <p className='text-[0.82rem] opacity-70'>Playlist</p>
        </div>
      </div>
      <div className='bg-bg sticky z-10 mt-5 grid grid-cols-2 gap-3 px-7'>
        <div
          className={`tap99 flex items-center justify-center border-2 border-transparent ${
            pathName.endsWith('videos') ? 'border-b-red-500' : ''
          } py-2.5 transition-colors active:bg-white/5`}
          onClick={transitions(() => navigate('videos', { replace: true }))}
        >
          Videos
        </div>
        <div
          className={`tap99 flex items-center justify-center border-2 border-transparent py-2.5 active:bg-white/5 ${
            pathName.endsWith('playlist') ? 'border-b-red-500' : ''
          }`}
          onClick={transitions(() => navigate('playlist', { replace: true }))}
        >
          Playlist
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Creator
