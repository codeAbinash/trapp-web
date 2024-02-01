import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function OrderStatus() {
  const orderId = useParams().order_id

  useEffect(() => {
    console.log(orderId)
  }, [])

  return <div>index</div>
}
