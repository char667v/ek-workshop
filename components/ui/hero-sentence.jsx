"use client"

// HERO SENTENCE
// Types the sentence along the curve, after "Hello!" has dropped.
// <HeroSentence />                      each letter turns peach on hover (default)
// <HeroSentence variant="flashlight" /> a soft peach light follows the mouse
// <HeroSentence shape="wave" />         the sentence follows a wave instead of the curve

import { useEffect, useRef } from "react"

const SENTENCE =
  "My name is Charlotte. I'm a ux/ui designer student based in Cph, Denmark. More about me"

// Waits for HeroHello: 6 letters × 120ms + 300ms pause + 1800ms drop and pause
const START = 2820

// The invisible lines the text follows. Edit the numbers to reshape them.
const CURVE = `
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
  L 860 820`

const WAVE = `
  M 43 70
  C 210 90, 150 420, 330 450
  C 500 480, 500 90, 700 80
  C 920 70, 940 330, 1080 440
  C 1190 525, 1300 550, 1450 550`

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const css = `
  .typing-hero { --ink: #3f4632; display: block; width: 100%; max-width: 870px; height: auto; }
  @media (prefers-color-scheme: dark) {
    .typing-hero { --ink: #ffffff; }
  }
  .typing-hero text { fill: var(--ink); font-family: "Fira Sans", system-ui, sans-serif; font-size: 48px; white-space: pre; }
`

// Default: each letter turns peach on its own when the mouse is over it
const lettersCss = `
  .typing-hero tspan { transition: fill 0.2s; }
  .typing-hero tspan:hover { fill: #f4a77f; }
`

// Flashlight: the peach copy of the text that the flashlight reveals
const flashlightCss = `
  .typing-hero .glow { --ink: #f4a77f; pointer-events: none; }
`

export default function HeroSentence({ variant, shape }) {
  const flashlight = variant === "flashlight"
  // The normal text, and the peach copy on top (flashlight only)
  const curveTextRef = useRef(null)
  const curveTextGlowRef = useRef(null)
  const spotRef = useRef(null)

  useEffect(() => {
    const curveTexts = [curveTextRef.current, curveTextGlowRef.current].filter(Boolean)
    let stopped = false // stops the typing if React removes the component

    // Empty the texts first, so the letters aren't added twice
    // when React runs this effect twice in development.
    curveTexts.forEach((el) => (el.textContent = ""))

    // Adds one letter at a time, each in its own <tspan>,
    // to every copy at the same time
    async function type(els, text, msPerLetter) {
      for (const char of text) {
        if (stopped) return
        els.forEach((el) => {
          const letter = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
          letter.textContent = char
          el.appendChild(letter)
        })
        await sleep(msPerLetter)
      }
    }

    async function run() {
      await sleep(START)
      await type(curveTexts, SENTENCE, 60)
    }

    run()
    return () => {
      stopped = true
    }
  }, [])

  // Flashlight: follows the mouse over the whole <svg> it sits in
  useEffect(() => {
    if (!flashlight) return
    const spot = spotRef.current
    const svg = spot.ownerSVGElement

    // Moves the flashlight to where the mouse is.
    // getScreenCTM turns screen pixels into the SVG's own coordinates.
    function moveSpot(event) {
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
        svg.getScreenCTM().inverse()
      )
      spot.setAttribute("cx", point.x)
      spot.setAttribute("cy", point.y)
    }

    // Moves the flashlight far off-screen when the mouse leaves.
    function hideSpot() {
      spot.setAttribute("cx", -9999)
      spot.setAttribute("cy", -9999)
    }

    svg.addEventListener("pointermove", moveSpot)
    svg.addEventListener("pointerleave", hideSpot)
    return () => {
      svg.removeEventListener("pointermove", moveSpot)
      svg.removeEventListener("pointerleave", hideSpot)
    }
  }, [flashlight])

  return (
    <>
      <style>{css + (flashlight ? flashlightCss : lettersCss)}</style>

      <path id="curve" fill="none" d={shape === "wave" ? WAVE : CURVE} />

      {/* The normal text */}
      <text>
        <textPath ref={curveTextRef} href="#curve" />
      </text>

      {flashlight && (
        <>
          <defs>
            {/* The flashlight: bright (white) in the middle, fading to nothing (black) at the edge */}
            <radialGradient id="spot-fade">
              <stop offset="0" stopColor="white" />
              <stop offset="1" stopColor="black" />
            </radialGradient>
            <mask id="spot" maskUnits="userSpaceOnUse" x="-100" y="-200" width="1700" height="1300">
              <circle ref={spotRef} cx="-9999" cy="-9999" r="140" fill="url(#spot-fade)" />
            </mask>
          </defs>

          {/* A peach copy of the text on top, only visible inside the flashlight */}
          <g className="glow" mask="url(#spot)">
            <text>
              <textPath ref={curveTextGlowRef} href="#curve" />
            </text>
          </g>
        </>
      )}
    </>
  )
}


