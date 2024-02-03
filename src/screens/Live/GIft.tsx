import Button from '@/components/Button'
import { SmallCoin, VerySmallSmallCoin } from '@/components/Coin'
import TapMotion from '@/components/TapMotion'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer'
import { usePopupAlertContext } from '@/context/PopupAlertContext'
import { getStickers_f, send_sticker_f } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserProfile, updateLocalUserData } from '../Profile/utils'

function SendStickerUI({ sticker, video_id }: { sticker: Sticker; video_id: string | undefined }) {
  const [isSending, setIsSending] = useState(false)

  const { setPopups, newPopup } = usePopupAlertContext()

  async function send() {
    if (video_id === undefined) return
    setIsSending(true)
    const res = await send_sticker_f(sticker.id, video_id)
    if (!res.status) newPopup({ title: 'Error', subTitle: res.message })
    setIsSending(false)
    updateLocalUserData()
    setTimeout(() => {
      setPopups([])
    }, 3000)
  }

  useEffect(() => {
    send()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <img src={sticker.sticker_src} alt='' className='w-1/2' />
      <p className='text-lg'>
        {isSending ? (
          <span className='animate-pulse'>Sending Sticker</span>
        ) : (
          <span className='text-green-500'>Gifted Successfully</span>
        )}
      </p>
      <p className='text-base font-medium text-red-500'>Thank You ❤️</p>
    </div>
  )
}

export interface Sticker {
  name: string
  id: string
  price: string
  sticker_src: string
}
export default function SendGift({ children, video_id }: { children: React.ReactNode; video_id: string | undefined }) {
  const [stickerList, setStickerList] = useState<Sticker[]>([])
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null)
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const { newPopup } = usePopupAlertContext()

  async function loadStickers() {
    const res = await getStickers_f()
    if (!res.status) return
    setStickerList(res.data.data)
    // if (res.data.data.length > 0) {
    //   // setCurrentSticker(res.data.data[0])
    // }
  }
  useEffect(() => {
    loadStickers()
  }, [])

  function sendSticker() {
    if (currentSticker === null) return
    newPopup({
      title: 'Send this sticker?',
      subTitle: (
        <div className='flex flex-col items-center gap-2 pt-5'>
          <img src={currentSticker.sticker_src} alt='' className='w-1/2' />
          <div className='flex'>
            <p className='flex'>Are you sure you want to send this sticker for {currentSticker.price} coins?</p>
          </div>
        </div>
      ),
      action: [
        {
          text: 'Yes',
          className: 'text-green-500',
          onClick: async () => {
            setTimeout(() => {
              newPopup({
                title: '',
                subTitle: <SendStickerUI sticker={currentSticker} video_id={video_id} />,
                action: [],
              })
            }, 500)
          },
        },
        { text: 'No' },
      ],
    })
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='bg-black text-white outline-none'>
        <div className='mx-auto w-full max-w-sm'>
          <div className='mt-3 flex flex-col gap-3 p-2'>
            <div className='flex w-full items-center justify-between px-2'>
              <div className='flex items-center gap-2'>
                <span className='text-xl font-semibold'>Gifts</span>
              </div>
              <div className='flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white/10 p-2 pr-4'>
                <SmallCoin />
                <span>{profile.data.coins}</span>
              </div>
            </div>
            <div className='grid max-h-[50dvh] w-full grid-cols-4 gap-2 overflow-y-auto p-4'>
              {stickerList.map((sticker) => (
                <Sticker
                  key={sticker.id}
                  sticker={sticker}
                  onClick={() => setCurrentSticker(sticker)}
                  isSelected={currentSticker?.id === sticker.id}
                  disabled={Number(sticker.price) > Number(profile.data.coins)}
                />
              ))}
            </div>
            {stickerList.length === 0 && (
              <div className='flex h-64 w-full items-center justify-center'>
                <p className='text-lg font-semibold'>No Stickers</p>
              </div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={currentSticker === null} onClick={sendSticker}>
                Send
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function Sticker({
  sticker,
  onClick,
  isSelected,
  disabled,
}: {
  sticker: Sticker
  onClick: () => void
  isSelected: boolean
  disabled: boolean
}) {
  return (
    <TapMotion
      size='lg'
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-color border-color/10 p-2.5 ${
        isSelected ? 'bg-color/30' : 'bg-color/10'
      } 
      ${disabled ? 'opacity-50' : ''}
      `}
    >
      <div className=''>
        <img
          src={sticker.sticker_src}
          alt=''
          className='w-full'
          onClick={() => {
            if (disabled) return
            onClick()
          }}
        />
      </div>
      <div className='just ify-center flex items-center gap-1 pr-2 text-sm'>
        <VerySmallSmallCoin />
        <span>{sticker.price}</span>
      </div>
    </TapMotion>
  )
}
