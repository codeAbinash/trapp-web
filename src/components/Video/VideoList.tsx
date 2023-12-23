import { useNavigate } from 'react-router-dom'
import { NormalVideo } from '../../types'

export default function VideoList({ videos }: { videos: NormalVideo[] | null }) {
  const navigate = useNavigate()

  if (!videos) return null

  console.log(videos)

  return (
    <div className='grid grid-cols-2 gap-5 p-5 pb-24'>
      {videos.map((video) => (
        <div
          onClick={() => navigate(`/video/${video.id}`)}
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

export function VideoListShimmer() {
  return (
    <div className='grid grid-cols-2 gap-4 px-5 pb-10'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className='tap99 bg-inputBg relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
        ></div>
      ))}
    </div>
  )
}
