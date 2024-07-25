import Button from '@/components/Button'
import { app } from '@/constants'
import ls from '@/lib/util'

export default function Shop() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center gap-8 p-6'>
      <h1 className='text-2xl font-bold'>Shop Now!</h1>
      <img src='/images/shop.png' alt='Shop' className='w-4/5' />
      <p className='text-center text-sm'>Shop for your favorite products.</p>
      <Button className='mt-3' onClick={() => window.open(app.shop_link + ls.get('token'), '_self')}>
        Shop Now
      </Button>
    </div>
  )
}
