export default function Profile() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-5'>
        <img src='/images/other/pic.png' className='mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50' />
        <p className='text-2xl font-[450]'>Leonardo Silva</p>
        <div className='tap97 flex items-center justify-center rounded-full bg-accent px-3 py-1'>
          <img src='/icons/other/star.svg' className='h-3.5' />
          <p className='text ml-1.5'>Premium</p>
          <img src='/icons/other/arrow.svg' className='ml-3 h-3' />
        </div>
      </div>
    </div>
  )
}
