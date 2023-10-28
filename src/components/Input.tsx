import { blank_fn } from '../constants';

export default function Input({
  placeHolder = 'Sample',
  type = 'text',
  onChange = blank_fn,
  className = '',
}: {
  placeHolder: string;
  type: string;
  onChange: any;
  className?: string;
}) {
  return (
    <div className='flex rounded-xl  bg-white/10 pl-5 text-sm font-normal '>
      <img src='./vite.svg' alt='' className='w-5 ' />
      <input
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        className={'w-full border-none bg-transparent p-4 outline-none ' + className}
      />
    </div>
  );
}
