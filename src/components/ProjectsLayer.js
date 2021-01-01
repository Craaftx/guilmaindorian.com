import React, { useEffect, useRef, useState } from "react"
import { useCursor } from "../utils/useCursor"
import SwipeIndicator from "./SwipeIndicator"

const ProjectCard = ({ index, project }) => {
  const [animationRunning, setAnimationRunning] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const cardRef = useRef()

  const mainImage = useRef()
  const glitch1 = useRef()
  const glitch2 = useRef()
  const glitch3 = useRef()
  const glitch4 = useRef()

  const animateCard = imageSrc => {
    cardRef.current.classList.add("project-card--animated")

    setTimeout(() => {
      glitch1.current.style.backgroundImage = `url(${imageSrc})`
    }, 2200)

    setTimeout(() => {
      glitch2.current.style.backgroundImage = `url(${imageSrc})`
    }, 2400)

    setTimeout(() => {
      glitch3.current.style.backgroundImage = `url(${imageSrc})`
    }, 2600)

    setTimeout(() => {
      glitch4.current.style.backgroundImage = `url(${imageSrc})`
    }, 3200)

    setTimeout(() => {
      mainImage.current.src = imageSrc
      cardRef.current.classList.remove("project-card--animated")
      setAnimationRunning(false)
    }, 4000)
  }

  const handleAnimation = isEnter => {
    if (isEnter && !animationRunning) {
      setAnimationRunning(true)
      animateCard(project.images[currentImageIndex])
      setCurrentImageIndex(
        currentImageIndex === project.images.length - 1
          ? 0
          : currentImageIndex + 1
      )
    }
  }

  return (
    <div className="project-card-wrapper">
      <div className="project-card" ref={cardRef}>
        <a
          className="project-card__content"
          href={project.link}
          ref={project.linkRef}
          onMouseEnter={() => handleAnimation(true)}
        >
          <div className="glitch">
            <img src={project.images[0]} alt="" ref={mainImage} />
            <div className="glitch__img" ref={glitch1} />
            <div className="glitch__img" ref={glitch2} />
            <div className="glitch__img" ref={glitch3} />
            <div className="glitch__img" ref={glitch4} />
          </div>
          <span className="number">{("0" + (index + 1)).slice(-2)}</span>
          <h2 className="title">{project.title}</h2>
          <span className="project-card__link">Visit</span>
        </a>
      </div>
    </div>
  )
}

const ProjectsLayer = () => {
  const { registerLink } = useCursor()

  const projects = [
    {
      title: "Codepen",
      link: "#",
      linkRef: useRef(),
      images: [
        "https://assets.codepen.io/2287220/codepenImage.png",
        "https://assets.codepen.io/2287220/portfolioImage.png",
        "https://assets.codepen.io/2287220/blogImage.png",
      ],
    },
    {
      title: "2019 Portfolio",
      link: "#",
      linkRef: useRef(),
      images: [
        "https://assets.codepen.io/2287220/portfolioImage.png",
        "https://assets.codepen.io/2287220/blogImage.png",
        "https://assets.codepen.io/2287220/codepenImage.png",
      ],
    },
    {
      title: "CSS Blog",
      link: "#",
      linkRef: useRef(),
      images: [
        "https://assets.codepen.io/2287220/blogImage.png",
        "https://assets.codepen.io/2287220/portfolioImage.png",
        "https://assets.codepen.io/2287220/codepenImage.png",
      ],
    },
  ]

  useEffect(() => {
    for (let index = 0; index < projects.length; index++) {
      registerLink(projects[index].linkRef)
    }
  }, [])

  return (
    <div className="project-layer">
      {projects.map((project, index) => (
        <ProjectCard key={index} index={index} project={project} />
      ))}
      <SwipeIndicator />
    </div>
  )
}

export default ProjectsLayer