// "use client"

// // HERO SENTENCE
// // Types the sentence along the curve, after "Hello!" has dropped.
// // <HeroSentence />                      each letter turns peach on hover (default)
// // <HeroSentence variant="flashlight" /> a soft peach light follows the mouse

// import { useEffect, useRef } from "react"

// const SENTENCE =
//   "My name is Charlotte. I'm a ux/ui designer student based in Cph, Denmark. More about me"

// // Waits for HeroHello: 6 letters × 120ms + 300ms pause + 1800ms drop and pause
// const START = 2820

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// const css = `
//   .typing-hero { --ink: #3f4632; display: block; width: 100%; max-width: 870px; height: auto; }
//   @media (prefers-color-scheme: dark) {
//     .typing-hero { --ink: #ffffff; }
//   }
//   .typing-hero text { fill: var(--ink); font-family: "Fira Sans", system-ui, sans-serif; font-size: 48px; white-space: pre; }
// `

// // Default: each letter turns peach on its own when the mouse is over it
// const lettersCss = `
//   .typing-hero tspan { transition: fill 0.2s; }
//   .typing-hero tspan:hover { fill: #f4a77f; }
// `

// // Flashlight: the peach copy of the text that the flashlight reveals
// const flashlightCss = `
//   .typing-hero .glow { --ink: #f4a77f; pointer-events: none; }
// `

// export default function HeroSentence({ variant }) {
//   const flashlight = variant === "flashlight"
//   // The normal text, and the peach copy on top (flashlight only)
//   const curveTextRef = useRef(null)
//   const curveTextGlowRef = useRef(null)
//   const spotRef = useRef(null)

//   useEffect(() => {
//     const curveTexts = [curveTextRef.current, curveTextGlowRef.current].filter(Boolean)
//     let stopped = false // stops the typing if React removes the component

//     // Empty the texts first, so the letters aren't added twice
//     // when React runs this effect twice in development.
//     curveTexts.forEach((el) => (el.textContent = ""))

//     // Adds one letter at a time, each in its own <tspan>,
//     // to every copy at the same time
//     async function type(els, text, msPerLetter) {
//       for (const char of text) {
//         if (stopped) return
//         els.forEach((el) => {
//           const letter = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
//           letter.textContent = char
//           el.appendChild(letter)
//         })
//         await sleep(msPerLetter)
//       }
//     }

//     async function run() {
//       await sleep(START)
//       await type(curveTexts, SENTENCE, 60)
//     }

//     run()
//     return () => {
//       stopped = true
//     }
//   }, [])

//   // Flashlight: follows the mouse over the whole <svg> it sits in
//   useEffect(() => {
//     if (!flashlight) return
//     const spot = spotRef.current
//     const svg = spot.ownerSVGElement

//     // Moves the flashlight to where the mouse is.
//     // getScreenCTM turns screen pixels into the SVG's own coordinates.
//     function moveSpot(event) {
//       const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
//         svg.getScreenCTM().inverse()
//       )
//       spot.setAttribute("cx", point.x)
//       spot.setAttribute("cy", point.y)
//     }

//     // Moves the flashlight far off-screen when the mouse leaves.
//     function hideSpot() {
//       spot.setAttribute("cx", -9999)
//       spot.setAttribute("cy", -9999)
//     }

//     svg.addEventListener("pointermove", moveSpot)
//     svg.addEventListener("pointerleave", hideSpot)
//     return () => {
//       svg.removeEventListener("pointermove", moveSpot)
//       svg.removeEventListener("pointerleave", hideSpot)
//     }
//   }, [flashlight])

//   return (
//     <>
//       <style>{css + (flashlight ? flashlightCss : lettersCss)}</style>

