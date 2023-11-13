export function Loading() {
  return (
    <div className='screen flex items-center justify-center'>
      <img src='/icons/other/loading.svg' className='w-10 invert' />
    </div>
  )
}

export function LoadingButton({ text = '' }: { text?: string }) {
  return (
    <div className='screen flex items-center justify-center gap-3 py-[1.15rem]'>
      <img src='/icons/other/loading.svg' className='w-4.5 invert' />
      <p className='text-xs'>{text}</p>
    </div>
  )
}
