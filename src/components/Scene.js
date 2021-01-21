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

  const maxLayer = children.length - 1

  useEffect(() => {
    const resetWheelFired = setTimeout(() => setWheelFired(false), 600)
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
    <main className={`main ${isEntrance ? "entrance-animation" : ""}`}>
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
