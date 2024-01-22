import Button from '@/components/Button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer'
import { useEffect, useState } from 'react'
import { getStickers_f } from '@/lib/api'
import TapMotion from '@/components/TapMotion'
import { SmallCoin, VerySmallSmallCoin } from '@/components/Coin'

export interface Sticker {
  name: string
  id: number
  price: string
  sticker_src: string
}
export default function SendGift({ children }: { children: React.ReactNode }) {
  const [stickerList, setStickerList] = useState<Sticker[]>([])
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null)
  async function loadStickers() {
    const res = await getStickers_f()
    console.log(res.data.data)
    if (!res.status) return
    setStickerList(res.data.data)
    if (res.data.data.length > 0) setCurrentSticker(res.data.data[0])
  }
  useEffect(() => {
    loadStickers()
  }, [])

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
                <span>4567</span>
              </div>
            </div>
            <div className='grid max-h-[50dvh] w-full grid-cols-4 gap-2 overflow-y-auto p-4'>
              {stickerList.map((sticker) => (
                <Sticker
                  key={sticker.id}
                  sticker={sticker}
                  onClick={() => setCurrentSticker(sticker)}
                  isSelected={currentSticker?.id === sticker.id}
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
              <Button disabled={currentSticker === null} onClick={() => {}}>
                Send
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function Sticker({ sticker, onClick, isSelected }: { sticker: Sticker; onClick: () => void; isSelected: boolean }) {
  return (
    <TapMotion
      size='lg'
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-color border-color/10 ${
        isSelected ? 'bg-color/30' : 'bg-color/10'
      } p-2.5`}
    >
      <div className=''>
        <img src={sticker.sticker_src} alt='' className='w-full' onClick={onClick} />
      </div>
      <div className='just ify-center flex items-center gap-1 pr-2 text-sm'>
        <VerySmallSmallCoin />
        <span>{sticker.price}</span>
      </div>
    </TapMotion>
  )
}
