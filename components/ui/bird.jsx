"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const birdVariants = cva("w-auto text-foreground", {
  variants: {
    size: {
      sm: "h-12",
      md: "h-24",
      lg: "h-40",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

// Motion tokens: all timing in one place
const MOTION = {
  wingDuration: "8s",
  wingDelay: "3s",
  headDuration: "1.8s",
  easing: "0.37 0 0.63 1", // smooth in and out, like a sine wave
}

// Wing sizes and start times. L is the original size.
const WINGS = [
  { size: 1, begin: "0s" }, // L (also draws the tail and body)
  { size: 0.85, begin: MOTION.wingDelay }, // M
]

const ANGLES = [0, -16, 0] // rest -> swung back -> rest
const HINGE = [30, 135] // the point the wing swings and shrinks around
const BODY =
  "C6.42 148.4 14.42 127.14 34.42 124.74C39.92 124.08 46.92 122.74 65.42 123.74C70.09 122.57 81.12 119.24 87.92 111.24C96.42 101.24 97.83 87.85 100.92 83.74C101.96 82.34 102.77 78.77 110.42 78.08"

// Turn a point around the hinge and make it bigger or smaller
function move([x, y], angle, size) {
  const a = (angle * Math.PI) / 180
  const dx = (x - HINGE[0]) * size
  const dy = (y - HINGE[1]) * size
  const newX = HINGE[0] + dx * Math.cos(a) - dy * Math.sin(a)
  const newY = HINGE[1] + dx * Math.sin(a) + dy * Math.cos(a)
  return `${newX.toFixed(2)},${newY.toFixed(2)}`
}

// One wing: from where it meets the body, up to the tip, down to the tail tip.
// The two ends never move, so the wing stays attached.
function wingPath(size, angle) {
  const nearSize = (1 + size) / 2 // points near the body change only half as much
  return (
    `M39.92 124.24` +
    `C${move([20.92, 105.24], angle / 2, nearSize)} ${move([8.59, 37.53], angle, size)} ${move([55.42, 3.24], angle, size)}` +
    `C${move([100.42, 38.24], angle, size)} ${move([98.92, 142.74], angle / 2, nearSize)} 4.92,158.74`
  )
}

const BirdAnimated = React.forwardRef(({ className, size, label, ...props }, ref) => {
  const maskId = React.useId() // unique per bird, so several birds can be on one page
  const svgRef = React.useRef(null)
  React.useImperativeHandle(ref, () => svgRef.current)

  // Stop the animation for people who have asked their device for less motion,
  // and react if they change the setting while the page is open
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      if (query.matches) svgRef.current.pauseAnimations()
      else svgRef.current.unpauseAnimations()
    }
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="-2 -4 131 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(birdVariants({ size }), className)}
      {...props}
    >
      <defs>
        {/* Cuts the lines so the beak and the back of the head taper to a point */}
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-10" y="-10" width="150" height="190">
          <rect x="-10" y="-10" width="150" height="190" fill="white" />
          <path d="M125.918 75.7729L124.918 81.0797L111.117 75.9996L112.867 75.7729L125.918 75.7729Z" fill="black" />
          <path
            d="M90.984 70.55L90.505 70.962L90.05 71.387L89.621 71.823L89.216 72.269L88.834 72.723L88.476 73.184L88.139 73.651L87.823 74.122L87.528 74.597L87.253 75.074L86.997 75.554L86.76 76.033L86.542 76.512L86.342 76.99L86.16 77.466L85.995 77.939L85.848 78.407L85.718 78.87L85.605 79.327L85.509 79.776L85.429 80.217L85.367 80.649L85.321 81.069L85.292 81.476L85.283 81.702L83.443 85.254L74.475 80.608L76.315 77.056L76.47 76.762L76.757 76.239L77.061 75.715L77.38 75.19L77.717 74.664L78.071 74.138L78.442 73.612L78.831 73.087L79.237 72.563L79.663 72.041L80.107 71.521L80.571 71.006L81.055 70.494L81.559 69.989L82.084 69.489L82.631 68.998L83.199 68.515L83.79 68.042L84.404 67.581L85.042 67.133L85.703 66.701L86.389 66.284L87.099 65.887L87.834 65.51L88.59 65.157Z"
            fill="black"
          />
        </mask>
      </defs>

      <g stroke="currentColor" strokeWidth="4" strokeLinejoin="miter" strokeMiterlimit="12">
        {/* Wings. The first one also draws the tail and body, so the tail tip is one sharp corner */}
        {WINGS.map((wing, i) => {
          const extra = i === 0 ? BODY : ""
          return (
            <path key={i} d={wingPath(wing.size, 0) + extra}>
              <animate
                attributeName="d"
                dur={MOTION.wingDuration}
                begin={wing.begin}
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines={`${MOTION.easing};${MOTION.easing}`}
                values={ANGLES.map((angle) => wingPath(wing.size, angle) + extra).join(";")}
              />
            </path>
          )
        })}

        {/* Back of the head + beak: tilts around the neck point 110.42,78.08 */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur={MOTION.headDuration}
            repeatCount="indefinite"
            values="0 110.42 78.08; -9 110.42 78.08; 5 110.42 78.08; 0 110.42 78.08"
          />
          <path mask={`url(#${maskId})`} d="M83.42 80.74C86.75 74.3 96.82 64.75 110.42 78.08C113.75 77.78 118.39 78.02 124.92 79.24" />
        </g>
      </g>
    </svg>
  )
})
BirdAnimated.displayName = "BirdAnimated"

export { BirdAnimated, birdVariants }


// // Wing sizes and start times. L is the original size.
// const WINGS = [
//   //   { size: 0.55, begin: "0s" },    // XS (also draws the tail and body)
//   //   { size: 0.7, begin: "1.33s" },  // S
//   //   { size: 0.85, begin: "2.67s" }, // M
//   { size: 1, begin: "0s" }, // L
//   { size: 0.85, begin: "3s" }, // M
// ];

// const ANGLES = [0, -16, 0]; // rest -> swung back -> rest
// const HINGE = [30, 135]; // the point the wing swings and shrinks around
// const BODY =
//   "C6.42 148.4 14.42 127.14 34.42 124.74C39.92 124.08 46.92 122.74 65.42 123.74C70.09 122.57 81.12 119.24 87.92 111.24C96.42 101.24 97.83 87.85 100.92 83.74C101.96 82.34 102.77 78.77 110.42 78.08";

// // Turn a point around the hinge and make it bigger or smaller
// function move([x, y], angle, size) {
//   const a = (angle * Math.PI) / 180;
//   const dx = (x - HINGE[0]) * size;
//   const dy = (y - HINGE[1]) * size;
//   const newX = HINGE[0] + dx * Math.cos(a) - dy * Math.sin(a);
//   const newY = HINGE[1] + dx * Math.sin(a) + dy * Math.cos(a);
//   return `${newX.toFixed(2)},${newY.toFixed(2)}`;
// }

// // One wing: from where it meets the body, up to the tip, down to the tail tip.
// // The two ends never move, so the wing stays attached.
// function wingPath(size, angle) {
//   const nearSize = (1 + size) / 2; // points near the body change only half as much
//   return (
//     `M39.92 124.24` +
//     `C${move([20.92, 105.24], angle / 2, nearSize)} ${move([8.59, 37.53], angle, size)} ${move([55.42, 3.24], angle, size)}` +
//     `C${move([100.42, 38.24], angle, size)} ${move([98.92, 142.74], angle / 2, nearSize)} 4.92,158.74`
//   );
// }

// export default function BirdAnimated(props) {
//   return (
//     <svg {...props} width="127" height="165" viewBox="-2 -4 131 170" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         {/* Cuts the lines so the beak and the back of the head taper to a point */}
//         <mask id="beak" maskUnits="userSpaceOnUse" x="-10" y="-10" width="150" height="190">
//           <rect x="-10" y="-10" width="150" height="190" fill="white" />
//           <path d="M125.918 75.7729L124.918 81.0797L111.117 75.9996L112.867 75.7729L125.918 75.7729Z" fill="black" />
//           <path
//             d="M90.984 70.55L90.505 70.962L90.05 71.387L89.621 71.823L89.216 72.269L88.834 72.723L88.476 73.184L88.139 73.651L87.823 74.122L87.528 74.597L87.253 75.074L86.997 75.554L86.76 76.033L86.542 76.512L86.342 76.99L86.16 77.466L85.995 77.939L85.848 78.407L85.718 78.87L85.605 79.327L85.509 79.776L85.429 80.217L85.367 80.649L85.321 81.069L85.292 81.476L85.283 81.702L83.443 85.254L74.475 80.608L76.315 77.056L76.47 76.762L76.757 76.239L77.061 75.715L77.38 75.19L77.717 74.664L78.071 74.138L78.442 73.612L78.831 73.087L79.237 72.563L79.663 72.041L80.107 71.521L80.571 71.006L81.055 70.494L81.559 69.989L82.084 69.489L82.631 68.998L83.199 68.515L83.79 68.042L84.404 67.581L85.042 67.133L85.703 66.701L86.389 66.284L87.099 65.887L87.834 65.51L88.59 65.157Z"
//             fill="black"
//           />
//         </mask>
//       </defs>

//       <g stroke="black" strokeWidth="4" strokeLinejoin="miter" strokeMiterlimit="12">
//         {/* Wings. The first one also draws the tail and body, so the tail tip is one sharp corner */}
//         {WINGS.map((wing, i) => {
//           const extra = i === 0 ? BODY : "";
//           return (
//             <path key={i} d={wingPath(wing.size, 0) + extra}>
//               <animate
//                 attributeName="d"
//                 dur="8s"
//                 begin={wing.begin}
//                 repeatCount="indefinite"
//                 calcMode="spline"
//                 keyTimes="0;0.5;1"
//                 keySplines="0.37 0 0.63 1;0.37 0 0.63 1"
//                 values={ANGLES.map((angle) => wingPath(wing.size, angle) + extra).join(";")}
//               />
//             </path>
//           );
//         })}

//         {/* Back of the head + beak: tilts around the neck point 110.42,78.08 */}
//         <g>
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             dur="1.8s"
//             repeatCount="indefinite"
//             values="0 110.42 78.08; -9 110.42 78.08; 5 110.42 78.08; 0 110.42 78.08"
//           />
//           <path mask="url(#beak)" d="M83.42 80.74C86.75 74.3 96.82 64.75 110.42 78.08C113.75 77.78 118.39 78.02 124.92 79.24" />
//         </g>
//       </g>
//     </svg>
//   );
// }


