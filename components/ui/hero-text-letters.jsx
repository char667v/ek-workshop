"use client"

// HERO TEXT – LETTERS
// Types "Hello!", drops it with a bounce, then types the sentence along the curve.
// Hover: each letter turns peach on its own when the mouse is over it.

import { useEffect, useRef } from "react"

const HELLO = "Hello!"
const SENTENCE =
  "My name is Charlotte. I'm a ux/ui designer student based in Cph, Denmark. More about me"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const css = `
  .typing-hero { --ink: #3f4632; display: block; width: 100%; max-width: 870px; height: auto; }
  @media (prefers-color-scheme: dark) {
    .typing-hero { --ink: #ffffff; }
  }
  .typing-hero text { fill: var(--ink); font-family: "Fira Sans", system-ui, sans-serif; font-size: 48px; white-space: pre; }

  /* Each letter turns peach on its own when the mouse is over it */
  .typing-hero tspan { transition: fill 0.2s; }
  .typing-hero tspan:hover { fill: #f4a77f; }

  /* "Hello!" starts horizontal, then drops 90° around its first letter and bounces */
  .typing-hero .hello { transform-origin: 45px 25px; }
  .typing-hero .hello.swing { animation: drop-bounce 1.2s forwards; }

  @keyframes drop-bounce {
    0%   { transform: rotate(0deg);  animation-timing-function: ease-in; }  /* falls, speeding up */
    45%  { transform: rotate(90deg); animation-timing-function: ease-out; } /* hits the bottom */
    62%  { transform: rotate(76deg); animation-timing-function: ease-in; }  /* bounces back up */
    78%  { transform: rotate(90deg); animation-timing-function: ease-out; } /* falls again */
    89%  { transform: rotate(84deg); animation-timing-function: ease-in; }  /* small bounce */
    100% { transform: rotate(90deg); }                                       /* rests */
  }
`

export default function HeroTextLetters() {
  const helloRef = useRef(null)
  const curveTextRef = useRef(null)

  useEffect(() => {
    const hello = helloRef.current
    const curveText = curveTextRef.current
    let stopped = false // stops the typing if React removes the component

    // Empty both texts first, so the letters aren't added twice
    // when React runs this effect twice in development.
    hello.textContent = ""
    curveText.textContent = ""

    // Adds one letter at a time, each in its own <tspan>,
    // so each letter can change color on hover by itself.
    async function type(el, text, msPerLetter) {
      for (const char of text) {
        if (stopped) return
        const letter = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
        letter.textContent = char
        el.appendChild(letter)
        await sleep(msPerLetter)
      }
    }

    async function run() {
      await type(hello, HELLO, 120)
      await sleep(300)
      if (stopped) return
      hello.classList.add("swing") // swing down 90°
      await sleep(1800) // wait for the drop and bounce, plus a short pause
      await type(curveText, SENTENCE, 60)
    }

    run()
    return () => {
      stopped = true
    }
  }, [])

  return (
    // viewBox starts at y=-60 so "Hello!" isn't cut off before it swings
    <svg className="typing-hero" viewBox="0 -60 870 960" aria-label={`${HELLO} ${SENTENCE}`}>
      <style>{css}</style>

      {/* The invisible line the text follows. Edit the numbers in d="" to reshape the curve. */}
      <path
        id="curve"
        fill="none"
        d="
          M 100 20
          L 100 250
          C 100 370, 150 425, 240 425
          C 310 425, 360 340, 410 270
          C 450 215, 530 205, 600 235
          C 670 265, 705 340, 705 430
          C 705 520, 660 575, 580 585
          C 480 590, 390 620, 395 690
          C 398 745, 435 780, 480 795
          C 505 808, 530 820, 570 820
          L 860 820"
      />

      <text ref={helloRef} className="hello" x="40" y="25" />

      <text>
        <textPath ref={curveTextRef} href="#curve" />
      </text>
    </svg>
  )
}