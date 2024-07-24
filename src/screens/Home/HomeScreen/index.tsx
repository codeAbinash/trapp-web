import { DrawerWrapper } from '@/App'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBanners_f, getHomeLayout_f } from '../../../lib/api'
import transitions from '../../../lib/transition'
import { isLoggedIn } from '../../../lib/util'
import { Layout, LiveVideo, NormalVideo } from '../../../types'
import { updateLocalUserData } from '../../Profile/utils'
import Categories from './Categories'
import { getDurationString } from '@/lib/utils'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
SwiperCore.use([Autoplay])

export default function HomeScreen() {
  const navigate = useNavigate()
  const [layout, setLayout] = useState<Layout | null>(null)

  useEffect(() => {
    if (!isLoggedIn()) navigate('/login', { replace: true })
    updateLocalUserData()
  }, [])

  const getLayout = useCallback(async function () {
    const res = await getHomeLayout_f()
    if (res.status) setLayout(res.data.data)
  }, [])

  useEffect(() => {
    getLayout()
  }, [])

  return (
    <div className='bg-bg pb-28'>
      <Banners />
      <Categories />
      <LiveNow live_videos={layout?.live_video || null} />
      <Videos normal_videos={layout?.normal_video || null} />
      {/* <Videos normal_videos={null} /> */}
      <DrawerWrapper />
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

  async function loadBanners() {
    const res = await getBanners_f()
    if (res.status) setBanners(res.data.data)
  }
  useEffect(() => {
    loadBanners()
  }, [])

  return (
    <>
      <div className='px-5 pt-1' id='banner'>
        {banners == null ? (
          <div className='shimmer tap99 mb-10 flex aspect-[10/5] w-[100%] shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-white/10'></div>
        ) : (
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: false,
            }}
            modules={[Pagination]}
            className='mySwiper'
            autoplay={{
              delay: 3000,
            }}
          >
            {banners.map((banner) => (
              // <div
              //   key={banner.id}
              //   onClick={transitions(() => navigate('creator/sample/videos'))}
              //   className='tap99 bg-inputBg flex aspect-[1.82] w-[90%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-xl first:ml-0 last:mr-5 md:aspect-auto'
              // >
              //   <img className='w-full shrink-0 rounded-2xl bg-white/10' src={banner.img_src} />
              // </div>
              <SwiperSlide
                className='tap99 aspect-[10/5]'
                key={banner.id}
                onClick={() => {
                  if (banner.action !== '#' && banner.action !== '') window.open(banner.action, '_blank')
                }}
              >
                <img src={banner.img_src} className='h-full w-full rounded-2xl bg-white/10 object-cover' />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div id='banner' className='px-5'></div>
    </>
  )
}

function LiveNow({ live_videos }: { live_videos: LiveVideo[] | null }) {
  const navigate = useNavigate()
  if (live_videos == null) return <LiveVideosShimmer />

  return (
    <>
      <div className='mx-auto max-w-4xl'>
        <div className='p-5'>
          <p className='text-lg font-[450]'>Live Now</p>
        </div>
        <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
          {live_videos.length === 0 && (
            <div className='tap99 flex w-full max-w-4xl items-center justify-center py-5'>
              <p className='text-center text-[0.85rem]'>No live videos available at the moment.</p>
            </div>
          )}

          {live_videos.map((live) => (
            <div
              onClick={transitions(() => navigate(`/liveVideo/${live.id}`))}
              key={live.id}
              className='tap99 bg-inputBg flex w-[22%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden shadow-sm first:ml-5 last:mr-5'
            >
              <img
                className='aspect-square w-full shrink-0 rounded-full border-2 border-color object-cover'
                src={live.creator.channel_logo}
              />
              <p className='pt-2 text-[0.85rem]'>{live.creator.channel_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function LiveVideosShimmer() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Live Now</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className='tap99 flex aspect-square w-[22%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-full bg-white/10 shadow-sm first:ml-5 last:mr-5'
          ></div>
        ))}
      </div>
    </div>
  )
}

function Videos({ normal_videos }: { normal_videos: NormalVideo[] | null }) {
  const first_half = normal_videos?.slice(0, Math.ceil(normal_videos.length / 2))
  const second_half = normal_videos?.slice(Math.ceil(normal_videos.length / 2), normal_videos.length)

  if (normal_videos == null) return <VideosShimmer />

  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Videos</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        <VideoThumbnails videosData={first_half || []} />
      </div>
      <div className='no-scrollbar relative mt-5 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        <VideoThumbnails videosData={second_half || []} />
      </div>
    </div>
  )
}

function VideosShimmer() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Videos</p>
        <div className='no-scrollbar relative mt-4 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className='tap99 bg-inputBg relative flex aspect-[3/4] w-[40%] max-w-[200px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
            ></div>
          ))}
        </div>
        <div className='no-scrollbar relative mt-4 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className='tap99 bg-inputBg relative flex aspect-[3/4] w-[40%] max-w-[200px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VideoThumbnails({ videosData }: { videosData: NormalVideo[] }) {
  const navigate = useNavigate()
  return (
    <>
      {videosData.map((videoData) => (
        <div
          key={videoData.id}
          className='tap99 bg-inputBg relative flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm first:ml-5 last:mr-5'
          onClick={transitions(() => navigate(`/video/${videoData.id}`))}
        >
          <img className='h-full w-full shrink-0 object-cover' src={videoData.thumbnail} />
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8   text-center'>
            <p className='line-clamp-1 text-sm font-[450]'>{videoData.title}</p>
            {/* <p className='text-xs opacity-70'>{videoData.duration}</p> */}
            <p className='text-xs opacity-70'>{getDurationString(videoData.video_duration)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
