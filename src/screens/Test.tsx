// import 'node_modules/video-react/dist/video-react.css' // import css
import { Player } from 'video-react'
import 'video-react/dist/video-react.css' // import css

function Test() {
  return (
    <div>
      <h1 className='mb-8 mt-4 text-center text-2xl font-bold'>Video Player</h1>
      <div>
        <Player
          playsInline
          poster='https://picsum.photos/seed/picsum/1600/900'
          src='http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov'
        ></Player>
      </div>
    </div>
  )
}

export default Test
