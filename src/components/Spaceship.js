import React from "react"

const Spaceship = React.forwardRef((props, ref) => (
  <div className="spaceship" ref={ref} {...props}>
    <div className="body-front"></div>
    <div className="body-top"></div>
    <div className="body-right"></div>
    <div className="body-bottom"></div>
    <div className="body-left"></div>
    <div className="body-back"></div>
    <div className="fin">
      <div className="fin-front"></div>
      <div className="fin-top"></div>
      <div className="fin-right"></div>
      <div className="fin-bottom"></div>
      <div className="fin-left"></div>
      <div className="fin-back"></div>
    </div>
    <div className="right-wing">
      <div className="wing-front"></div>
      <div className="wing-top"></div>
      <div className="wing-right"></div>
      <div className="wing-bottom"></div>
      <div className="wing-left"></div>
      <div className="wing-back"></div>
    </div>
    <div className="left-wing">
      <div className="wing-front"></div>
      <div className="wing-top"></div>
      <div className="wing-right"></div>
      <div className="wing-bottom"></div>
      <div className="wing-left"></div>
      <div className="wing-back"></div>
    </div>
  </div>
))

export default Spaceship
