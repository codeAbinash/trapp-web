import { useEffect, useState } from 'react'
import { getCategories_f } from '../../../lib/api'
import { useNavigate } from 'react-router-dom'
import { Category } from '../../../types'

export default function Categories() {
  const [catagories, setCatagories] = useState<Category[] | null>(null)
  const navigate = useNavigate()
  async function loadCatagories() {
    const res = await getCategories_f()
    if (res.status) setCatagories(res.data.data)
  }

  useEffect(() => {
    loadCatagories()
  }, [])

  return (
    <div className='mx-auto max-w-4xl'>
      <div className='p-5'>
        <p className='text-lg font-[450]'>Catagories</p>
      </div>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {catagories === null ? (
          <>
            <CategoryShimmer />
            <CategoryShimmer />
            <CategoryShimmer />
            <CategoryShimmer />
            <CategoryShimmer />
          </>
        ) : (
          catagories?.map((category) => (
            <div
              key={category.id}
              className='tap99 bg-inputBg relative flex aspect-square w-[26%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-3 shadow-sm first:ml-5 last:mr-5'
              onClick={() =>
                navigate(`/category/${category.id}`, {
                  state: category,
                })
              }
            >
              <img className='h-full w-full shrink-0 object-cover' src={category.image} />
              <p className='absolute bottom-0 left-0 right-0 line-clamp-1 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-6 text-center text-sm'>
                {category.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function CategoryShimmer() {
  return (
    <div className='tap99 bg-inputBg relative flex aspect-square w-[26%] max-w-[150px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-sm first:ml-5 last:mr-5'>
      <p className='absolute bottom-0 left-0 right-0 line-clamp-1 bg-gradient-to-t from-black/80 to-transparent pb-1.5 pt-6 text-center text-sm'></p>
    </div>
  )
}
