import { VideoListShimmer } from '@/components/Video/VideoList'
import { getPlaylistByCreator_f } from '@/lib/api'
import { Playlist } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PlayListThumbnails({ playListData }: { playListData: Playlist[] }) {
  const navigate = useNavigate()
  return playListData.map((videoData) => (
    <div
      onClick={() => {
        navigate(`/playlist/${videoData.id}`, { state: videoData })
      }}
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
function Playlist({ creator_id, hidden }: { creator_id: string; hidden: boolean }) {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null)

  const getPlaylist = useCallback(async () => {
    const data = await getPlaylistByCreator_f(creator_id)
    if (!data.status) return
    setPlaylists(data.data.data)
  }, [creator_id])

  useEffect(() => {
    getPlaylist()
  }, [getPlaylist])

  if (hidden) return null

  if (!playlists)
    return (
      <div className='mt-5 w-full'>
        <VideoListShimmer count={6} />
      </div>
    )

  if (playlists.length === 0)
    return (
      <div className='flex min-h-[30vh] items-center justify-center text-center text-white'>
        <p className='text-sm'>No Playlists Found</p>
      </div>
    )

  return (
    <div className='grid grid-cols-2 gap-5 p-5  pb-24'>
      <PlayListThumbnails playListData={playlists} />
    </div>
  )
}

export default Playlist
