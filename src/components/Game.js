import React, { useEffect, useRef } from "react"
import { useCursor } from "../utils/useCursor"
import { HeartIcon, LeftArrowIcon, RightArrowIcon } from "./Icons"
import Spaceship from "./Spaceship"

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min
}

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

const getRandomAxis = () => {
  const random = getRandomInt(7)
  let direction = 0
  switch (random) {
    case 0:
      direction = 0
      break
    case 1:
      direction = 1
      break
    case 2:
      direction = -1
      break
    case 3:
      direction = 0
      break
    case 4:
      direction = 1
      break
    case 6:
      direction = -1
      break
    default:
      break
  }
  return direction
}

const Game = () => {
  const { cursorPointerRef, cursorCircleRef } = useCursor()

  const disableCursor = () => {
    if (cursorPointerRef.current && cursorCircleRef.current) {
      cursorPointerRef.current.classList.add("disabled")
      cursorCircleRef.current.classList.add("disabled")
    }
  }

  const enableCursor = () => {
    if (cursorPointerRef.current && cursorCircleRef.current) {
      cursorPointerRef.current.classList.remove("disabled")
      cursorCircleRef.current.classList.remove("disabled")
    }
  }

  const gameMobileControls = useRef()
  const gameMobileControlLeft = useRef()
  const gameMobileControlRight = useRef()

  const spaceship = useRef()
  const spaceshipMovement = useRef()

  const currentScoreIndicator = useRef()
  const currentLivesIndicator = useRef()
  const bestScoreIndicator = useRef()
  const finalScoreIndicator = useRef()

  const gameWrapper = useRef()
  const gameOverMenu = useRef()
  const gameMenu = useRef()
  const gameInfos = useRef()

  const startButton = useRef()
  const restartButton = useRef()

  useEffect(() => {
    let isPlaying = false
    let keyDown = null
    let spaceshipY = 0
    let score = 0
    let lives = 3

    const displayInfos = () => {
      const render = () => {
        if (currentScoreIndicator.current && currentLivesIndicator.current) {
          currentScoreIndicator.current.innerText = ("0000" + score).slice(-4)
          currentLivesIndicator.current.className = `lives--${
            lives > 0 ? lives : 0
          }`
        }
        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    }
    displayInfos()

    // Control detect
    if (window) {
      window.addEventListener("keydown", event => {
        if (!keyDown) {
          if (event.keyCode === 37) {
            // Key left
            keyDown = 37
          }
          if (event.keyCode === 39) {
            // Key right
            keyDown = 39
          }
        }
      })

      window.addEventListener("keyup", event => {
        keyDown = null
      })

      // Touch support
      if (gameMobileControlRight.current && gameMobileControlLeft.current) {
        gameMobileControlRight.current.addEventListener("touchstart", event => {
          event.preventDefault()
          if (!keyDown) {
            keyDown = 39
          }
        })

        gameMobileControlRight.current.addEventListener("touchend", event => {
          event.preventDefault()
          if (keyDown) {
            keyDown = null
          }
        })

        gameMobileControlLeft.current.addEventListener("touchstart", event => {
          event.preventDefault()
          if (!keyDown) {
            keyDown = 37
          }
        })

        gameMobileControlLeft.current.addEventListener("touchend", event => {
          event.preventDefault()
          if (keyDown) {
            keyDown = null
          }
        })
      }
    }

    const renderGame = () => {
      let lastKeyDown = keyDown
      let lastSpaceshipY = spaceshipY

      const render = () => {
        // Check position of spaceship
        if (lastKeyDown !== keyDown) {
          lastKeyDown = keyDown
          spaceshipY = 0

          if (keyDown === 37) {
            // Key Left
            spaceshipY = -1
          }
          if (keyDown === 39) {
            // Key Right
            spaceshipY = 1
          }

          if (lastSpaceshipY !== spaceshipY && spaceship.current) {
            if (spaceshipY === 0) {
              spaceship.current.style.transform = `rotateY(90deg) translateX(-20px)`
            } else if (spaceshipY === 1) {
              spaceship.current.style.transform = `rotateY(90deg) translateY(-20px) translateX(-90px) rotateZ(${getRandomArbitrary(
                30,
                40
              )}deg)`
            } else if (spaceshipY === -1) {
              spaceship.current.style.transform = `rotateY(90deg) translateY(-20px) translateX(50px) rotateZ(-${getRandomArbitrary(
                30,
                40
              )}deg)`
            }
            lastSpaceshipY = spaceshipY
          }
        }

        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    }
    renderGame()

    const createVisualRing = (speed, axis, isTrap) => {
      let newRing = document.createElement("div")
      newRing.classList.add("ring")
      newRing.style.animationDuration = `${speed}ms`
      if (axis === 1 || axis === -1 || axis === 0) {
        switch (axis) {
          case 1:
            newRing.classList.add("ring--right")
            break
          case -1:
            newRing.classList.add("ring--left")
            break
          case 0:
            newRing.classList.add("ring--center")
            break
          default:
            break
        }
      }

      if (isTrap) {
        newRing.classList.add("ring--trap")
      }

      if (gameWrapper.current) {
        gameWrapper.current.appendChild(newRing)

        setTimeout(() => {
          gameWrapper.current.removeChild(newRing)
        }, speed)
      }

      return newRing
    }

    const createObstacle = (speed, axis, isTrap) => {
      let ring = createVisualRing(speed, axis, isTrap)
      return ring
    }

    const decreaseLives = () => {
      lives--
    }

    const initGameMenu = async () => {
      if (
        gameMobileControls.current &&
        gameMenu.current &&
        gameOverMenu.current &&
        gameInfos.current &&
        !isPlaying
      ) {
        gameMobileControls.current.style = ""
        gameMenu.current.style.opacity = 1
        gameMenu.current.style.pointerEvents = "auto"
        gameOverMenu.current.style = ""
        gameInfos.current.style = ""
        do {
          await sleep(2000)
          createVisualRing(3000)
        } while (!isPlaying)
      }
    }

    const initGameOverMenu = async () => {
      if (
        gameMobileControls.current &&
        gameMenu.current &&
        gameOverMenu.current &&
        gameInfos.current &&
        gameWrapper.current &&
        !isPlaying
      ) {
        gameMobileControls.current.style = ""
        gameWrapper.current.style.transform =
          "translatez(-60px) translateX(-100px) rotateX(-0deg) rotatey(90deg)"
        gameOverMenu.current.style.opacity = 1
        gameOverMenu.current.style.pointerEvents = "auto"
        gameMenu.current.style = ""
        gameInfos.current.style = ""
        do {
          await sleep(2000)
          createVisualRing(3000)
        } while (!isPlaying)
      }
    }

    const startGame = () => {
      if (
        gameMobileControls.current &&
        gameMenu.current &&
        gameInfos.current &&
        gameWrapper.current &&
        !isPlaying
      ) {
        gameWrapper.current.style.transform =
          "translatez(-60px) translateX(-100px) rotateX(-20deg) rotatey(90deg)"
        spaceship.current.classList.remove("died")

        gameOverMenu.current.style = ""
        gameMenu.current.style = ""
        gameMobileControls.current.style.display = "flex"
        gameMobileControls.current.style.pointerEvents = "auto"

        isPlaying = true
        disableCursor()
        setTimeout(() => {
          gameInfos.current.style.opacity = 1
          initGame()
        }, 2000)
      }
    }

    const gameOver = () => {
      if (
        bestScoreIndicator.current &&
        currentScoreIndicator.current &&
        spaceship.current &&
        gameMobileControls.current
      ) {
        spaceship.current.classList.add("died")
        isPlaying = false
        gameMobileControls.current.style = ""

        const currentScore = score
        const bestScore = localStorage.getItem("bestScore")
        finalScoreIndicator.current.innerText = currentScore
        if (bestScore) {
          if (bestScore < currentScore) {
            localStorage.setItem("bestScore", currentScore)
            bestScoreIndicator.current.innerText = "New Highscore !"
          } else {
            bestScoreIndicator.current.innerText = "Highscore at " + bestScore
          }
        } else {
          localStorage.setItem("bestScore", currentScore)
          bestScoreIndicator.current.innerText = "New Highscore !"
        }

        setTimeout(() => {
          enableCursor()
          initGameOverMenu()
        }, 2000)
      }
    }

    const initGame = async () => {
      let intervalTime = 1000
      let speed = 2800
      let trapChance = 9

      // Restart indicators
      score = 0
      lives = 3

      while (isPlaying) {
        await sleep(intervalTime)

        const axis = getRandomAxis()

        const random = trapChance === 1 ? trapChance : getRandomInt(trapChance)
        const isTrap = random === 1

        const obstacle = createObstacle(speed, axis, isTrap)

        const speedCheck = Math.round(speed * 0.75)

        setTimeout(() => {
          const obstacleIsTrap = isTrap
          const currentAxis = axis
          const obstacleElement = obstacle
          const currentLives = lives
          if (
            obstacleElement &&
            currentAxis === spaceshipY &&
            currentLives !== 0
          ) {
            if (obstacleIsTrap) {
              decreaseLives()
            }
            obstacleElement.style.borderColor = "#644ed1"
          } else {
            if (!obstacleIsTrap) {
              decreaseLives()
            }
          }
          if (lives === 0) {
            gameOver()
          }
        }, speedCheck)
        score++
        if (speed > 900 && intervalTime > 300) {
          intervalTime = intervalTime - 3
          speed = speed - 12
        }
        if (score > 100) {
          trapChance = 1
        }
        if (score > 120) {
          trapChance = 7
        }
      }
    }

    if (startButton.current && restartButton.current) {
      startButton.current.addEventListener("click", () => {
        if (!isPlaying) {
          startGame()
        }
      })
      restartButton.current.addEventListener("click", () => {
        if (!isPlaying) {
          startGame()
        }
      })
    }
    initGameMenu()
  }, [
    gameMobileControls,
    gameMobileControlLeft,
    gameMobileControlRight,
    spaceship,
    spaceshipMovement,
    currentScoreIndicator,
    currentLivesIndicator,
    bestScoreIndicator,
    finalScoreIndicator,
    gameWrapper,
    gameOverMenu,
    gameMenu,
    gameInfos,
    startButton,
    restartButton,
  ])

  return (
    <>
      <div className="game-mobile-controls" ref={gameMobileControls}>
        <div className="left" ref={gameMobileControlLeft}></div>
        <div className="right" ref={gameMobileControlRight}></div>
      </div>
      <div className="game">
        <div className="game-menu-over" ref={gameOverMenu}>
          <p ref={finalScoreIndicator}>0000</p>
          <p>That a nice score for sure</p>
          <p ref={bestScoreIndicator}>Highscore at 0011</p>
          <button className="share">share</button>
          <button className="play" ref={restartButton}>
            play
          </button>
        </div>
        <div className="game-menu" ref={gameMenu}>
          <p>
            Move with <LeftArrowIcon />
            and
            <RightArrowIcon />
            keys
          </p>
          <p>Go through the rectangles </p>
          <p>And avoid traps</p>
          <button className="play" ref={startButton}>
            play
          </button>
        </div>
        <div className="game-wrapper" ref={gameWrapper}>
          <div className="game-infos" ref={gameInfos}>
            <div className="info">
              Score<span ref={currentScoreIndicator}>0000</span>
            </div>
            <div className="info" ref={currentLivesIndicator}>
              <HeartIcon />
              <HeartIcon />
              <HeartIcon />
            </div>
          </div>
          <div className="spaceship-movement" ref={spaceshipMovement}>
            <Spaceship ref={spaceship} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Game
