// async function registerSW() {
//   if ('serviceWorker' in navigator) {
//     try {
//       const registration = navigator.serviceWorker.register('sw.js')
//       console.log('Service Worker Registered')
//     } catch (error) {
//       console.warn('Error Registering Service Worker')
//       console.log(error)
//     }
//   } else console.log('Service worker is not available for this device')
// }
// // registerSW()

// function absorbEvent_(event) {
//   var e = event || window.event
//   e.preventDefault && e.preventDefault()
//   e.stopPropagation && e.stopPropagation()
//   e.cancelBubble = true
//   e.returnValue = false
//   return false
// }


window.isApp = true
setTimeout(() => {
  if (window.isApp) {
    console.log('App Detected')
  } else {
    console.log('Not App')
    window.location.href = 'https://play.google.com/store/apps/details?id=com.trapp.app'
  }
}, 100)

// Disable Context Menu
// window.addEventListener('load', () => {
//   document.body.addEventListener('contextmenu', absorbEvent_)
// })
