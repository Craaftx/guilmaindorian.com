import React, { useEffect, useRef } from "react"
import { useCursor } from "../utils/useCursor"
import burningRockImg from "../images/burning-rock.jpg"
import blackRockImg from "../images/black-rock.jpg"
import wizardImg from "../images/wizard.jpg"
import spaceImg from "../images/space.jpg"
import pikachuImg from "../images/pikachu.jpg"
import addRevealEvents from "../utils/reveals"

const AboutLayer = ({ sceneRef }) => {
  const { cursorCircleRef } = useCursor()

  const spaceReveal = {
    textRef: useRef(),
    items: [
      {
        title: "burning-rock",
        ref: useRef(),
        img: burningRockImg,
        width: 400,
        height: 400,
      },
      {
        title: "black-rock",
        ref: useRef(),
        img: blackRockImg,
        width: 300,
        height: 300,
      },
    ],
  }

  const cssWizardReveal = {
    textRef: useRef(),
    items: [
      {
        title: "Pikachu",
        ref: useRef(),
        img: pikachuImg,
        width: 300,
        height: 300,
      },
    ],
  }

  useEffect(() => {
    const spaceTextRef = spaceReveal.textRef
    const cssWizardTextRef = cssWizardReveal.textRef

    for (let index = 0; index < spaceReveal.items.length; index++) {
      addRevealEvents(
        spaceReveal.items[index],
        spaceTextRef,
        cursorCircleRef,
        sceneRef
      )
    }

    for (let index = 0; index < cssWizardReveal.items.length; index++) {
      addRevealEvents(
        cssWizardReveal.items[index],
        cssWizardTextRef,
        cursorCircleRef,
        sceneRef
      )
    }
  })

  return (
    <div className="about-layer about-layer--1">
      <div className="card-wrapper">
        <div className="card">
          <img src={spaceImg} alt="Space" />
          <div className="content">
            <h2 className="title">
              {" "}
              <b>Space </b>Lover
            </h2>
            <p className="description" ref={spaceReveal.textRef}>
              A human on a rock turning around another{" "}
              <span className="reveal-image" ref={spaceReveal.items[0].ref}>
                burning rock{" "}
              </span>
              which turns around another{" "}
              <span className="reveal-image" ref={spaceReveal.items[1].ref}>
                black rock{" "}
              </span>{" "}
              all in a space vacuum incompatible with man. Despite our ego it's
              amazing because we are nothing in this universe
            </p>
          </div>
        </div>
      </div>
      <div className="card-wrapper card-wrapper--right">
        <div className="card">
          <img src={wizardImg} alt="Wizard" />
          <div className="content">
            <h2 className="title">
              {" "}
              CSS <b>Wizard </b>
            </h2>
            <p className="description" ref={cssWizardReveal.textRef}>
              I discovered CSS images through a @sashatran post and I
              immediately loved making them, with my imagination overflowing
              there was no shortage of ideas.{" "}
              <span className="reveal-image" ref={cssWizardReveal.items[0].ref}>
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

export default AboutLayer
