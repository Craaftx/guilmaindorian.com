import React, { useEffect, useRef, useState } from "react"
import { CursorProvider } from "../utils/useCursor"
import CircleType from "circletype"

const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t
}

const CustomCursor = ({ children }) => {
  const [links, setLinks] = useState([])
  const cursorPointer = useRef()
  const cursorCircle = useRef()
  const cursorText = useRef()

  const registerLink = linkRef => {
    setLinks([...links, linkRef])
  }

  const handleMouseEnter = () => {
    cursorCircle.current.classList.add("cursor--circle--link")
  }

  const handleMouseLeave = () => {
    cursorCircle.current.classList.remove("cursor--circle--link")
  }

  useEffect(() => {
    const circleType = new CircleType(cursorText.current)
    circleType.radius(44)
  }, [])

  useEffect(() => {
    if (links) {
      links.map(item => {
        item.current.addEventListener("mouseenter", handleMouseEnter)
        item.current.addEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [links])

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
    <CursorProvider
      cursorCircleRef={cursorCircle}
      cursorPointerRef={cursorPointer}
      registerLink={registerLink}
    >
      <div className="cursor cursor--pointer" ref={cursorPointer} />
      <div className="cursor cursor--circle" ref={cursorCircle}>
        <div className="cursor--circle__container">
          <span className="cursor--circle__text" ref={cursorText}>
            Visit link
          </span>
        </div>
      </div>
      {children}
    </CursorProvider>
  )
}

export default CustomCursor
