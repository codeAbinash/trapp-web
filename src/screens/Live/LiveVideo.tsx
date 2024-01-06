import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Player } from 'video-react'
import { ScrollToTop } from '../../App'
import { getVideoDetails_f } from '../../lib/api'
import { niceDate } from '../../lib/util'
import { VideoDetails } from '../Video/components/VideoComponents'

export default function LiveVideo() {
  const { video_id } = useParams()
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)

  async function loadVideoDetails() {
    const res = await getVideoDetails_f(video_id!)
    if (!res.status) return
    console.log(res.data.data)
    setVideoDetails(res.data.data)
  }
  useEffect(() => {
    loadVideoDetails()
  }, [])
  return (
    <>
      <ScrollToTop />
      <div className='fixed top-0 z-10 w-full bg-bg/80 pb-2 backdrop-blur-md'>
        <Player playsInline poster={videoDetails?.thumbnail || ''} src={videoDetails?.video_loc || ''}></Player>
        <p className='mt-2 text-center text-[0.55rem] opacity-50'>
          Uploaded by {videoDetails?.creator.channel_name} - {niceDate(videoDetails?.created_at || '')}
        </p>
      </div>
      <div className='h-dvh select-none'>
        <div className='mt-2 aspect-video w-full'></div> {/*Blank Space for the video*/}
        <VideoDetails videoDetails={videoDetails} setVideoDetails={setVideoDetails} />
        <div>
          <p className='my-7 mt-2 px-5 text-center text-base font-[450]'>Live Chat</p>
          {/* <VideosByCat cat_id={videoDetails?.cat_id || 0} /> */}
        </div>
      </div>
    </>
  )
}
