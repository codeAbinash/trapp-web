import Button from '@/components/Button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer'
import { SmallCoin } from '../Wallet/Wallet'

export default function SendGift({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='bg-black text-white outline-none'>
        <div className='mx-auto w-full max-w-sm'>
          <div className='mt-3 flex flex-col gap-7 p-2'>
            <div className='flex w-full items-center justify-between px-2'>
              <div className='flex items-center gap-2'>
                <span className='text-xl font-semibold'>Gifts</span>
              </div>
              <div className='flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white/10 p-2 pr-4'>
                <SmallCoin />
                <span>4567</span>
              </div>
            </div>
            <div className='flex h-64 w-full items-center justify-center'>All Gifts List</div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={true}>Send</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
