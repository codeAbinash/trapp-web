export default function Profile() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img src='/images/other/pic.png' className='mt-16 w-2/5 max-w-xs rounded-full border-2 border-white/50' />
        <p className='text-xl font-[450]'>Leonardo Silva</p>
        <div className='tap97 mt-2 flex items-center justify-center rounded-full bg-accent px-3 py-1'>
          <img src='/icons/other/star.svg' className='h-3.5' />
          <p className='ml-1.5 pt-[0.07rem] text-sm leading-tight'>Premium</p>
          <img src='/icons/other/arrow.svg' className='ml-2.5 h-2.5' />
        </div>
      </div>
    </div>
  )
}
