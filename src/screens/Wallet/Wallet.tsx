import Button from '@/components/Button'
import { Header } from '@/components/Header/Header'

export default function Wallet() {
  return (
    <>
      <Header>
        <span className='font-[450]'>Your Wallet</span>
      </Header>
      <div className='px-5'>
        <p className='mb-4 mt-3 text-[1.7rem]'>
          <span className='opacity-70'>Your,</span> Wallet
        </p>
        <div className='rounded-3xl border border-white/20 bg-white/10 p-5'>
          <p>Wallet Balance</p>
          <div className='mt-1.5 flex items-center gap-3'>
            <Coin />
            <p className='text-[2.5rem]'>200</p>
          </div>
        </div>

        <div>
          <p className='mb-3 mt-5 text-[1.125rem] font-medium'>Add Coins</p>
          <div className='flex flex-col gap-3.5'>
            <AddCoinBox count={100} price={10} />
            <AddCoinBox count={250} price={20} />
            <AddCoinBox count={500} price={40} />
            {/* <AddCoinBox count={1000} price={80} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

function AddCoinBox({ count, price }: { count: number; price: number }) {
  return (
    <div className='flex justify-between rounded-[1.25rem] border border-white/20 bg-white/10 p-4'>
      <div className='flex items-center gap-4'>
        <Coin />
        <p>
          <span className='font-medium'>{count}</span> Trapp Coins
        </p>
      </div>
      <div>
        <Button className='rounded-full bg-color px-7 py-2.5 text-white/90'>
          <span className='font-medium'>${price}</span>
        </Button>
      </div>
    </div>
  )
}

function Coin() {
  return (
    <img
      src='/AppIcons/full.svg'
      className='aspect-square w-10 rounded-full border border-color/20 bg-color/20 p-1.5'
    />
  )
}
export function SmallCoin() {
  return (
    <img src='/AppIcons/full.svg' className='aspect-square w-7 rounded-full border border-color/20 bg-color/20 p-1' />
  )
}
