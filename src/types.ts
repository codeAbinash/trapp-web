export enum Privacy {
  Public = 'public',
}

export enum VideoType {
  Normal = 'normal',
}
export interface Response {
  status: boolean
  data: Layout
  message: string
}

export interface Layout {
  normal_video: NormalVideo[]
  live_video: LiveVideo[]
}

export interface LiveVideo {
  id: number
  creator_id: string
  creator: Creator
}

export interface Creator {
  id: number
  channel_name: string
  channel_logo: string
  first_name: string
  last_name: string
}

export interface NormalVideo {
  id: number
  creator_id: string
  cat_id: string
  title: string
  description: null | string
  privacy: string
  thumbnail: string
  video_loc: string
  video_type: string
  views: number
  created_at: string
  updated_at: string
  live_api_data: null
  video_duration: string
}

export interface Category {
  id: number
  image: string
  title: string
  created_at: string
  updated_at: string
}

export interface Playlist {
  id: number
  playlist_name: string
  creator_id: string
  thumbnail: string
  created_at: string
  updated_at: string
  videos_count: number
}
