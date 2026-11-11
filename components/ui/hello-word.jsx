"use client"

// HERO HELLO
// Types "Hello!" and drops it with a bounce.
// <HeroHello />                drops (default)
// <HeroHello variant="fade" /> drops, then slowly fades out

import { useEffect, useRef } from "react"

const HELLO = "Hello!"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const css = `
  .typing-hero { --ink: #3f4632; display: block; width: 100%; max-width: 870px; height: auto; }
  @media (prefers-color-scheme: dark) {
    .typing-hero { --ink: #ffffff; }
  }
  .typing-hero text { fill: var(--ink); font-family: "Fira Sans", system-ui, sans-serif; font-size: 48px; white-space: pre; }

  /* "Hello!" starts horizontal, then drops 90° around its first letter and bounces */
  .typing-hero .hello { transform-origin: 45px 25px; }
  .typing-hero .hello.swing { animation: drop-bounce 1.2s forwards; }

  /* Fade variant: the drop (1.2s), then a slow fade (2s) that starts after 1.4s */
  .typing-hero .hello.fade.swing { animation: drop-bounce 1.2s forwards, fade-out 2s ease-in-out 1.4s forwards; }

  @keyframes drop-bounce {
    0%   { transform: rotate(0deg);  animation-timing-function: ease-in; }  /* falls, speeding up */
    45%  { transform: rotate(90deg); animation-timing-function: ease-out; } /* hits the bottom */
    62%  { transform: rotate(76deg); animation-timing-function: ease-in; }  /* bounces back up */
    78%  { transform: rotate(90deg); animation-timing-function: ease-out; } /* falls again */
    89%  { transform: rotate(84deg); animation-timing-function: ease-in; }  /* small bounce */
    100% { transform: rotate(90deg); }                                       /* rests */
  }

  @keyframes fade-out {
    to { opacity: 0; }
  }
`

export default function HeroHello({ variant }) {
  const helloRef = useRef(null)

  useEffect(() => {
    const hello = helloRef.current
    let stopped = false // stops the typing if React removes the component

    // Empty the text first, so the letters aren't added twice
    // when React runs this effect twice in development.
    hello.textContent = ""

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
    }

    run()
    return () => {
      stopped = true
    }
  }, [])

  return (
    <>
      <style>{css}</style>
      <text ref={helloRef} className={variant === "fade" ? "hello fade" : "hello"} x="40" y="25" />
    </>
  )
}

// "use client"

// // HERO TEXT – FLASHLIGHT
// // Types "Hello!", drops it with a bounce, then types the sentence along the curve.
// // Hover: a soft peach light follows the mouse and lights up an area of the text.

// import { useEffect, useRef } from "react"

// const HELLO = "Hello!"
// const SENTENCE =
//   "My name is Charlotte. I'm a ux/ui designer student based in Cph, Denmark. More about me"

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// const css = `
//   .typing-hero { --ink: #3f4632; display: block; width: 100%; max-width: 870px; height: auto; }
//   @media (prefers-color-scheme: dark) {
//     .typing-hero { --ink: #ffffff; }
//   }
//   .typing-hero text { fill: var(--ink); font-family: "Fira Sans", system-ui, sans-serif; font-size: 48px; }

//   /* The peach copy of the text that the flashlight reveals */
//   .typing-hero .glow { --ink: #f4a77f; pointer-events: none; }

//   /* "Hello!" starts horizontal, then drops 90° around its first letter and bounces */
//   .typing-hero .hello { transform-origin: 45px 25px; }
//   .typing-hero .hello.swing { animation: drop-bounce 1.2s forwards; }

//   @keyframes drop-bounce {
//     0%   { transform: rotate(0deg);  animation-timing-function: ease-in; }  /* falls, speeding up */
//     45%  { transform: rotate(90deg); animation-timing-function: ease-out; } /* hits the bottom */
//     62%  { transform: rotate(76deg); animation-timing-function: ease-in; }  /* bounces back up */
//     78%  { transform: rotate(90deg); animation-timing-function: ease-out; } /* falls again */
//     89%  { transform: rotate(84deg); animation-timing-function: ease-in; }  /* small bounce */
//     100% { transform: rotate(90deg); }                                       /* rests */
//   }
// `

