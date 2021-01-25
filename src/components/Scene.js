import React, { cloneElement, useEffect, useState } from "react"

const Background = ({ maxLayer, layer }) => {
  const strength = maxLayer - layer
  return (
    <div
      className="scene-background"
      style={{
        transform: `translate(-50%, -50%) rotate(${
          strength * 4
        }deg) scale(1.${strength})`,
        opacity: `0.${strength === 0 ? 9 : 10 - strength}`,
      }}
    />
  )
}

export const Scene = ({ children, sceneRef }) => {
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0)
  const [wheelFired, setWheelFired] = useState(false)
  const [isEntrance, setIsEntrance] = useState(true)

  const [yPosition, setYPosition] = useState(50)
  const [oldYPosition, setOldYPosition] = useState(50)

  const [xPosition, setXPosition] = useState(50)
  const [oldXPosition, setOldXPosition] = useState(50)

  const [touchStartLocation, setTouchStartLocation] = useState({
    xPosition: null,
    yPosition: null,
  })

  const handleTouchStart = e => {
    //touch start events give a list of touches for multiple fingers.
    const firstTouchEvent = e.touches[0]
    const location = {
      xPosition: firstTouchEvent.clientX, //get where the touch happened
      yPosition: firstTouchEvent.clientY,
    }
    setTouchStartLocation(location)
  }

  const handleTouchEnd = e => {
    //on touch end, the fingers change to changedTouches
    const firstTouchEvent = e.changedTouches[0]
    const location = {
      x: firstTouchEvent.clientX, //get the location of the end of the touch
      y: firstTouchEvent.clientY,
    }
    const differences = {
      x: touchStartLocation.xPosition - location.x, //find the difference from the start to the end touch
      y: touchStartLocation.yPosition - location.y,
    }
    const newYPosition = yPosition + -1 * differences.y * 0.05 //.05 to reduce the distance of the touch.
    const newXPosition = xPosition + -1 * differences.x * 0.05

    if (Math.abs(newXPosition - oldXPosition) < 2) {
      // Scroll Up
      if (newYPosition > oldYPosition && currentLayerIndex - 1 >= 0) {
        setCurrentLayerIndex(currentLayerIndex - 1)
      }
      // Scroll down
      if (newYPosition < oldYPosition && currentLayerIndex + 1 <= maxLayer) {
        setCurrentLayerIndex(currentLayerIndex + 1)
      }
    }
    setYPosition(newYPosition)
    setOldYPosition(newYPosition)
    setXPosition(newXPosition)
    setOldXPosition(newXPosition)
  }

  const maxLayer = children.length - 1

  useEffect(() => {
    const resetWheelFired = setTimeout(() => setWheelFired(false), 700)
    return () => {
      clearTimeout(resetWheelFired)
    }
  }, [wheelFired])

  const handleEntrance = () => {
    const ANIMATION_DELAY = 6500
    setTimeout(() => {
      setIsEntrance(false)
    }, ANIMATION_DELAY)
  }

  useEffect(() => {
    handleEntrance()
  }, [])

  const handleWheel = event => {
    event.preventDefault()
    event.stopPropagation()
    if (!wheelFired) {
      setWheelFired(true)
      // Scroll Up
      if (event.deltaY < 0 && currentLayerIndex - 1 >= 0) {
        setCurrentLayerIndex(currentLayerIndex - 1)
      }
      // Scroll down
      if (event.deltaY > 0 && currentLayerIndex + 1 <= maxLayer) {
        setCurrentLayerIndex(currentLayerIndex + 1)
      }
    }
  }

  children = children.map((child, index) => {
    return (
      <React.Fragment key={index}>
        {cloneElement(child, {
          isActive: index === currentLayerIndex,
          isNext:
            children[currentLayerIndex + 1] && index - 1 === currentLayerIndex
              ? true
              : false,
          isPrevious:
            children[currentLayerIndex - 1] && index + 1 === currentLayerIndex
              ? true
              : false,
          index,
        })}
      </React.Fragment>
    )
  })

  return (
    <main
      className={`main ${isEntrance ? "entrance-animation" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Background maxLayer={maxLayer} layer={currentLayerIndex} />
      <div ref={sceneRef} className="scene" onWheel={e => handleWheel(e)}>
        {children}
      </div>
    </main>
  )
}

export const Layer = ({ index, isActive, isNext, isPrevious, children }) => {
  const classNames = `layer layer-${index} ${isActive ? "active" : ""} ${
    isNext ? "next" : ""
  } ${isPrevious ? "previous" : ""}`

  return (
    <div key={index} className={classNames}>
      {children}
    </div>
  )
}
