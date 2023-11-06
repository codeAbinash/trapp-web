import { flushSync } from 'react-dom'
const CLICK_DELAY = 0

export default function transitions(callback: Function, delay = CLICK_DELAY) {
  // @ts-ignore
  if (!document.startViewTransition) {
    return function () {
      setTimeout(callback, delay)
    }
  }

  return function () {
    setTimeout(() => {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => callback())
      })
    }, delay)
  }
}
