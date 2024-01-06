import { BadgeCheckIcon } from 'lucide-react'

const VerifiedChannelNames = ['abinash karmakar', 'codeAbinash', 'sudipto bain', 'sujal tiwari', 'codex india']

export default function ChannelName({
  channel_name,
  className,
}: {
  channel_name: string | undefined
  className?: string
}) {
  if (!channel_name) return 'Loading..'

  if (VerifiedChannelNames.includes(channel_name)) {
    return (
      <div className={`flex items-center ${className}`}>
        <p>{channel_name}</p>
        <BadgeCheckIcon
          strokeWidth={2}
          className='text-blue-400'
          style={{
            width: '1.2em',
            height: '1.2em',
            marginLeft: '0.4em',
          }}
        />
      </div>
    )
  }

  return <p className='text-sm font-medium'>{channel_name}</p>
}
