import Game from "./Game"

import React, { useEffect, useRef } from "react"
import { useCursor } from "../utils/useCursor"

const ContactLayer = () => {
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
    <>
      <div className="contact-content">
        <h2>
          Send me something{" "}
          <span className="contact-word">
            <span>stupid </span>
            <span>stupid </span>
            <span>stupid </span>
            <span>stupid </span>
            <span>stupid </span>
            <span>stupid</span>
          </span>
        </h2>
        <div className="sections">
          <div className="section section--social">
            <h3 className="section__title">On Social Medias</h3>
            <a
              href="https://www.linkedin.com/in/dorian-guilmain/"
              target="_blank"
              rel="noreferrer"
              ref={linkedInLink}
            >
              .in
            </a>
            <a
              href="https://twitter.com/Craaftx1"
              target="_blank"
              rel="noreferrer"
              ref={twitterLink}
            >
              .tw
            </a>
          </div>
          <div className="section section--mail">
            <h3 className="section__title">Or by mail</h3>
            <a href="mailto:hello@guilmaindorian.com" ref={mailLink}>
              hello@guilmaindorian.com
            </a>
          </div>
        </div>
      </div>
      <Game />
    </>
  )
}

export default ContactLayer
