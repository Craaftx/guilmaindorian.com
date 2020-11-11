import React, { createContext, useContext } from "react"

const CursorContext = createContext()

export const CursorProvider = ({
  cursorPointerRef,
  cursorCircleRef,
  registerLink,
  children,
}) => {
  return (
    <CursorContext.Provider
      value={{ cursorPointerRef, cursorCircleRef, registerLink }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => useContext(CursorContext)
