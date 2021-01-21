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
    const newLinkArray = links.push(linkRef)
    setLinks(newLinkArray)
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
      for (let index = 0; index < links.length; index++) {
        links[index].current.addEventListener("mouseenter", handleMouseEnter)
        links[index].current.addEventListener("mouseleave", handleMouseLeave)
      }
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
        <svg
          width="201"
          height="232"
          viewBox="0 0 201 232"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 169.915V61.2584L100.15 6.92735L194.301 61.2584V169.915L100.15 224.247L6 169.915Z"
            stroke="#ffffff"
            strokeWidth="12"
          />
        </svg>
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
