import { useNavigate } from 'react-router-dom'
import transitions from '../../lib/transition'
import { Player } from 'video-react'

type Option = {
  text: string
  icon: string
  id: number
}

const optionsData: Option[] = [
  {
    text: '20M',
    icon: '/icons/other/thumb-up.svg',
    id: 1,
  },
  {
    text: '',
    icon: '/icons/other/thumb-down.svg',
    id: 2,
  },
  {
    text: 'Share',
    icon: '/icons/other/share.svg',
    id: 3,
  },
  {
    text: 'Report',
    icon: '/icons/other/report.svg',
    id: 4,
  },
]

const videosData = [
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '20min 30sec',
    id: 1,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    duration: '12min 36sec',
    id: 2,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 3,
  },
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '20min 30sec',
    id: 4,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    duration: '12min 36sec',
    id: 5,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 6,
  },
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '20min 30sec',
    id: 7,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    duration: '12min 36sec',
    id: 8,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 9,
  },
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 10,
  },
]

function VideThumbnails(videosData: any) {
  return videosData.map((videoData: any) => (
    <div
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-full  flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
    >
      <img className='w-full shrink-0' src={videoData.image} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8 text-center'>
        <p className='text-sm font-[450]'>{videoData.title}</p>
        <p className='text-xs opacity-70'>{videoData.duration}</p>
      </div>
    </div>
  ))
}

function Video() {
  const navigate = useNavigate()
  return (
    <>
      <div className='fixed top-0 z-10 w-full'>
        <Player
          playsInline
          poster='https://picsum.photos/seed/picsum/1600/900'
          src='http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov'
        ></Player>
      </div>
      <div className='h-dvh select-none'>
        <div className='stacked relative grid-cols-1 overflow-hidden'>
          <div className='darken_top_bottom h-full w-full '>
            <header className='absolute flex p-3'>
              <div
                className='tap95 mr-2 rounded-full p-3.5 active:bg-white/10'
                onClick={transitions(() => navigate(-1))}
              >
                <img src='/icons/other/arrow.svg' className='aspect-square w-[1.1rem] rotate-180' />
              </div>
            </header>
            <img src='/images/creator-background.png' className='aspect-[15/9] w-full object-cover' />
          </div>
          <div className='h-full w-full'>
            <div className='h-1/2 w-full bg-gradient-to-b from-bg to-black/60'></div>
            <div className='h-1/2 w-full bg-gradient-to-t from-bg to-black/60'></div>
          </div>
          <div className=''>
            <div className='flex w-full flex-col items-center justify-center gap-1.5'>
              <img src='/icons/other/play.svg' className='w-6' />
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-1.5 px-5'>
            <p className='text-xl font-[450]'>The Knockouts</p>
            <p className='text-sm opacity-70'>2M Views - 2 months ago</p>
          </div>
          <div className='no-scrollbar mt-5 flex w-full gap-3 overflow-x-scroll'>
            {optionsData.map((option) => (
              <div
                key={option.id}
                className='tap95 flex flex-none items-center justify-center gap-2.5 rounded-full bg-white/10 px-[1.15rem] py-[0.45rem] first:ml-5 last:mr-5'
              >
                <img src={option.icon} className='aspect-square w-[1.1rem]' />
                {option.text && <p className='text-[0.9rem]'>{option.text}</p>}
              </div>
            ))}
          </div>
          <div className='mt-1 flex items-center justify-between p-5'>
            <div className='flex items-center justify-between gap-4'>
              <img src='/icons/other/pic.png' className='w-12 rounded-full border border-white/60' />
              <div className='flex flex-grow flex-col justify-between gap-1'>
                <p className='text-sm font-[450]'>Coach Steve</p>
                <p className='text-xs opacity-70'>42M Followers</p>
              </div>
            </div>
            <div>
              <button className='highlight-none tap95 mt-2 rounded-full bg-accent px-6 py-[0.6rem] text-sm font-[420] text-white'>
                Follow
              </button>
            </div>
          </div>
        </div>

        <div className='px-5'>
          <p className='my-7 mt-2 text-base font-[450]'>Related Videos</p>
          <div className='grid grid-cols-2 gap-5 pb-24'>{VideThumbnails(videosData)}</div>
        </div>
      </div>
    </>
  )
}

export default Video
