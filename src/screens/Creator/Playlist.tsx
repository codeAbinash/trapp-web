import { VideoListShimmer } from '@/components/Video/VideoList'
import { getPlaylistByCreator_f } from '@/lib/api'
import { useCallback, useEffect, useState } from 'react'

const playListData = [
  {
    image: '/images/video/video1.png',
    title: 'Ultimate Knockouts',
    count: '10 Videos',
    id: 1,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    count: '7 Videos',
    id: 2,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    count: '5 Videos',
    id: 3,
  },
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    count: '6 Videos',
    id: 4,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    count: '3 Videos',
    id: 5,
  },
]

export interface Playlist {
  id: number
  playlist_name: string
  creator_id: string
  thumbnail: string
  created_at: string
  updated_at: string
  videos_count: number
}

function PlayListThumbnails({ playListData }: { playListData: Playlist[] }) {
  return playListData.map((videoData) => (
    <div
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-full  flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
    >
      <img className='w-full shrink-0' src={videoData.thumbnail} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8 text-center'>
        <p className='text-sm font-[450]'>{videoData.playlist_name}</p>
        <p className='text-xs opacity-70'>{videoData.videos_count}</p>
      </div>
    </div>
  ))
}
function Playlist({ creator_id }: { creator_id: string }) {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null)

  const getPlaylist = useCallback(async () => {
    const data = await getPlaylistByCreator_f(creator_id)
    if (!data.status) return
    setPlaylists(data.data.data)
  }, [creator_id])

  useEffect(() => {
    getPlaylist()
  }, [getPlaylist])

  if (!playlists)
    return (
      <div className='mt-5 w-full'>
        <VideoListShimmer count={6} />
      </div>
    )

  return (
    <div className='grid grid-cols-2 gap-5 p-5  pb-24'>
      <PlayListThumbnails playListData={playlists} />
    </div>
  )
}

export default Playlist
