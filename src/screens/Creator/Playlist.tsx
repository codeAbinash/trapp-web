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

function PlayListThumbnails(playListData: any) {
  return playListData.map((videoData: any) => (
    <div
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-full  flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm'
    >
      <img className='w-full shrink-0' src={videoData.image} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8 text-center'>
        <p className='text-sm font-[450]'>{videoData.title}</p>
        <p className='text-xs opacity-70'>{videoData.count}</p>
      </div>
    </div>
  ))
}
function Playlist() {
  return <div className='grid grid-cols-2 gap-5 p-5  pb-24'>{PlayListThumbnails(playListData)}</div>
}

export default Playlist
