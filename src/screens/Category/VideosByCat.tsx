import { useEffect, useRef, useState } from 'react'
import { getVideosByCategory_f } from '../../lib/api'
import VideoList, { VideoListShimmer } from '../../components/Video/VideoList'
import { Loading } from '../../components/Loading'
import { NormalVideo } from '../../types'

export default function VideosByCat({ cat_id }: { cat_id: number }) {
  const [videos, setVideos] = useState<NormalVideo[] | null>(null)
  const [page, setPage] = useState(1)
  const observerTarget = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMorePageAvailable, setIsMorePageAvailable] = useState(true)

  async function loadCategory(curr_page: number) {
    setIsLoading(true)
    const res = await getVideosByCategory_f(cat_id, curr_page)
    console.log(res.data.data)
    if (!res.status) return
    if (res.data.data.next_page_url === null) {
      setIsMorePageAvailable(false)
    }

    const newVideos = res.data.data.data
    const allVideos = videos ? [...videos, ...newVideos] : newVideos
    setVideos(allVideos)
    console.log(allVideos)
    setIsLoading(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load More Data
          if (isLoading) return
          setIsLoading(true)
          loadCategory(page)
          setPage(page + 1)
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
    loadCategory(page)
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
      {isMorePageAvailable && <div ref={observerTarget}></div>}
    </>
  )
}
