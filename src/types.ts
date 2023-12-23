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
}

export interface NormalVideo {
  id: number
  creator_id: string
  cat_id: string
  title: string
  description: string
  privacy: Privacy
  thumbnail: string
  video_loc: string
  video_type: VideoType
  created_at: string
  updated_at: string
  views: number
}

export interface Category {
  id: number
  image: string
  title: string
  created_at: string
  updated_at: string
}
