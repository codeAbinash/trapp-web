import { useNavigate } from 'react-router-dom'
import { VideoListShimmer } from '@/components/Video/VideoList'
import { VideosOrLive } from './types'
import { useEffect, useRef, useState } from 'react'
import { channelVideos } from '@/lib/api'
import { current } from '@reduxjs/toolkit'

function VideThumbnails({ videosData }: { videosData: VideosOrLive[] }) {
  const navigate = useNavigate()

  return videosData.map((videoData) => (
    <div
      onClick={() => navigate(`/${videoData.video_type === 'live' ? 'liveVideo' : 'video'}/${videoData.id}`)}
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

function Videos({ videosData, creatorId }: { videosData: VideosOrLive[] | null | undefined; creatorId: string }) {
  const [videos, setVideos] = useState<VideosOrLive[] | null>([] || null)
  const [page, setPage] = useState(2)
  const observerTarget = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMorePageAvailable, setIsMorePageAvailable] = useState(true)

  async function loadVideos(currPage: number) {
    setIsLoading(true)
    const res = await channelVideos(creatorId, currPage)
    if (!res.status) return

    const pagination = res.data.data.videosOrLives

    if (pagination.next_page_url === null) {
      setIsMorePageAvailable(false)
    }

    const newVideos = pagination.data
    const allVideos = videos ? [...videos, ...newVideos] : newVideos
    setVideos(allVideos)
    setIsLoading(false)
  }
  useEffect(() => {
    loadVideos(1)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load More Data
          if (isLoading) return
          setIsLoading(true)
          loadVideos(page)
          setPage((page) => page + 1)
        }
      },
      { threshold: 1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerTarget, isLoading])

  if (!videosData)
    return (
      <div className='mt-5 w-full'>
        <VideoListShimmer />
      </div>
    )

  if (!videosData.length)
    return (
      <div className='flex w-full flex-col items-center justify-center py-20'>
        <p className='text-sm text-white'>No videos</p>
      </div>
    )
  return (
    <>
      <div className='grid grid-cols-2 gap-5 p-5'>
        <VideThumbnails videosData={videos || []} />
      </div>
      <div className='pb-24'>
        {isMorePageAvailable ? (
          isLoading ? (
            <div className='tap95 highlight-none font-normMid w-full animate-pulse rounded-full text-xs'>
              <VideoListShimmer />
            </div>
          ) : null
        ) : videos?.length === 0 ? (
          <span className='font-normMid mt-5 text-xs opacity-50'>No More Videos</span>
        ) : null}
      </div>
      {isMorePageAvailable && <div ref={observerTarget} className='mt-30 mb-20 h-3 w-full'></div>}
    </>
  )
}

export default Videos
