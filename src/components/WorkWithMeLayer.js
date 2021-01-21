import Game from "./Game"

import React, { useEffect, useRef } from "react"
import { useCursor } from "../utils/useCursor"
import SwipeIndicator from "./SwipeIndicator"

const WorkWithMeLayer = () => {
  const { registerLink } = useCursor()
  const mailLink = useRef()
  const twitterLink = useRef()
  const linkedInLink = useRef()

  useEffect(() => {
    registerLink(mailLink)
    registerLink(twitterLink)
    registerLink(linkedInLink)
  }, [])

  return (
    <div className="workwithme-layer with-perspective-layer">
      <div className="content">
        <h2 className="big-title">
          How about <span className="stroked">work together ?</span>
        </h2>
        <div className="sections">
          <div className="section section--social">
            <h3 className="section__title">On Social Medias</h3>
            <a
              href="https://www.linkedin.com/in/dorian-guilmain/"
              target="_blank"
              className="small-title"
              rel="noreferrer"
              ref={linkedInLink}
            >
              .in
            </a>
            <a
              href="https://twitter.com/Craaftx1"
              target="_blank"
              className="small-title"
              rel="noreferrer"
              ref={twitterLink}
            >
              .tw
            </a>
          </div>
          <div className="section section--mail">
            <h3 className="section__title">Or by mail</h3>
            <a
              href="mailto:hello@guilmaindorian.com"
              className="small-title"
              ref={mailLink}
            >
              hello@guilmaindorian.com
            </a>
          </div>
        </div>
      </div>
      <div className="perspective-scene">
        <Game />
      </div>
      <SwipeIndicator />
    </div>
  )
}

export default WorkWithMeLayer
