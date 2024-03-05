import Button from '@/components/Button'
import VideoList, { VideoListShimmer } from '@/components/Video/VideoList'
import { getVideosByPlaylist_f } from '@/lib/api'
import { NormalVideo } from '@/types'
import { useEffect, useRef, useState } from 'react'

export default function VideoByPlaylist({ playlist_id }: { playlist_id: number }) {
  const [videos, setVideos] = useState<NormalVideo[] | null>(null)
  const [page, setPage] = useState(1)
  const observerTarget = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMorePageAvailable, setIsMorePageAvailable] = useState(true)

  async function loadPlaylist(curr_page: number) {
    setIsLoading(true)
    const res = await getVideosByPlaylist_f(playlist_id, curr_page)
    if (!res.status) return
    if (res.data.data.next_page_url === null) {
      setIsMorePageAvailable(false)
    }

    const newVideos = res.data.data.data
    const allVideos = videos ? [...videos, ...newVideos] : newVideos
    setVideos(allVideos)
    setIsLoading(false)
  }

  function LoadMore() {
    if (isLoading) return
    setIsLoading(true)
    loadPlaylist(page)
    setPage(page + 1)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load More Data
          LoadMore()
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

  useEffect(() => {
    loadPlaylist(page)
  }, [])

  return (
    <>
      <VideoList videos={videos} />
      <div className='mt-3 flex w-full items-center justify-center'>
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
      {isMorePageAvailable && (
        <div ref={observerTarget} className='w-full px-8 pb-20'>
          {isLoading ? null : (
            <Button onClick={() => LoadMore()} className='font-normMid rounded-full bg-[#101010] text-sm text-white'>
              Show More Videos
            </Button>
          )}
        </div>
      )}
    </>
  )
}
