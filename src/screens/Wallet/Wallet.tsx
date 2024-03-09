import Button from '@/components/Button'
import { Coin } from '@/components/Coin'
import { Header } from '@/components/Header/Header'
import { buyCoins_f, getCoinsList_f } from '@/lib/api'
import { nFormatter } from '@/lib/util'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserProfile, updateLocalUserData } from '../Profile/utils'

export interface Price {
  id: number
  coins: number
  price: number
  created_at: string
  updated_at: string
}

export default function Wallet() {
  const [prices, setPrices] = useState<Price[] | null>(null)
  const profile: UserProfile = useSelector((state: any) => state.profile)

  async function loadPrices() {
    const res = await getCoinsList_f()
    if (!res) return
    console.log(res.data.coins_bundle)
    setPrices(res.data.coins_bundle)
  }
  useEffect(() => {
    updateLocalUserData()
  }, [])

  useEffect(() => {
    loadPrices()
  }, [])

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
            <p className='text-[2.5rem]'>{profile.data.coins}</p>
          </div>
        </div>

        <div className='pb-10'>
          <p className='mb-3 mt-5 text-[1.125rem] font-medium'>Add Coins</p>
          <div className='flex flex-col gap-3.5'>
            {prices === null && Array.from(Array(4)).map((_, i) => <AddCoinBoxSkeleton key={i} />)}
            {prices?.map((price) => (
              <AddCoinBox key={price.id} count={price.coins} price={price.price} id={price.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function AddCoinBox({ count, price, id }: { count: number; price: number; id: number }) {
  const [loading, setLoading] = useState(false)

  async function buyCoin() {
    setLoading(true)
    const res = await buyCoins_f(id.toString())
    if (!res) return
    if (res?.data?.payment_link) window.open(res.data.payment_link, '_blank')
    setLoading(false)
  }

  return (
    <div className='flex justify-between rounded-[1.25rem] border border-white/20 bg-white/10 p-4'>
      <div className='flex items-center gap-4'>
        <Coin />
        <p>
          <span className='font-medium'>{nFormatter(count)}</span> Trapp Coins
        </p>
      </div>
      <div>
        <Button className='rounded-full bg-color px-7 py-2.5 text-white/90' onClick={buyCoin} disabled={loading}>
          {loading ? (
            <img src='/icons/other/loading.svg' className='h-5 w-5 invert' />
          ) : (
            <span className='font-medium'>${nFormatter(price)}</span>
          )}
        </Button>
      </div>
    </div>
  )
}

function AddCoinBoxSkeleton() {
  return (
    <div className='flex animate-pulse justify-between rounded-[1.25rem] border border-white/20 bg-white/10 p-4'>
      <div className='flex items-center gap-4 opacity-0'>
        <Coin />
      </div>
    </div>
  )
}
