export default function HomeScreen() {
  return (
    <div className='bg-bg pb-28'>
      <Banners />
      <Categories />
      <LiveNow />
      <Videos />
    </div>
  )
}

const bannerData = [
  {
    image: '/images/banner1.png',
    title: 'Shop',
    id: 1,
  },
  {
    image: '/images/banner2.png',
    title: 'Shop',
    id: 2,
  },
  {
    image: '/images/banner1.png',
    title: 'Shop',
    id: 3,
  },
  {
    image: '/images/banner2.png',
    title: 'Shop',
    id: 4,
  },
  {
    image: '/images/banner1.png',
    title: 'Shop',
    id: 5,
  },
  {
    image: '/images/banner2.png',
    title: 'Shop',
    id: 6,
  },
]
function Banners() {
  return (
    <div
      className='no-scrollbar relative mx-auto mt-2 flex w-full max-w-4xl select-none snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-1.5 lg:rounded-2xl'
      // ref={containerRef}
    >
      {bannerData == null ? (
        <div className='shimmer tap99 flex aspect-[2/1] w-[100%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl  first:ml-5 last:mr-5  md:aspect-auto'></div>
      ) : (
        bannerData.map((banner) => (
          <div
            key={banner.id}
            className='tap99 bg-inputBg flex aspect-[1.82] w-[90%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-xl bg-red-500/30  first:ml-0 last:mr-5 dark:bg-white/10 md:aspect-auto'
          >
            <img className='w-full shrink-0 rounded-2xl bg-red-500' src={banner.image} />
          </div>
        ))
      )}
    </div>
  )
}

const catagoriesData = [
  {
    image: '/images/categories/category1.png',
    title: 'Jiu Jitsu',
    id: 1,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Boxing',
    id: 2,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Muay Thai',
    id: 3,
  },
  {
    image: '/images/categories/category1.png',
    title: 'Boxing',
    id: 4,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Jiu Jitsu',
    id: 5,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Muay Thai',
    id: 6,
  },
]

function Categories() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Catagories</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {catagoriesData.map((category) => (
          <div
            key={category.id}
            className='tap99 bg-inputBg relative flex aspect-square w-[26%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/20 shadow-sm first:ml-5 last:mr-5 dark:bg-white/10'
          >
            <img className='w-full shrink-0' src={category.image} />
            <p className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-6 text-center text-sm'>
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const LiveNowData = [
  {
    image: '/images/categories/category1.png',
    title: 'Coach Steve',
    id: 1,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Coach Alex',
    id: 2,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Coach Leo',
    id: 3,
  },
  {
    image: '/images/categories/category1.png',
    title: 'Coach Jamal',
    id: 4,
  },
  {
    image: '/images/categories/category2.png',
    title: 'Coach Jamal',
    id: 5,
  },
  {
    image: '/images/categories/category3.png',
    title: 'Coach Jamal',
    id: 6,
  },
]

function LiveNow() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Live Now</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {LiveNowData.map((live) => (
          <div
            key={live.id}
            className='tap99 bg-inputBg flex w-[22%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden shadow-sm first:ml-5 last:mr-5'
          >
            <img className='aspect-square w-full shrink-0 rounded-full border-2 border-accent' src={live.image} />
            <p className='pt-2 text-[0.85rem]'>{live.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

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
]
function Videos() {
  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Videos</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {VideThumbnails(videosData)}
      </div>
      <div className='no-scrollbar relative mt-5 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {VideThumbnails(shuffle(videosData))}
      </div>
    </div>
  )
}
// How to shuffel array
function shuffle(array: any) {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

function VideThumbnails(videosData: any) {
  return videosData.map((videoData: any) => (
    <div
      key={videoData.id}
      className='tap99 bg-inputBg relative flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/20 shadow-sm first:ml-5 last:mr-5 dark:bg-white/10'
    >
      <img className='w-full shrink-0' src={videoData.image} />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-8   text-center'>
        <p className='text-sm font-[450]'>{videoData.title}</p>
        <p className='text-xs opacity-70'>{videoData.duration}</p>
      </div>
    </div>
  ))
}
