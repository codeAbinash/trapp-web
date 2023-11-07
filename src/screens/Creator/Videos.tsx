const videosData = [
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '20min 30sec',
    id: 1,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    duration: '12min 36sec',
    id: 2,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 3,
  },
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '20min 30sec',
    id: 4,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    duration: '12min 36sec',
    id: 5,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 6,
  },
  {
    image: '/images/video/video1.png',
    title: 'The Knockouts',
    duration: '20min 30sec',
    id: 7,
  },
  {
    image: '/images/video/video2.png',
    title: 'Boxing Night',
    duration: '12min 36sec',
    id: 8,
  },
  {
    image: '/images/video/video3.png',
    title: 'The Knockouts',
    duration: '15min 7sec',
    id: 9,
  },
]

function VideThumbnails(videosData: any) {
  return videosData.map((videoData: any) => (
    <div
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-full  flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
    >
      <img className='w-full shrink-0' src={videoData.image} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8 text-center'>
        <p className='text-sm font-[450]'>{videoData.title}</p>
        <p className='text-xs opacity-70'>{videoData.duration}</p>
      </div>
    </div>
  ))
}

function Videos() {
  return <div className='grid grid-cols-2 gap-5 p-5 pb-24'>{VideThumbnails(videosData)}</div>
}

export default Videos