// export default function HeroTextFlashlight() {
//   const svgRef = useRef(null)
//   // Two of each text: the normal one and the peach copy on top
//   const helloRef = useRef(null)
//   const helloGlowRef = useRef(null)
//   const curveTextRef = useRef(null)
//   const curveTextGlowRef = useRef(null)
//   const spotRef = useRef(null)

//   useEffect(() => {
//     const hellos = [helloRef.current, helloGlowRef.current]
//     const curveTexts = [curveTextRef.current, curveTextGlowRef.current]
//     let stopped = false // stops the typing if React removes the component

//     // Adds one more letter each step: "H", "He", "Hel" ...
//     // to both copies at the same time
//     async function type(els, text, msPerLetter) {
//       for (let i = 1; i <= text.length; i++) {
//         if (stopped) return
//         els.forEach((el) => (el.textContent = text.slice(0, i)))
//         await sleep(msPerLetter)
//       }
//     }

//     async function run() {
//       await type(hellos, HELLO, 120)
//       await sleep(300)
//       if (stopped) return
//       hellos.forEach((el) => el.classList.add("swing")) // swing down 90°
//       await sleep(1800) // wait for the drop and bounce, plus a short pause
//       await type(curveTexts, SENTENCE, 60)
//     }

//     run()
//     return () => {
//       stopped = true
//     }
//   }, [])

//   // Moves the flashlight to where the mouse is.
//   // getScreenCTM turns screen pixels into the SVG's own coordinates.
//   function moveSpot(event) {
//     const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
//       svgRef.current.getScreenCTM().inverse()
//     )
//     spotRef.current.setAttribute("cx", point.x)
//     spotRef.current.setAttribute("cy", point.y)
//   }

//   // Moves the flashlight far off-screen when the mouse leaves.
//   function hideSpot() {
//     spotRef.current.setAttribute("cx", -9999)
//     spotRef.current.setAttribute("cy", -9999)
//   }

//   return (
//     // viewBox starts at y=-60 so "Hello!" isn't cut off before it swings
//     <svg
//       ref={svgRef}
//       className="typing-hero"
//       viewBox="0 -60 870 960"
//       aria-label={`${HELLO} ${SENTENCE}`}
//       onPointerMove={moveSpot}
//       onPointerLeave={hideSpot}
//     >
//       <style>{css}</style>

//       <defs>
//         {/* The invisible line the text follows. Edit the numbers in d="" to reshape the curve. */}
//         <path
//           id="curve"
//           d="
//             M 100 20
//             L 100 250
//             C 100 370, 150 425, 240 425
//             C 310 425, 360 340, 410 270
//             C 450 215, 530 205, 600 235
//             C 670 265, 705 340, 705 430
//             C 705 520, 660 575, 580 585
//             C 480 590, 390 620, 395 690
//             C 398 745, 435 780, 480 795
//             C 505 808, 530 820, 570 820
//             L 860 820"
//         />

//         {/* The flashlight: bright (white) in the middle, fading to nothing (black) at the edge */}
//         <radialGradient id="spot-fade">
//           <stop offset="0" stopColor="white" />
//           <stop offset="1" stopColor="black" />
//         </radialGradient>
//         <mask id="spot" maskUnits="userSpaceOnUse" x="0" y="-60" width="870" height="960">
//           <circle ref={spotRef} cx="-9999" cy="-9999" r="140" fill="url(#spot-fade)" />
//         </mask>
//       </defs>

//       {/* The normal text */}
//       <g>
//         <text ref={helloRef} className="hello" x="40" y="25" />
//         <text>
//           <textPath ref={curveTextRef} href="#curve" />
//         </text>
//       </g>

//       {/* A peach copy of the text on top, only visible inside the flashlight */}
//       <g className="glow" mask="url(#spot)">
//         <text ref={helloGlowRef} className="hello" x="40" y="25" />
//         <text>
//           <textPath ref={curveTextGlowRef} href="#curve" />
//         </text>
//       </g>
//     </svg>
//   )
// }