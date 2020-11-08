const revealImage = (
  sceneRef,
  cursorCircleRef,
  textRef,
  image,
  width,
  height
) => {
  const sceneElement = sceneRef.current
  const cursorCircleElement = cursorCircleRef.current
  const textElement = textRef.current
  if (image) {
    sceneElement.style.perspective = "none"
    sceneElement.style.perspectiveOrigin = "unset"
    textElement.style.color = "transparent"
    cursorCircleElement.style.background = `url(${image})`
    cursorCircleElement.style.backgroundPosition = "center center"
    cursorCircleElement.style.backgroundSize = "cover"
    cursorCircleElement.style.height = height + "px"
    cursorCircleElement.style.width = width + "px"
    cursorCircleElement.style.top = `-${height / 2}px`
    cursorCircleElement.style.left = `-${width / 2}px`
    cursorCircleElement.style.zIndex = "-1"
    cursorCircleElement.style.border = "none"
    cursorCircleElement.style.borderRadius = "10px"
  } else {
    sceneElement.style = ""
    textElement.style = ""
    cursorCircleElement.style = ""
  }
}

const addRevealEvents = (item, textRef, cursorCircleRef, sceneRef) => {
  item.ref.current.addEventListener("mouseenter", () =>
    revealImage(
      sceneRef,
      cursorCircleRef,
      textRef,
      item.img,
      item.width,
      item.height
    )
  )
  item.ref.current.addEventListener("mouseleave", () =>
    revealImage(sceneRef, cursorCircleRef, textRef)
  )
}

export default addRevealEvents
