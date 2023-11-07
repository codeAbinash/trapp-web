import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import transitions from '../../lib/transition'
import Videos from './Videos'

function Creator() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname

  return (
    <div className='h-dvh select-none'>
      <div className='stacked relative h-[50vh] grid-cols-1 overflow-hidden xxs:h-[45vh]'>
        <div className='darken_top_bottom h-full w-full '>
          <header className='absolute flex p-3'>
            <div className='tap95 mr-2 rounded-full p-3.5 active:bg-white/10' onClick={transitions(() => navigate(-1))}>
              <img src='/icons/other/arrow.svg' className='aspect-square w-[1.1rem] rotate-180' />
            </div>
          </header>
          <img src='/images/creator-background.png' className='h-[50vh] w-full object-cover xxs:h-[45vh]' />
        </div>
        <div className='h-full w-full'>
          <div className='h-1/2 w-full bg-gradient-to-b from-bg to-black/60'></div>
          <div className='h-1/2 w-full bg-gradient-to-t from-bg to-black/60'></div>
        </div>
        <div className=''>
          <div className='flex w-full flex-col items-center justify-center gap-1.5'>
            <img src='/icons/other/pic.png' className='w-28 rounded-full border-2 border-white/50' />
            <p className='text-[1.3rem] font-medium'>Coach Steve</p>
            <p className='text-sm opacity-90'>Wrestling Coach</p>
            <button className='highlight-none tap95 mt-2 rounded-full bg-accent px-7 py-2 text-sm font-[420] text-white'>
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
      <div className='sticky z-10 mt-5 grid grid-cols-2 gap-3 bg-bg px-7'>
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
