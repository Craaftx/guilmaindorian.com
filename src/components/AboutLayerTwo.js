import React, { useEffect, useRef } from "react"
import blinkingWhiteGuy from "../images/blinking-white-guy.mp4"
import buildingImg from "../images/building.jpg"
import javascriptImg from "../images/javascript.jpg"
import addRevealEvents from "../utils/reveals"
import { useCursor } from "../utils/useCursor"

const AboutLayerTwo = ({ sceneRef }) => {
  const blinkingWhiteGuyVideo = useRef()
  const blinkingWhiteGuyTrigger = useRef()
  const { cursorCircleRef } = useCursor()

  const webDeveloperReveal = {
    textRef: useRef(),
    items: [
      {
        title: "Javascript",
        ref: useRef(),
        img: javascriptImg,
        width: 500,
        height: 190,
      },
    ],
  }

  useEffect(() => {
    const webDeveloperTextRef = webDeveloperReveal.textRef

    for (let index = 0; index < webDeveloperReveal.items.length; index++) {
      addRevealEvents(
        webDeveloperReveal.items[index],
        webDeveloperTextRef,
        cursorCircleRef,
        sceneRef
      )
    }
    if (blinkingWhiteGuyTrigger.current) {
      blinkingWhiteGuyTrigger.current.addEventListener("mouseenter", () =>
        blinkingWhiteGuyVideo.current.play()
      )

      blinkingWhiteGuyVideo.current.addEventListener("ended", () => {
        blinkingWhiteGuyVideo.current.pause()
      })
    }
  })

  return (
    <div className="about-layer about-layer--2">
      <div className="card-wrapper">
        <div className="card">
          <img src={buildingImg} alt="Plants" />
          <div className="content">
            <h2 className="title">
              {" "}
              <b>Web </b>Developer ?
            </h2>
            <p className="description" ref={webDeveloperReveal.textRef}>
              Je développe depuis maintenant quelques années, principalement en{" "}
              <span
                className="reveal-image"
                ref={webDeveloperReveal.items[0].ref}
              >
                Javascript
              </span>{" "}
              que ce soit Back-End ou Front-End. Et moi non plus je sais pas
              pourquoi j'ai mis une image d'architecture.
            </p>
          </div>
        </div>
      </div>
      <div className="card-wrapper card-wrapper--right">
        <div className="card">
          <div className="card__video-wrapper">
            <video width="300px" height="351px" ref={blinkingWhiteGuyVideo}>
              <source src={blinkingWhiteGuy} type="video/mp4" />
            </video>
          </div>
          <div className="content">
            <h2 className="title">
              {" "}
              <b>MEMES</b> ADDICT{" "}
            </h2>
            <p className="description">
              I discovered CSS images through a @sashatran post and I
              immediately loved making them, with my imagination overflowing
              there was no shortage of ideas.{" "}
              <span className="reveal-image" ref={blinkingWhiteGuyTrigger}>
                CSS IS FUCKING SHIT{" "}
              </span>
              AND I LOVE THAT
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutLayerTwo
