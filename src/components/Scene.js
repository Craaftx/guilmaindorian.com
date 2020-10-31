import React, { cloneElement, useEffect, useState } from "react"

export const Scene = ({ children }) => {
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0)
  const [wheelFired, setWheelFired] = useState(false)

  const maxLayer = children.length - 1

  useEffect(() => {
    const resetWheelFired = setTimeout(() => setWheelFired(false), 600)
    return () => {
      clearTimeout(resetWheelFired)
    }
  }, [wheelFired])

  const handleWheel = e => {
    e.preventDefault()
    e.stopPropagation()
    if (!wheelFired) {
      setWheelFired(true)
      // Scroll Up
      if (e.deltaY > 0 && currentLayerIndex - 1 >= 0) {
        setCurrentLayerIndex(currentLayerIndex - 1)
      }
      // Scroll down
      if (e.deltaY < 0 && currentLayerIndex + 1 <= maxLayer) {
        setCurrentLayerIndex(currentLayerIndex + 1)
      }
    }
  }

  children = children.map((child, index) => {
    return cloneElement(child, {
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
    })
  })

  return (
    <div className="scene" onWheel={e => handleWheel(e)}>
      {children}
    </div>
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
