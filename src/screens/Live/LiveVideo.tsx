import TapMotion from '@/components/TapMotion'
import { XIcon } from 'lucide-react'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Player } from 'video-react'
import { ScrollToTop } from '../../App'
import { getVideoDetails_f } from '../../lib/api'
import { niceDate } from '../../lib/util'
import { UserProfile } from '../Profile/utils'
import { VideoDetails } from '../Video/components/VideoComponents'

export default function LiveVideo() {
  const { video_id } = useParams()
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(true)
  async function loadVideoDetails() {
    const res = await getVideoDetails_f(video_id!)
    if (!res.status) return
    console.log(res.data.data)
    setVideoDetails(res.data.data)
  }
  useEffect(() => {
    loadVideoDetails()
  }, [])
  return (
    <>
      <ScrollToTop />
      <div className='fixed top-0 z-10 w-full bg-bg/80 pb-2 backdrop-blur-md'>
        <Player playsInline poster={videoDetails?.thumbnail || ''} src={videoDetails?.video_loc || ''}></Player>
        <p className='mt-2 text-center text-[0.55rem] opacity-50'>
          Uploaded by {videoDetails?.creator.channel_name} - {niceDate(videoDetails?.created_at || '')}
        </p>
      </div>

      <div
        className='fixed select-none'
        style={{
          marginTop: 'calc(100vw * 10 / 16)',
        }}
      >
        {!isLiveChatOpen ? (
          <>
            <VideoDetails videoDetails={videoDetails} setVideoDetails={setVideoDetails} />
            <div>
              <p className='mb-3 mt-2 px-5 text-base font-semibold'>Live Chat</p>
            </div>
            <LiveChatBox setIsLiveChatOpen={setIsLiveChatOpen} />
          </>
        ) : (
          <LiveChatUi setIsLiveChatOpen={setIsLiveChatOpen} />
        )}
      </div>
    </>
  )
}

function LiveChatBox({ setIsLiveChatOpen }: { setIsLiveChatOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const pic = profile?.data?.profile_pic || '/images/other/pic.png'
  const name = profile?.data?.name || 'Your Name'
  return (
    <div
      className='px-5'
      onClick={() => {
        setIsLiveChatOpen!(true)
      }}
    >
      <div className='w-full items-center rounded-xl bg-white/5 p-4'>
        <div className='flex w-full items-center'>
          <img src={pic} className='h-10 w-10 rounded-full' />
          <div className='ml-3 flex-grow'>
            <div className='w-full rounded-xl bg-white/5 px-3 py-3.5'>
              <p className='text-xs opacity-50'>Chat as {name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LiveChatUi({ setIsLiveChatOpen }: { setIsLiveChatOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <div className='px-5'>
        <div className='flex items-center justify-between px-3 py-3 pr-1'>
          <p>Live Chat</p>

          <TapMotion className='rounded-full bg-white/10 p-2'>
            <XIcon
              size={20}
              onClick={() => {
                setIsLiveChatOpen!(false)
              }}
            />
          </TapMotion>
        </div>
        <div></div>
      </div>
      <LiveChat />
    </>
  )
}

interface MessageT {
  time: string
  id: number
  name: string
  message: string
  avatar: string
}

function Message({ message }: { message: MessageT }) {
  return (
    <div className='flex items-center gap-4 pl-5 pr-5'>
      <img src={message.avatar} alt='' className='h-8 w-8 rounded-full' />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-semibold'>{message.name}</span>
          <span className='text-xs opacity-60'>
            {new Date(message.time).toLocaleTimeString('en-US', {
              hour: 'numeric',
              hour12: true,
              minute: 'numeric',
            })}
          </span>
        </div>
        <div className='text-sm'>{message.message}</div>
      </div>
    </div>
  )
}

const MAX_MESSAGES_SIZE = 200
const sampleMessages: MessageT[] = [
  {
    time: '2024-01-06T10:15:22.123456Z',
    id: 1,
    name: 'Alice Johnson',
    message: "Hey there! How's your day going? 😊",
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    time: '2024-01-06T10:17:45.987654Z',
    id: 2,
    name: 'Bob Smith',
    message: "Hi, Abinash! What's the latest coding challenge you've tackled? 💻",
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    time: '2024-01-06T10:20:10.234567Z',
    id: 3,
    name: 'Charlie Brown',
    message: 'Hello! Just wanted to drop by and say hi! 👋',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    time: '2024-01-06T10:22:35.876543Z',
    id: 4,
    name: 'Diana Miller',
    message: 'Greetings! Anything exciting happening in the coding world today? 🚀',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    time: '2024-01-06T10:25:00.765432Z',
    id: 5,
    name: 'Ethan Taylor',
    message: "Hey Abinash! I'm curious, what's your favorite programming language and why? 🤔",
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    time: '2024-01-06T10:27:25.543210Z',
    id: 6,
    name: 'Fiona Adams',
    message: "Hello everyone! Who's up for a coding challenge today? 💪",
    avatar: 'https://i.pravatar.cc/150?img=16',
  },
  {
    time: '2024-01-06T10:30:50.135792Z',
    id: 7,
    name: 'George Clark',
    message: 'Hi Abinash! Coding late into the night again? 😄',
    avatar: 'https://i.pravatar.cc/150?img=17',
  },
  {
    time: '2024-01-06T10:33:15.246801Z',
    id: 8,
    name: 'Hannah Turner',
    message: "Hey there! What's the most challenging bug you've ever debugged? 🐞",
    avatar: 'https://i.pravatar.cc/150?img=18',
  },
  {
    time: '2024-01-06T10:35:40.987654Z',
    id: 9,
    name: 'Ian Foster',
    message: "Hello Abinash, what's new in your coding journey? Share some highlights! 🌟",
    avatar: 'https://i.pravatar.cc/150?img=19',
  },
  {
    time: '2024-01-06T10:38:05.876543Z',
    id: 10,
    name: 'Julia Ramirez',
    message: 'Hi Abinash! Long time no see. What project are you currently working on? 🚧',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    time: '2024-01-06T10:40:30.987654Z',
    id: 11,
    name: 'Kai Williams',
    message: 'Hey Abinash! Any cool tech discoveries lately? 🌐',
    avatar: 'https://i.pravatar.cc/150?img=21',
  },
  {
    time: '2024-01-06T10:42:55.654321Z',
    id: 12,
    name: 'Lily Chen',
    message: "Hello! Coding is like solving puzzles, isn't it? 🧩",
    avatar: 'https://i.pravatar.cc/150?img=22',
  },
  {
    time: '2024-01-06T10:45:20.765432Z',
    id: 13,
    name: 'Mike Davis',
    message: 'Hi Abinash! Do you prefer frontend or backend development? 🖥️',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    time: '2024-01-06T10:47:45.321098Z',
    id: 14,
    name: 'Nina Rodriguez',
    message: "Hey! What's your go-to coding snack? 🍕",
    avatar: 'https://i.pravatar.cc/150?img=24',
  },
]

function LiveChat() {
  const [messages, setMessages] = useState<MessageT[]>(sampleMessages)

  useEffect(() => {
    const pusher = new Pusher('6985392a5df45e560919', {
      cluster: 'ap2',
    })

    const channel = pusher.subscribe('chat-message')
    channel.bind('MessageSent', function (data: any) {
      console.log(data.message)
      setMessages((prev) => [...prev, data.message].slice(-MAX_MESSAGES_SIZE))
    })
  }, [])
  return (
    <div className=''>
      <div className='flex flex-col'>
        <div className='liveChat relative flex h-[67dvh] flex-col gap-4 overflow-auto pb-16'>
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
