import TapMotion from '@/components/TapMotion'
import { BadgeCheckIcon, GiftIcon, SendIcon, XIcon } from 'lucide-react'
import Pusher from 'pusher-js'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DrawerWrapper, ScrollToTop } from '../../App'
import { fetch_live_chat_f, getVideoDetails_f, live_chat_message_f } from '../../lib/api'
import { niceDate } from '../../lib/util'
import { useSubscriptionDrawer } from '../Home/HomeScreen/subscriptionDrawerContext'
import { UserProfile } from '../Profile/utils'
import { VideoDetails } from '../Video/components/VideoComponents'
import BackButton from './BackButton'
import SendGift from './GIft'
import VideoPlayer from './VideoPlayer'

export default function LiveVideo() {
  const { video_id } = useParams()
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(true)
  const [creator_id, setCreator_id] = useState<number | null>(null)
  const [isBackBtn, setShowBackButton] = useState(true)
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const isSubscribed = profile?.subscription_status?.status === 'active'
  const { setIsOpened } = useSubscriptionDrawer()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackButton(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  function setBackButtonVisibility() {
    if (isBackBtn) return
    setShowBackButton(true)
    setTimeout(() => {
      setShowBackButton(false)
    }, 5000)
  }

  function clickOnVideo() {
    setIsOpened(!isSubscribed)
    setBackButtonVisibility()
  }

  async function loadVideoDetails() {
    const res = await getVideoDetails_f(video_id!)
    if (!res.status) return
    setVideoDetails(res.data.data)
    setCreator_id(res.data.data.creator.id)
  }
  useEffect(() => {
    setVideoDetails(null)
    loadVideoDetails()
    setIsOpened(!isSubscribed)
  }, [])
  return (
    <>
      <ScrollToTop />
      <div
        className='fixed top-0 z-10 flex aspect-video w-full flex-col items-center justify-end bg-bg/80 pb-2 backdrop-blur-md'
        onMouseMove={setBackButtonVisibility}
        onTouchMove={setBackButtonVisibility}
        onTouchStart={setBackButtonVisibility}
        onClick={clickOnVideo}
      >
        <BackButton show={isBackBtn} />
        <VideoPlayerUI videoDetails={videoDetails} />
        <p className='mt-2 text-center text-[0.55rem] opacity-50'>
          Uploaded by {videoDetails?.creator.channel_name} - {niceDate(videoDetails?.created_at || '')}
        </p>
      </div>

      <div
        className='fixed w-full select-none'
        style={{
          marginTop: 'calc(100vw * 10 / 16)',
        }}
      >
        <div className={`${isLiveChatOpen ? 'hidden' : 'block'}`}>
          <VideoDetails videoDetails={videoDetails} setVideoDetails={setVideoDetails} />
          <div>
            <p className='mb-3 mt-2 px-5 text-base font-semibold'>Live Chat</p>
          </div>
          <LiveChatBox setIsLiveChatOpen={setIsLiveChatOpen} />
        </div>
        <div className={`${isLiveChatOpen ? 'block' : 'hidden'}`}>
          <LiveChatUi setIsLiveChatOpen={setIsLiveChatOpen} video_id={video_id} isLiveChatOpen={isLiveChatOpen} />
        </div>
      </div>
      <DrawerWrapper />
    </>
  )
}

function VideoPlayerUI({ videoDetails }: { videoDetails: VideoDetails | null }) {
  if (!videoDetails) return <></>
  return <VideoPlayer src={videoDetails?.hls_link || ''} />
}

function LiveChatBox({ setIsLiveChatOpen }: { setIsLiveChatOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const pic = profile?.data?.profile_pic || '/images/other/pic.png'
  const name = profile?.data?.name || 'Your Name'
  return (
    <TapMotion
      size='lg'
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
    </TapMotion>
  )
}

function LiveChatUi({
  isLiveChatOpen,
  setIsLiveChatOpen,
  video_id,
}: {
  isLiveChatOpen: boolean
  setIsLiveChatOpen: React.Dispatch<React.SetStateAction<boolean>>
  video_id: string | undefined
}) {
  return (
    <>
      <div className='w-full px-5'>
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
      <LiveChat video_id={video_id} isLiveChatOpen={isLiveChatOpen} />
    </>
  )
}

interface NormalMessage {
  id: number
  video_id: number
  user_id: number
  type: string
  name: string
  avatar: string
  message: string
  message_type: 'plain_text'
  sticker: null
  created_at: string
  updated_at: string
}

interface StickerMessage {
  id: number
  video_id: number
  user_id: number
  type: string
  name: string
  avatar: string
  message: null
  message_type: 'stickers'
  sticker: string
  created_at: string
  updated_at: string
}

function Message({ message }: { message: NormalMessage | StickerMessage }) {
  if (message.message_type === 'stickers')
    return (
      <div className='flex gap-4 pl-5 pr-5'>
        <img src={message.avatar} alt='' className='mt-2 h-8 w-8 rounded-full' />
        <div className='flex w-full flex-col py-3'>
          <span className='text-xs font-semibold'>
            {message.name}
            <MessageTime message={message} />
          </span>
          <img src={message.sticker} alt='' className='mt-3 h-20 w-20' />
        </div>
        <div className='text-sm'>{message.message}</div>
      </div>
    )

  if (message.type === 'creator')
    return (
      <div className='flex items-center gap-4 pl-5 pr-5'>
        <img src={message.avatar} alt='' className='h-8 w-8 rounded-full' />
        <div className='flex flex-col gap-1'>
          <div>
            <span className='flex items-center gap-1 text-xs font-semibold text-green-500'>
              Creator
              <BadgeCheckIcon height={13} width={13} className='mr-1 inline-block' strokeWidth={2.5} />
              <MessageTime message={message} />
            </span>
          </div>
          <div className='text-sm'>{message.message}</div>
        </div>
      </div>
    )

  return (
    <div className='flex items-center gap-4 pl-5 pr-5'>
      <img src={message.avatar} alt='' className='h-8 w-8 rounded-full' />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <div>
            <span className='text-xs font-semibold'>
              {message.name}
              <MessageTime message={message} />
            </span>
          </div>
        </div>
        <div className='text-sm'>{message.message}</div>
      </div>
    </div>
  )
}

function MessageTime({ message }: { message: NormalMessage | StickerMessage }) {
  return (
    <span className='pl-2 text-xs font-normal opacity-60'>
      {new Date(message.created_at).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
      })}
    </span>
  )
}

