import { useNavigate, useParams } from 'react-router-dom'
import transitions from '../../lib/transition'
import { Player } from 'video-react'
import { useEffect, useState } from 'react'
import { dislike_undislike_f, follow_unfollow_f, getVideoDetails_f, like_unlike_f } from '../../lib/api'
import { nFormatter, niceDate } from '../../lib/util'
import Creator from '../Creator'
import { ScrollToTop } from '../../App'
import ChannelName from '../../components/ChannelName'
import VideoList from '../../components/Video/VideoList'
import VideosByCat from '../Category/VideosByCat'

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

export interface VideoDetails {
  id: number
  creator_id: string
  cat_id: number
  title: string
  description: string
  privacy: string
  thumbnail: string
  video_loc: string
  video_type: string
  created_at: string
  updated_at: string
  like: number
  dislike: number
  followed: number
  like_count: number
  creator: Creator
  views: number
}

export interface Creator {
  id: number
  channel_name: string
  channel_logo: string
  channel_banner: string
  follow_count: number
}

export default function Video() {
  const navigate = useNavigate()
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
      <div className='bg-bg/80 fixed top-0 z-10 w-full pb-2 backdrop-blur-md'>
        <Player playsInline poster={videoDetails?.thumbnail || ''} src={videoDetails?.video_loc || ''}></Player>
        <p className='mt-2 text-center text-[0.55rem] opacity-50'>
          Uploaded by {videoDetails?.creator.channel_name} - {niceDate(videoDetails?.created_at || '')}
        </p>
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
            <div className='from-bg h-1/2 w-full bg-gradient-to-b to-black/60'></div>
            <div className='from-bg h-1/2 w-full bg-gradient-to-t to-black/60'></div>
          </div>
          <div className=''>
            <div className='flex w-full flex-col items-center justify-center gap-1.5'>
              <img src='/icons/other/play.svg' className='w-6' />
            </div>
          </div>
        </div>

        <>
          <div className='mt-5 flex flex-col gap-1.5 px-5'>
            <Title title={videoDetails?.title || null} />
            <p className='text-xs opacity-70'>
              {nFormatter(videoDetails?.views || 0)} Views - {niceDate(videoDetails?.created_at || '')}
            </p>
          </div>
          <ActionBar videoDetails={videoDetails} setVideoDetails={setVideoDetails} />
          <Description description={videoDetails?.description || ''} />
          <Creator videoDetails={videoDetails} setVideoDetails={setVideoDetails} />
        </>
        <div>
          <p className='my-7 mt-2 px-5 text-base font-[450]'>Related Videos</p>
          {/* <VideosByCat cat_id={videoDetails?.cat_id || 0} /> */}
        </div>
      </div>
    </>
  )
}

function Creator({
  videoDetails,
  setVideoDetails,
}: {
  videoDetails: VideoDetails | null
  setVideoDetails: React.Dispatch<React.SetStateAction<VideoDetails | null>>
}) {
  return (
    <div className='mt-1 flex items-center justify-between p-5'>
      <div className='flex items-center justify-between gap-4'>
        <img
          src={videoDetails?.creator.channel_logo}
          className='aspect-square w-12 rounded-full border border-white/60 bg-white/60'
        />
        <div className='flex flex-grow flex-col justify-between gap-1'>
          <p className='text-sm font-[450]'>
            <ChannelName channel_name={videoDetails?.creator.channel_name} />{' '}
          </p>
          <p className='text-xs opacity-70'>{nFormatter(videoDetails?.creator.follow_count || 0)} Followers</p>
        </div>
      </div>
      <FollowButton videoDetails={videoDetails} setVideoDetails={setVideoDetails} />
    </div>
  )
}

