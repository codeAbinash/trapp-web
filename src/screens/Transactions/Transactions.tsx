import { SmallCoin } from '@/components/Coin'
import { Header } from '@/components/Header/Header'
import TapMotion from '@/components/TapMotion'
import { usePopupAlertContext } from '@/context/PopupAlertContext'
import { getTransactions_f } from '@/lib/api'
import icon from '@/lib/icons'
import transitions from '@/lib/transition'
import { useEffect, useRef, useState } from 'react'

export interface TransactionType {
  reference_id: string
  coins: string
  transaction_type: 'credit' | 'debit'
  description: string
  created_at: string
}

export default function Transactions() {
  const [page, setPage] = useState(1)
  const [transactions, setTransactions] = useState<TransactionType[] | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMorePageAvailable, setIsMorePageAvailable] = useState(true)

  async function loadTransactions(page: number) {
    setIsLoading(true)
    console.log('Loading Page ', page)
    const transactionStatus = await getTransactions_f(page)
    if (!transactionStatus.status) return

    if (transactionStatus.data.data.next_page_url === null) {
      setIsMorePageAvailable(false)
    }

    // Set Transactions
    const newTransactions = transactionStatus.data.data.data
    const allTransactions = transactions ? [...transactions, ...newTransactions] : newTransactions
    setTransactions(allTransactions)
    setIsLoading(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load More Data
          if (isLoading) return
          setIsLoading(true)
          loadTransactions(page + 1)
          setPage(page + 1)
        }
      },
      { threshold: 1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerTarget, isLoading])

  useEffect(() => {
    loadTransactions(page)
  }, [])

  return (
    <>
      <Header>
        <span className='font-[450]'>Transaction History</span>
      </Header>
      <div className='p-5 pt-0'>
        <div>
          <AllTransactions transactions={transactions} />
          <div className='mt-3 flex w-full items-center justify-center'>
            {isMorePageAvailable ? (
              isLoading ? (
                <div className='tap95 highlight-none font-normMid mt-5 animate-pulse rounded-full px-7 text-xs'>
                  <img src={icon('linear_loading_dots.svg')} className='h-10 opacity-50 dark:invert' />
                </div>
              ) : null
            ) : transactions?.length ? (
              <span className='font-normMid mt-5 text-xs opacity-50'>No More Transactions</span>
            ) : null}
          </div>
          {isMorePageAvailable && <div ref={observerTarget}></div>}
        </div>
      </div>
    </>
  )
}

function TransactionDetails({ transaction }: { transaction: TransactionType }) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='font-normMid'>{transaction.description}</span>
      <span>
        Transaction of <span className='font-normMid'>{transaction.coins} Trapp coins</span> on{' '}
        <span>{niceDate(transaction.created_at)}</span>. <span>Your Transaction Reference is </span>{' '}
        <span className='select-all text-blue-500'>{transaction.reference_id}</span>.{' '}
      </span>
    </div>
  )
}

function AllTransactions({ transactions }: { transactions: TransactionType[] | null }) {
  const { newPopup } = usePopupAlertContext()

  if (transactions === null) {
    return <TransactionsShimmer />
  }

  if (transactions.length === 0) {
    return <NoTransactions />
  }

  return (
    <div className='mt-3 flex min-h-[40dvh] flex-col gap-3'>
      {transactions?.map((transaction, index) => (
        <TapMotion
          size='lg'
          className='bg-inputBg flex items-center justify-center gap-3 rounded-3xl p-4 dark:bg-white/10'
          key={index}
          onClick={transitions(() => {
            newPopup({
              title: `Transaction Details`,
              subTitle: <TransactionDetails transaction={transaction} />,
              action: [
                {
                  text: 'OK',
                },
              ],
            })
          })}
        >
          <img
            src={
              transaction.transaction_type === 'credit' ? icon('transaction/receive.svg') : icon('transaction/send.svg')
            }
            className='w-8'
          />

          <div className='flex flex-grow flex-col gap-0.5'>
            <p className='font-420 text-sm'>{transaction.description}</p>
            <p className='text-xs opacity-70'>{niceDate(transaction.created_at)}</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2 pr-1 text-right'>
            <SmallCoin />
            <p
              className={`font-normMid text-xs ${
                transaction.transaction_type === 'credit' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.transaction_type === 'credit' ? '+' : '-'}
              {transaction.coins}
            </p>
          </div>
        </TapMotion>
      ))}
    </div>
  )
}

function NoTransactions() {
  return (
    <div className='w-full'>
      <img src={icon('no_data.jpg')} className='w-full dark:grayscale dark:invert' />
      <p className='font-normMid text-center text-xs opacity-50'>No Transactions</p>
    </div>
  )
}

function TransactionsShimmer() {
  return (
    <div className='flex min-h-[20dvh] items-end justify-center'>
      <p className='text-xs opacity-70'>Loading Transactions</p>
    </div>
  )
}

// function getStatusColor(status: 'pending' | 'failed' | 'success' | 'refund') {
//   if (status === 'pending') return 'text-yellow-500'
//   if (status === 'failed') return 'text-red-500'
//   if (status === 'success') return 'text-green-500'
//   if (status === 'refund') return 'text-red-500'
//   return 'text-red-500'
// }

function niceDate(date: string) {
  const d = new Date(date)
  return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}, ${d.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  )}`
}
