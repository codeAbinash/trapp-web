import Button from '../components/Button';
import Input from '../components/Input';
import InputTitle from '../components/InputTitle';
import Kichu from '../components/Kichu';

export default function Login() {
  function hi() {
    console.log('Hello');
  }
  const data = ['Chrome', 'FireFox'];
  return (
    <div className=' h-dvh bg-black p-5 text-white'>
      <div className='bottom-1 flex justify-center '>
        <img src='./vite.svg' alt='' className='h-40' />
      </div>
      <div className='mt-14'>
        <h1 className='text-2xl font-normal opacity-80'>Register</h1>
        <p className='pt-2 text-sm leading-5 opacity-50'>
          Create a new account and learn martial arts and more fighting skills{' '}
        </p>
      </div>
      <div className='pt-4'>
        <div>
          <InputTitle title='Username' />
          <Input placeHolder='Username' type='text' onChange={hi} />
        </div>
        <div>
          <InputTitle title='number' />
          <div className='flex items-stretch gap-4'>
            <div className='flex-1'>
              <Input placeHolder='Number' type='Number' onChange={hi} />
            </div>
            <div className='flex-none'>
              <Input placeHolder='Number' type='Number' onChange={hi} />
            </div>
          </div>
        </div>
      </div>
      <div className='pt-6'>
        <Button text='Register' onClick={hi} />
      </div>

      <div className='pt-8 text-center'>
        <p className='pt-4 text-sm leading-5 opacity-50'>Already have an account?</p>
        <Kichu onClick={hi} text='LOGIN' />
      </div>
    </div>
  );
}