//       {/* The invisible line the text follows. Edit the numbers in d="" to reshape the curve. */}
//       <path
//         id="curve"
//         fill="none"
//         d="
//           M 100 20
//           L 100 250
//           C 100 370, 150 425, 240 425
//           C 310 425, 360 340, 410 270
//           C 450 215, 530 205, 600 235
//           C 670 265, 705 340, 705 430
//           C 705 520, 660 575, 580 585
//           C 480 590, 390 620, 395 690
//           C 398 745, 435 780, 480 795
//           C 505 808, 530 820, 570 820
//           L 860 820"
//       />

//       {/* The normal text */}
//       <text>
//         <textPath ref={curveTextRef} href="#curve" />
//       </text>

//       {flashlight && (
//         <>
//           <defs>
//             {/* The flashlight: bright (white) in the middle, fading to nothing (black) at the edge */}
//             <radialGradient id="spot-fade">
//               <stop offset="0" stopColor="white" />
//               <stop offset="1" stopColor="black" />
//             </radialGradient>
//             <mask id="spot" maskUnits="userSpaceOnUse" x="0" y="-60" width="870" height="960">
//               <circle ref={spotRef} cx="-9999" cy="-9999" r="140" fill="url(#spot-fade)" />
//             </mask>
//           </defs>

//           {/* A peach copy of the text on top, only visible inside the flashlight */}
//           <g className="glow" mask="url(#spot)">
//             <text>
//               <textPath ref={curveTextGlowRef} href="#curve" />
//             </text>
//           </g>
//         </>
//       )}
//     </>
//   )
// }



// "use client"

// // HERO TEXT – LETTERS
// // Types "Hello!", drops it with a bounce, then types the sentence along the curve.
// // Hover: each letter turns peach on its own when the mouse is over it.

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
//   .typing-hero text { fill: var(--ink); font-family: "Fira Sans", system-ui, sans-serif; font-size: 48px; white-space: pre; }

//   /* Each letter turns peach on its own when the mouse is over it */
//   .typing-hero tspan { transition: fill 0.2s; }
//   .typing-hero tspan:hover { fill: #f4a77f; }

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

// export default function HeroTextLetters() {
//   const helloRef = useRef(null)
//   const curveTextRef = useRef(null)

//   useEffect(() => {
//     const hello = helloRef.current
//     const curveText = curveTextRef.current
//     let stopped = false // stops the typing if React removes the component

//     // Empty both texts first, so the letters aren't added twice
//     // when React runs this effect twice in development.
//     hello.textContent = ""
//     curveText.textContent = ""

//     // Adds one letter at a time, each in its own <tspan>,
//     // so each letter can change color on hover by itself.
//     async function type(el, text, msPerLetter) {
//       for (const char of text) {
//         if (stopped) return
//         const letter = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
//         letter.textContent = char
//         el.appendChild(letter)
//         await sleep(msPerLetter)
//       }
//     }

//     async function run() {
//       await type(hello, HELLO, 120)
//       await sleep(300)
//       if (stopped) return
//       hello.classList.add("swing") // swing down 90°
//       await sleep(1800) // wait for the drop and bounce, plus a short pause
//       await type(curveText, SENTENCE, 60)
//     }

//     run()
//     return () => {
//       stopped = true
//     }
//   }, [])

//   return (
//     // viewBox starts at y=-60 so "Hello!" isn't cut off before it swings
//     <svg className="typing-hero" viewBox="0 -60 870 960" aria-label={`${HELLO} ${SENTENCE}`}>
//       <style>{css}</style>

//       {/* The invisible line the text follows. Edit the numbers in d="" to reshape the curve. */}
//       <path
//         id="curve"
//         fill="none"
//         d="
//           M 100 20
//           L 100 250
//           C 100 370, 150 425, 240 425
//           C 310 425, 360 340, 410 270
//           C 450 215, 530 205, 600 235
//           C 670 265, 705 340, 705 430
//           C 705 520, 660 575, 580 585
//           C 480 590, 390 620, 395 690
//           C 398 745, 435 780, 480 795
//           C 505 808, 530 820, 570 820
//           L 860 820"
//       />

//       <text ref={helloRef} className="hello" x="40" y="25" />

//       <text>
//         <textPath ref={curveTextRef} href="#curve" />
//       </text>
//     </svg>
//   )
// }