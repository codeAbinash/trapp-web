import { useLocation } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Category } from '../../types'
import VideosByCat from './VideosByCat'

export default function Category() {
  const loc = useLocation()
  const category = loc.state as Category
  return (
    <div>
      <Header>
        <span className='font-[450]'>{category.title}</span>
      </Header>
      <VideosByCat cat_id={category.id} />
    </div>
  )
}
