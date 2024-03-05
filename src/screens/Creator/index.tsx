import { follow_unfollow_f, getCreatorProfile_f } from '@/lib/api'
import { nFormatter } from '@/lib/util'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import transitions from '../../lib/transition'
import Playlist from './Playlist'
import Videos from './Videos'
import { CreatorProfileT } from './types'

export function FollowButton({ videoDetails, creatorId }: { videoDetails: CreatorProfileT | null; creatorId: string }) {
  const [followed, setFollowed] = useState(!!videoDetails?.is_followed)
  if (!videoDetails)
    return (
      <button className='highlight-none tap95 mt-2 rounded-full bg-color px-6 py-[0.6rem] text-sm font-[420] text-white'>
        Follow
      </button>
    )

  const handelClick = async () => {
    transitions(() => setFollowed((prev) => !prev))()
    const res = await follow_unfollow_f(creatorId)
    console.log(res)
    // Set the same state again to revert back
    if (!res.status) setFollowed(followed)
  }

  return (
    <button
      className={`highlight-none tap95 mt-2 rounded-full border border-color 
        ${followed ? 'border-white/10 bg-transparent' : 'bg-color'}
        px-6 py-[0.6rem] text-sm font-[420] text-white`}
      onClick={handelClick}
    >
      {followed ? 'Unfollow' : 'Follow'}
    </button>
  )
}

function Creator() {
  const navigate = useNavigate()
  // const location = useLocation()
  const params = useParams()
  const creatorId = params.creator as string
  // const pathName = location.pathname
  const [currentTab, setCurrentTab] = useState<'videos' | 'playlist'>('videos')

  const [creatorProfile, setCreatorProfile] = useState<CreatorProfileT | null>(null)

  async function loadCreators(creatorId: string) {
    const status = await getCreatorProfile_f(creatorId)
    console.log(status.data.data)
    if (!status.status) return
    setCreatorProfile(status.data.data)
  }

  useEffect(() => {
    loadCreators(creatorId)
  }, [])

  return (
    <div className='select-none'>
      <div className='stacked relative h-[50vh] grid-cols-1 overflow-hidden xxs:h-[45vh]'>
        <div className='darken_top_bottom h-full w-full '>
          <header className='absolute flex p-3'>
            <div className='tap95 mr-2 rounded-full p-3.5 active:bg-white/10' onClick={transitions(() => navigate(-1))}>
              <img src='/icons/other/arrow.svg' className='aspect-square w-[1.1rem] rotate-180' />
            </div>
          </header>
          <img src={creatorProfile?.channel_banner} className='h-[50vh] w-full object-cover xxs:h-[45vh]' />
        </div>
        <div className='h-full w-full'>
          <div className='h-1/2 w-full bg-gradient-to-b from-bg to-black/60'></div>
          <div className='h-1/2 w-full bg-gradient-to-t from-bg to-black/60'></div>
        </div>
        <div className=''>
          <div className='flex w-full flex-col items-center justify-center gap-1.5'>
            <img
              src={creatorProfile?.channel_logo}
              className='h-28 w-28 rounded-full border border-white/50 bg-white/10'
            />
            <p className='text-[1.3rem] font-medium'>{creatorProfile?.channel_name}</p>
            <p className='text-sm opacity-90'>
              {creatorProfile?.first_name} {creatorProfile?.last_name}
            </p>
            <FollowButton videoDetails={creatorProfile} creatorId={creatorId} />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[1.3rem] font-[450]'>{nFormatter(creatorProfile?.videos_counts || 0)}</p>
          <p className='text-[0.82rem] opacity-70'>Videos</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[1.3rem] font-[450]'>{nFormatter(creatorProfile?.follow_counts || 0)}</p>
          <p className='text-[0.82rem] opacity-70'>Followers</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[1.3rem] font-[450]'>{nFormatter(creatorProfile?.playlists_count || 0)}</p>
          <p className='text-[0.82rem] opacity-70'>Playlist</p>
        </div>
      </div>
      <div className='sticky z-10 mt-5 grid grid-cols-2 gap-3 bg-bg px-7'>
        <div
          className={`tap99 flex items-center justify-center border-2 border-transparent ${
            currentTab === 'videos' ? 'border-b-red-500' : ''
          } py-2.5 transition-colors active:bg-white/5`}
          onClick={transitions(() => setCurrentTab('videos'))}
        >
          Videos
          {creatorProfile?.videos_counts ? (
            <span className='pl-1 text-xs'> ({nFormatter(creatorProfile?.videos_counts)})</span>
          ) : null}
        </div>
        <div
          className={`tap99 flex items-center justify-center border-2 border-transparent py-2.5 active:bg-white/5 ${
            currentTab === 'playlist' ? 'border-b-red-500' : ''
          }`}
          onClick={transitions(() => setCurrentTab('playlist'))}
        >
          Playlist
          {creatorProfile?.playlists_count ? (
            <span className='pl-1 text-xs'> ({nFormatter(creatorProfile?.playlists_count)})</span>
          ) : null}
        </div>
      </div>
      <div>
        {currentTab === 'videos' ? (
          creatorProfile?.videos_counts ? (
            <Videos videosData={creatorProfile?.videosOrLives.data} creatorId={creatorId} />
          ) : (
            <div className='flex h-[30vh] items-center justify-center'>
              <p className='font-[450]'>No Videos</p>
            </div>
          )
        ) : null}
      </div>
      <div>
        {currentTab === 'playlist' ? (
          creatorProfile?.playlists_count ? (
            <Playlist creator_id={creatorId} />
          ) : (
            <div className='flex h-[30vh] items-center justify-center'>
              <p className='font-[450]'>No Playlist</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}

export default Creator
