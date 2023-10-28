import { blank_fn } from '../constants';

export default function Button({ text = 'Sample Button', onClick = blank_fn }: { text?: string; onClick: any }) {
  return (
    <button
      className='highlight-transparent tap99 w-full select-none rounded-xl bg-accent p-4 text-sm font-medium text-white'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