function ActionBar({
  videoDetails,
  setVideoDetails,
}: {
  videoDetails: VideoDetails | null
  setVideoDetails: React.Dispatch<React.SetStateAction<VideoDetails | null>>
}) {
  const [liked, setLiked] = useState(!!videoDetails?.like)
  const [disliked, setDisliked] = useState(!!videoDetails?.dislike)

  useEffect(() => {
    setLiked(!!videoDetails?.like)
    setDisliked(!!videoDetails?.dislike)
  }, [videoDetails])

  const clickLike = async () => {
    setDisliked(false)
    setLiked((prev) => !prev)
    const res = await like_unlike_f(videoDetails!.id.toString(), videoDetails!.creator.id.toString())
    console.log(res)
    // Set the same state again to revert back
    if (!res.status) setLiked(liked) // if error then revert back
  }
  const clickDislike = async () => {
    setLiked(false)
    setDisliked((prev) => !prev)
    const res = await dislike_undislike_f(videoDetails!.id.toString(), videoDetails!.creator.id.toString())
    console.log(res)
    // Set the same state again to revert back
    if (!res.status) setDisliked(disliked) // if error then revert back
  }

  return (
    <div className='no-scrollbar mt-3 flex w-full gap-3 overflow-x-scroll'>
      <div
        className={
          'tap95 ml-5 flex flex-none items-center justify-center gap-2.5 rounded-full px-[1.15rem] py-[0.45rem]' +
          (liked ? ' bg-white' : ' bg-white/10')
        }
        onClick={clickLike}
      >
        <img src='/icons/other/thumb-up.svg' className={'aspect-square w-[1.1rem]' + (liked ? ' invert' : '')} />
        <p className={'text-[0.9rem]' + (liked ? ' text-black' : ' text-white')}>
          {videoDetails?.like_count ? nFormatter(videoDetails?.like_count || 0) : 'Like'}
        </p>
      </div>
      <div
        className={
          'tap95 flex flex-none items-center justify-center gap-2.5 rounded-full px-[1.15rem] py-[0.45rem]' +
          (disliked ? ' bg-white' : ' bg-white/10')
        }
        onClick={clickDislike}
      >
        <img src='/icons/other/thumb-down.svg' className={'aspect-square w-[1.1rem]' + (disliked ? ' invert' : '')} />
      </div>
      <div className='tap95 flex flex-none items-center justify-center gap-2.5 rounded-full bg-white/10 px-[1.15rem] py-[0.45rem]'>
        <img src='/icons/other/share.svg' className='aspect-square w-[1.1rem]' />
        <p className='text-[0.9rem]'>Share</p>
      </div>
      <div className='tap95 mr-5 flex flex-none items-center justify-center gap-2.5 rounded-full bg-white/10 px-[1.15rem] py-[0.45rem]'>
        <img src='/icons/other/report.svg' className='aspect-square w-[1.1rem]' />
        <p className='text-[0.9rem]'>Report</p>
      </div>
    </div>
  )
}

function FollowButton({
  videoDetails,
  setVideoDetails,
}: {
  videoDetails: VideoDetails | null
  setVideoDetails: React.Dispatch<React.SetStateAction<VideoDetails | null>>
}) {
  if (!videoDetails)
    return (
      <button className='highlight-none tap95 bg-color mt-2 rounded-full px-6 py-[0.6rem] text-sm font-[420] text-white'>
        Follow
      </button>
    )

  const [followed, setFollowed] = useState(!!videoDetails.followed)
  const handelClick = async () => {
    transitions(() => setFollowed((prev) => !prev))()
    const res = await follow_unfollow_f(videoDetails.creator_id)
    // Set the same state again to revert back
    if (!res.status) setFollowed(followed)
  }

  // useEffect(() => {
  //   // Update the follow_count
  //   setVideoDetails((prev) => ({
  //     ...prev!,
  //     creator: { ...prev!.creator, follow_count: prev!.creator.follow_count + (followed ? 1 : -1) },
  //   }))
  // }, [followed])

  return (
    <button
      className={`highlight-none tap95 border-color mt-2 rounded-full border 
        ${followed ? 'border-white/10 bg-transparent' : 'bg-color'}
        px-6 py-[0.6rem] text-sm font-[420] text-white`}
      onClick={handelClick}
    >
      {followed ? 'Unfollow' : 'Follow'}
    </button>
  )
}

function Description({ description }: { description: string }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className='mt-2 px-5 py-2 text-[0.67rem]'>
      <div className=' rounded-xl bg-white/5 p-4' onClick={() => setShowMore(!showMore)}>
        <p className={showMore ? '' : 'line-clamp-3'}>{description || 'No description'}</p>
      </div>
    </div>
  )
}

function Title({ title }: { title: string | null }) {
  if (!title)
    return (
      <div className='flex flex-col gap-2'>
        <p className='h-4 rounded-full bg-white/10 font-[450]'></p>
        <p className='h-4 w-2/3 rounded-full bg-white/10 font-[450]'></p>
      </div>
    )
  return <p className='font-[450]'>{title}</p>
}
