import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../Redux/profile'
import store from '../../../Redux/store'
import { getBanners_f, getCurrentUser_f } from '../../../lib/api'
import transitions from '../../../lib/transition'
import { isLoggedIn } from '../../../lib/util'
import { UserProfile, setProfileInfoLs } from '../../Profile/utils'

export default function HomeScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate('/login', { replace: true })
    getUserData()
  }, [])

  const getUserData = useCallback(async function getUserData() {
    const userData = await getCurrentUser_f()
    if (userData.status) {
      const profile = userData?.data as UserProfile
      store.dispatch(setProfile(profile))
      setProfileInfoLs(profile)
    }
    console.log(userData.data)
  }, [])

  return (
    <div className='bg-bg pb-28'>
      <Banners />
      <Categories />
      <LiveNow />
      <Videos />
    </div>
  )
}

export interface Banner {
  id: number
  img_src: string
  action: string
  created_at: string
  updated_at: string
}

function Banners() {
  const [banners, setBanners] = useState<Banner[] | null>(null)

  const navigate = useNavigate()

  async function loadBanners() {
    const res = await getBanners_f()
    if (res.status) setBanners(res.data.data)
  }
  useEffect(() => {
    loadBanners()
  }, [])

  return (
    <div
      className='no-scrollbar relative mx-auto mt-2 flex w-full max-w-4xl select-none snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-1.5 lg:rounded-2xl'
      // ref={containerRef}
    >
      {banners == null ? (
        <div className='shimmer tap99 flex aspect-[2/1] w-[100%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-white/10 first:ml-5 last:mr-5  md:aspect-auto'></div>
      ) : (
        banners.map((banner) => (
          <div
            key={banner.id}
            // onClick={transitions(() => navigate('creator/sample/videos'))}
            className='tap99 bg-inputBg flex aspect-[1.82] w-[90%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-xl first:ml-0 last:mr-5 md:aspect-auto'
          >
            <img className='w-full shrink-0 rounded-2xl bg-white/10' src={banner.img_src} />
          </div>
        ))
      )}
    </div>
  )
}

const catagoriesData = [
  {
    image: '/images/categories/category1.png',
    title: 'Jiu Jitsu',
    id: 1,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Boxing',
    id: 2,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Muay Thai',
    id: 3,
  },
  {
    image: '/images/categories/category1.png',
    title: 'Boxing',
    id: 4,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Jiu Jitsu',
    id: 5,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Muay Thai',
    id: 6,
  },
]

function Categories() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Catagories</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {catagoriesData.map((category) => (
          <div
            key={category.id}
            className='tap99 bg-inputBg relative flex aspect-square w-[26%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm first:ml-5 last:mr-5'
          >
            <img className='w-full shrink-0' src={category.image} />
            <p className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-6 text-center text-sm'>
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const LiveNowData = [
  {
    image: '/images/categories/category1.png',
    title: 'Coach Steve',
    id: 1,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Coach Alex',
    id: 2,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Coach Leo',
    id: 3,
  },
  {
    image: '/images/categories/category1.png',
    title: 'Coach Jamal',
    id: 4,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Coach Jamal',
    id: 5,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Coach Jamal',
    id: 6,
  },
]

function LiveNow() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Live Now</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {LiveNowData.map((live) => (
          <div
            key={live.id}
            className='tap99 bg-inputBg flex w-[22%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden shadow-sm first:ml-5 last:mr-5'
          >
            <img className='aspect-square w-full shrink-0 rounded-full border-2 border-accent' src={live.image} />
            <p className='pt-2 text-[0.85rem]'>{live.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

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
]
function Videos() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Videos</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {VideoThumbnails(videosData)}
      </div>
      <div className='no-scrollbar relative mt-5 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {VideoThumbnails(shuffle(videosData))}
      </div>
    </div>
  )
}
// How to shuffle array
function shuffle(array: any) {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

function VideoThumbnails(videosData: any) {
  const navigate = useNavigate()
  return videosData.map((videoData: any) => (
    <div
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm first:ml-5 last:mr-5'
      onClick={transitions(() => navigate(`/video/${videoData.id}`))}
    >
      <img className='w-full shrink-0' src={videoData.image} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8   text-center'>
        <p className='text-sm font-[450]'>{videoData.title}</p>
        <p className='text-xs opacity-70'>{videoData.duration}</p>
      </div>
    </div>
  ))
}
