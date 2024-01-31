import { useNavigate } from 'react-router-dom'
import { NormalVideo } from '../../types'
import { useSubscriptionDrawer } from '@/screens/Home/HomeScreen/subscriptionDrawerContext'
import { UserProfile } from '@/screens/Profile/utils'
import { useSelector } from 'react-redux'

export default function VideoList({ videos }: { videos: NormalVideo[] | null }) {
  const navigate = useNavigate()
  const { isOpened, setIsOpened } = useSubscriptionDrawer()
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const isSubscribed = profile?.subscription_status === 'active'

  if (!videos) return null

  console.log(videos)

  return (
    <div className='grid grid-cols-2 gap-5 p-5 pb-24'>
      {videos.map((video) => (
        <div
          onClick={() => {
            if (!isSubscribed) return setIsOpened(true)
            navigate(`/video/${video.id}`)
          }}
          key={video.id}
          className='tap99 bg-inputBg relative flex aspect-[3/4] w-full  flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
        >
          <img className='h-full w-full shrink-0 bg-cover object-cover' src={video.thumbnail} />
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8 text-center'>
            <p className='text-sm font-[450]'>{video.title}</p>
            <p className='text-xs opacity-70'>12 Min 13sec</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function VideoListShimmer({ count }: { count?: number }) {
  const arr = Array.from(Array(count || 6).keys())
  return (
    <div className='grid grid-cols-2 gap-4 px-5 pb-10'>
      {arr.map((i) => (
        <div
          key={i}
          className='tap99 bg-inputBg relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
        ></div>
      ))}
    </div>
  )
}