const MAX_MESSAGES_SIZE = 500

function LiveChat({ video_id, isLiveChatOpen }: { video_id: string | undefined; isLiveChatOpen: boolean }) {
  const [messages, setMessages] = useState<NormalMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const inputRef = useRef<null | HTMLInputElement>(null)
  const messageBoxRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (!messageBoxRef.current) return console.log('No message box')
    const scrollDiff =
      messageBoxRef.current?.scrollHeight - messageBoxRef.current?.scrollTop - messageBoxRef.current?.clientHeight
    if (scrollDiff < 300) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToBottomForce() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function loadLiveChatHistory() {
    if (!video_id) return
    const res = await fetch_live_chat_f(video_id)
    if (!res.status) return console.log('Error loading live chat')
    setMessages(res.data.data.reverse() || [])
    console.log(res.data.data)
    setTimeout(() => {
      scrollToBottomForce()
    }, 500)
  }

  useEffect(() => {
    if (!video_id) return

    const pusher = new Pusher('6985392a5df45e560919', {
      cluster: 'ap2',
    })

    const channel = pusher.subscribe(video_id.toString())
    channel.bind('MessageSent', function (data: any) {
      console.log(data)
      setMessages((prev) => [...prev, data.message].slice(-MAX_MESSAGES_SIZE))
    })
    channel.bind('CreMessageSent', function (data: any) {
      setMessages((prev) => [...prev, data.message].slice(-MAX_MESSAGES_SIZE))
    })
    channel.bind('StickerSent', function (data: any) {
      console.log(data)
      setMessages((prev) => [...prev, data.message].slice(-MAX_MESSAGES_SIZE))
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadLiveChatHistory()
  }, [])

  useEffect(() => {
    scrollToBottomForce()
  }, [isLiveChatOpen])

  async function sendMessage() {
    if (!video_id) return
    const msg = inputRef.current!.value
    if (!msg) return
    inputRef.current!.value = ''
    setIsSending(true)
    const res = await live_chat_message_f(msg, video_id!)
    if (!res.status) return
    console.log(res.data)
    setIsSending(false)
  }

  // async function autoTestMessages(count: number) {
  //   const res = await live_chat_message_f('Hello ' + count, video_id!)
  //   if (!res.status) return
  // }

  // useEffect(() => {
  //   let count = 0
  //   const timer = setInterval(() => {
  //     autoTestMessages(count++)
  //   }, 5000)
  //   return () => clearInterval(timer)
  // }, [])

  return (
    <div className='w-full select-auto'>
      <div className='flex w-full flex-col'>
        <div
          className='liveChat relative flex flex-col gap-4 overflow-auto'
          ref={messageBoxRef}
          style={{
            height: 'calc(100dvh - (100vw * 10 / 16))',
          }}
        >
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
          <div ref={messagesEndRef} className='w-full pb-32'></div>
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-3 bg-bg/80 p-4 py-2 pt-2.5 backdrop-blur-md'>
        <SendGift video_id={video_id}>
          <TapMotion className='rounded-full bg-color p-3.5'>
            <GiftIcon size={20} />
          </TapMotion>
        </SendGift>
        <div className='w-full'>
          <input
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage()
            }}
            type='text'
            placeholder='Write a message'
            className='w-full rounded-full border border-transparent bg-white/10 p-3 text-sm outline-none backdrop-blur-md focus:border-color/50'
          />
        </div>
        <TapMotion className='rounded-full bg-white/10 p-3.5' onClick={sendMessage}>
          {isSending ? (
            <img src='/icons/other/loading.svg' className='h-5 w-7 invert' />
          ) : (
            <SendIcon className='h-5 w-5' />
          )}
        </TapMotion>
      </div>
    </div>
  )
}
