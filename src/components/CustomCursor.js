import React, { useEffect, useRef } from "react"

const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t
}

const CustomCursor = () => {
  const cursorPointer = useRef()
  const cursorCircle = useRef()

  useEffect(() => {
    let clientX = -100
    let clientY = -100

    window.addEventListener("mousemove", e => {
      clientX = e.clientX
      clientY = e.clientY
    })

    const initPointer = cursor => {
      const render = () => {
        cursor.style.transform = `translate(${clientX}px, ${clientY}px)`

        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    }

    const initCircle = circle => {
      let position = {
        x: 0,
        y: 0,
      }

      const render = () => {
        const x = lerp(position.x, clientX, 0.1)
        const y = lerp(position.y, clientY, 0.1)
        position = { x, y }

        circle.style.transform = `translate(${x}px, ${y}px)`
        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    }

    initPointer(cursorPointer.current)
    initCircle(cursorCircle.current)
  }, [])

  return (
    <>
      <div className="cursor cursor--pointer" ref={cursorPointer} />
      <div className="cursor cursor--circle" ref={cursorCircle} />
    </>
  )
}

export default CustomCursor
