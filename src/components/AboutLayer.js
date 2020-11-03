import React from "react"

const AboutLayer = () => {
  return (
    <div className="about-layer about-layer--1">
      <div class="card-wrapper">
        <div class="card">
          <img src="https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" />
          <div class="content">
            <h2 class="title">
              {" "}
              <b>Space </b>Lover
            </h2>
            <p class="description" id="reveal-space">
              A human on a rock turning around another{" "}
              <span class="reveal-image" id="reveal-burning-rock">
                burning rock{" "}
              </span>
              which turns around another black rock all in a space vacuum
              incompatible with man. Despite our ego it's amazing because we are
              nothing in this universe
            </p>
          </div>
        </div>
      </div>
      <div class="card-wrapper card-wrapper--right">
        <div class="card">
          <img src="https://assets.codepen.io/2287220/wizard_1.png" />
          <div class="content">
            <h2 class="title">
              {" "}
              CSS <b>Wizard </b>
            </h2>
            <p class="description" id="reveal-wizard">
              I discovered CSS images through a @sashatran post and I
              immediately loved making them, with my imagination overflowing
              there was no shortage of ideas.{" "}
              <span class="reveal-image" id="reveal-meme">
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
