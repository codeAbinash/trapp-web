export interface CreatorProfileT {
  first_name: string
  last_name: string
  channel_name: string
  channel_banner: string
  channel_logo: string
  is_followed: boolean
  follow_counts: number
  videos_counts: number
  playlist_count: number
  videosOrLives: VideosOrLive[]
}

export interface VideosOrLive {
  id: number
  title: string
  thumbnail: string
  video_loc: string
  video_type: string
  views: number
}
