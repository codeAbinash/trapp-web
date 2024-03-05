import { useLocation } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Playlist } from '../../types'
import VideosByPlaylist from './VideoByPlaylist'

export default function Playlist() {
  const loc = useLocation()
  const playlist = loc.state as Playlist
  console.log(playlist)
  return (
    <div>
      <Header>
        <span className='font-[450]'>{playlist.playlist_name}</span>
      </Header>
      <VideosByPlaylist playlist_id={playlist.id} />
    </div>
  )
}
