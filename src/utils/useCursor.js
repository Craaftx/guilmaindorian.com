import React, { createContext, useContext } from "react"

const CursorContext = createContext()

export const CursorProvider = ({
  cursorPointerRef,
  cursorCircleRef,
  children,
}) => {
  return (
    <CursorContext.Provider value={{ cursorPointerRef, cursorCircleRef }}>
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => useContext(CursorContext)
