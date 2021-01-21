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
    <div className="contact-layer">
      <div className="content">
        <h2 className="big-title">
          Send me something{" "}
          <span className="contact-word">
            <span>stupid </span>
            <span>stupid </span>
            <span>imaginative </span>
            <span>funny </span>
            <span>interessing </span>
            <span>awesome</span>
          </span>
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
      <div className="business-card__wrapper">
        <div className="business-card__masks">
          <div className="mask mask--1" />
          <div className="mask mask--2" />
          <div className="mask mask--3" />
        </div>
        <div className="business-card__svg">
          <svg
            viewBox="0 0 2008 1300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2008 0H0V1300H2008V0ZM903.85 592.575L1004 534.781L1104.15 592.575V708.162L1004 765.955L903.85 708.162V592.575Z"
              fillRule="evenodd"
              clipRule="evenodd"
              className="business-card__svg__background"
            />
            <path
              d="M909.85 704.697V596.04L1004 541.709L1098.15 596.04V704.697L1004 759.028L909.85 704.697Z"
              stroke="#644ED1"
              strokeWidth="12"
              className="business-card__svg__logo-middle"
            />
            <path
              d="M804.85 765.289V656.122L892.767 605.388V816.023L804.85 765.289Z"
              stroke="#644ED1"
              strokeWidth="12"
              className="business-card__svg__logo-bottom-left"
            />
            <path
              d="M804.85 636.67V542.882L886.113 589.776L804.85 636.67Z"
              stroke="#644ED1"
              strokeWidth="12"
              className="business-card__svg__logo-middle-left"
            />
            <path
              d="M892.767 574.164L815.262 529.439L892.767 484.713V574.164Z"
              stroke="#644ED1"
              strokeWidth="12"
              className="business-card__svg__logo-top-left"
            />
            <path
              d="M909.616 825.746V724.014L1001 776.749L1004 778.48L1007 776.749L1112 716.157L1115 714.425V710.96V589.776V586.311L1112 584.579L1007 523.987L1004 522.257L1001 523.987L909.616 576.722V474.99L1004 420.525L1203.15 535.448V765.289L1004 880.212L909.616 825.746Z"
              stroke="#644ED1"
              strokeWidth="12"
              className="business-card__svg__logo-right"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ContactLayer
