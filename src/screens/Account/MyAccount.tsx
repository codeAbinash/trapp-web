import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../Redux/profile'
import store from '../../Redux/store'
import Button from '../../components/Button'
import { Header } from '../../components/Header/Header'
import { LoadingButton } from '../../components/Loading'
import TapMotion from '../../components/TapMotion'
import Watermark from '../../components/Watermark'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import API, { authorizedHeader, formDataHeaders, getCurrentUser_f, getError } from '../../lib/api'
import icon from '../../lib/icons'
import { blank_fn, delayFn, userMessage } from '../../lib/util'
import { UserProfile, setProfileInfoLs } from '../Profile/utils'

async function updateLocalUserData() {
  const userProfileData = await getCurrentUser_f()
  if (userProfileData.status) {
    setProfileInfoLs(userProfileData.data)
    store.dispatch(setProfile(userProfileData.data as UserProfile))
  }
}

function ProfilePicture({
  imageUrl,
  onImageClick,
}: {
  imageUrl?: string
  onImageClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}) {
  return (
    <div className='relative mx-auto mb-4 mt-12 max-w-lg'>
      <TapMotion size='lg' className='mx-auto w-[45%]'>
        <img
          src={imageUrl}
          onClick={onImageClick}
          className='tap97 profile-picture bg-inputBg mx-auto aspect-square w-full rounded-full border border-white/50 bg-white/10 object-cover'
        />
      </TapMotion>
      <TapMotion
        size='sm'
        onClick={onImageClick}
        className='tap95 anim-edit-icon edit-button absolute left-[60%] top-[75%] aspect-square h-11 rounded-full bg-accent p-3 shadow-lg'
      >
        <img src={icon('edit.svg')} className='invert' />
      </TapMotion>
    </div>
  )
}
type InputProps = {
  placeholder: string
  pre_icon?: string
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  label?: string
  value?: string
}

export function Input(props: InputProps) {
  const {
    placeholder = 'Input Placeholder',
    pre_icon = icon('mobile_solid.svg'),
    type = 'text',
    onInput = blank_fn,
    label = 'Input Label',
    value = '',
  } = props

  return (
    <div>
      <p className='font-normMid pb-2 pl-1 text-xs text-neutral-500'>{label}</p>
      <div className='bg-inputBg flex items-center justify-center rounded-xl bg-white/10 pl-4'>
        <img src={pre_icon} className='flex w-6 opacity-30 invert' />
        <input
          type={type}
          placeholder={placeholder}
          className='font-normMid text-text/90 grow border-none bg-transparent px-3 py-4.5 pl-4 text-sm text-white outline-none'
          onInput={onInput}
          value={value}
        />
      </div>
    </div>
  )
}
type userUpdate = {
  name?: string
  email?: string
  profile_pic?: File
}

export default function MyAccount() {
  const profile: UserProfile = useSelector((state: any) => state.profile)
  const [isUpdating, setIsUpdating] = useState(false)
  const [name, setName] = useState(profile?.data?.name || '')
  const [email, setEmail] = useState(profile?.data?.email || '')
  const [profilePicture, setProfilePicture] = useState(profile?.data.profile_pic || '/images/other/pic.png')
  const phone = profile?.data?.phone || ''
  const code = profile?.data?.country_code || ''
  const pp = useRef<HTMLInputElement>(null)
  const { newPopup } = usePopupAlertContext()
  const navigate = useNavigate()

  const onChangeFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files
    const ppValidation = profilePicFileValidation(fileInput![0])
    if (ppValidation.error) return newPopup({ title: 'Invalid File', subTitle: ppValidation.message })
    setProfilePicture(URL.createObjectURL(fileInput![0]))
  }, [])

  const updateProfile = useCallback(async () => {
    setIsUpdating(true)
    const body: any = {} as userUpdate
    if (name) body.name = name.trim()
    if (email) body.email = email.trim()

    if (profilePicture !== profile?.data?.profile_pic) {
      const ppValidation = profilePicFileValidation(pp.current!.files![0])
      if (ppValidation.error) {
        newPopup({ title: 'Invalid File', subTitle: ppValidation.message })
        setIsUpdating(false)
        return
      }
      if (pp.current!.files![0]) body.profile_pic = pp.current!.files![0]
    }

    const formData = new FormData()
    for (const key in body) formData.append(key, body[key]!)

    const res = await fetch(API.user.current.update, {
      method: 'POST',
      headers: authorizedHeader(formDataHeaders),
      body: formData,
    })

    console.log(body)
    const data = await res.json()
    console.log(data)
    if (data.status) {
      await updateLocalUserData()
      setIsUpdating(false)
      newPopup({
        title: 'Profile Updated',
        subTitle: 'Your profile has been updated successfully.',
        action: [{ text: 'OK', onClick: () => navigate(-1) }],
      })
    } else {
      setIsUpdating(false)
      newPopup({ title: 'Error', subTitle: getError(data.errors) })
    }
  }, [name, email, profilePicture, isUpdating])

  return (
    <>
      <Header>
        <span className='font-[450]'>My Account</span>
      </Header>
      <div className='py-2'>
        <input
          type='file'
          className='hidden'
          ref={pp}
          onChange={onChangeFileSelect}
          accept='image/png, image/jpeg, image/jpg'
        />
        <ProfilePicture imageUrl={profilePicture} onImageClick={delayFn(() => pp.current?.showPicker())} />
        <div>
          <p className='text-center text-xl font-semibold'>{name}</p>
          <div className='mt-1 flex items-center justify-center gap-2'>
            <p className='anim-user-phone font-normMid text-sm text-neutral-500'>
              +{code} {phone}
            </p>
          </div>
        </div>

        <div className='mx-auto mt-5 flex max-w-lg flex-col gap-3 p-5 pt-0'>
          <Input
            placeholder='e.g. John'
            label='Your Name'
            pre_icon={icon('account_circle.svg')}
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='e.g. abc@gmail.com'
            label='Your Email'
            type='email'
            pre_icon={icon('at.svg')}
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          <div className='mt-3'>
            {isUpdating ? (
              <LoadingButton text='Updating Profile...' />
            ) : (
              <Button onClick={updateProfile}>Update Profile</Button>
            )}
          </div>
        </div>
      </div>
      <Watermark />
    </>
  )
}

function profilePicFileValidation(file: File | undefined | null): userMessage {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  const maxSize = 2 * 1024 * 1024
  console.log(file)
  if (file && !allowedTypes.includes(file.type))
    return {
      message: 'Invalid file type (only .png, .jpeg, .jpg)',
      error: true,
    }
  if (file && file.size > maxSize)
    return {
      message: 'Max File Size is 2MB',
      error: true,
    }
  return { message: '', error: false }
}
