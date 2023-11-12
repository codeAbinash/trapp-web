function LoginWith() {
  return (
    <div className='login-with flex w-full flex-col items-center justify-center gap-3'>
      <div className='flex w-full flex-row items-center justify-center'>
        <div className='h-[1px] w-full bg-white/20'></div>
        <span className='w-full text-center text-xs'>Continue with</span>
        <div className='h-[1px] w-full bg-white/20'></div>
      </div>

      <div className='flex gap-5'>
        <div>
          <img src='icons/social/facebook.webp' className='w-9 rounded-full' />
        </div>
        <div>
          <img src='icons/social/google.png' className='w-9 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default LoginWith
