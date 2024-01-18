import { useNavigate } from 'react-router-dom'
import { VideoListShimmer } from '@/components/Video/VideoList'
import { VideosOrLive } from './types'

function VideThumbnails({ videosData }: { videosData: VideosOrLive[] }) {
  const navigate = useNavigate()

  return videosData.map((videoData) => (
    <div
      onClick={() => navigate(`/video/${videoData.id}`)}
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-full  flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
    >
      <img className='w-full shrink-0' src={videoData.thumbnail} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8 text-center'>
        <p className='text-sm font-[450]'>{videoData.title}</p>
        <p className='text-xs opacity-70'>Video Duration</p>
      </div>
    </div>
  ))
}

function Videos({ videosData }: { videosData: VideosOrLive[] | null | undefined }) {
  if (!videosData)
    return (
      <div className='mt-5 w-full'>
        <VideoListShimmer />
      </div>
    )

  if (!videosData.length)
    return (
      <div className='flex w-full flex-col items-center justify-center py-20'>
        <p className='text-sm text-white'>No videos found</p>
      </div>
    )
  return (
    <div className='grid grid-cols-2 gap-5 p-5 pb-24'>
      <VideThumbnails videosData={videosData} />
    </div>
  )
}

export default Videos
