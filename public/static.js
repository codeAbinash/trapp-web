function absorbEvent_(event) {
  var e = event || window.event
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.cancelBubble = true
  e.returnValue = false
  return false
}

window.addEventListener('load', () => {
  document.body.addEventListener('contextmenu', absorbEvent_)
})
