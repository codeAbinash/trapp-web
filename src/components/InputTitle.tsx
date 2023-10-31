export default function InputTitle({ title = 'Sample' }: { title: string }) {
  return (
    <div className='flex flex-col'>
      <h1 className='pb-2 pl-1 pt-5 text-xs font-medium '>{title}</h1>
    </div>
  )
}
