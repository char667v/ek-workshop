import { useId } from "react";
import styles from "./anemone.module.css";
import { outline, centerLines, centerDisc, stamens, petals } from "./anemonedata";

// variant="pulse"  -> the whole flower breathes in and out
// variant="petals" -> each petal closes and opens, one after another
// delay            -> seconds; a different delay per flower makes them move at different times
export default function Anemone({
  variant = "pulse",
  lineColor = variant === "petals" ? "black" : "white",
  petalColor = "white",
  size = 326,
  rotate = 0,
  delay = 0,
}) {
  const id = useId();
  const linesId = `${id}-lines`;

  return (
    <div className={styles.flower} style={{ width: size, transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      {/* The petal outlines are defined once and reused with <use> */}
      <svg className={styles.hidden}>
        <path id={linesId} d={outline} fillRule="evenodd" fill={lineColor} />
      </svg>

      {variant === "pulse" ? (
        <svg viewBox="0 0 326 326" className={`${styles.layer} ${styles.pulse}`} style={{ animationDelay: `${delay}s` }}>
          <use href={`#${linesId}`} />
          <Center />
        </svg>
      ) : (
        <>
          {/* Each petal is its own <svg>, so the browser can move it without redrawing it */}
          {petals.map((petal, i) => (
            <svg
              key={i}
              viewBox="0 0 326 326"
              className={`${styles.layer} ${styles.petal}`}
              style={{ animationDelay: `${delay + i * 0.15}s` }}
            >
              <clipPath id={`${id}-${i}`}>
                <path d={petal} />
              </clipPath>
              <g clipPath={`url(#${id}-${i})`}>
                <path d={petal} fill={petalColor} />
                <use href={`#${linesId}`} />
              </g>
            </svg>
          ))}
          <svg viewBox="0 0 326 326" className={styles.layer}>
            <Center />
          </svg>
        </>
      )}
    </div>
  );
}

function Center() {
  return (
    <>
      <path d={centerLines} stroke="black" strokeWidth="0.65" strokeLinecap="round" />
      <path d={centerDisc} fillRule="evenodd" fill="black" />
      <path d={stamens} fill="#F0E4D0" />
    </>
  );
}

// import { useId } from "react";
// import styles from "./anemone.module.css";
// import { outline, centerLines, centerDisc, stamens, petals } from "./anemonedata";

// // variant="pulse"  -> the whole flower breathes in and out
// // variant="petals" -> each petal closes and opens, one after another
// export default function Anemone({
//   variant = "pulse",
//   lineColor = variant === "petals" ? "black" : "white",
//   petalColor = "white",
//   size = 326,
//   rotate = 0,
// }) {
//   const id = useId();
//   const linesId = `${id}-lines`;

//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 326 326"
//       fill="none"
//       aria-hidden="true"
//       style={{ transform: `rotate(${rotate}deg)` }}
//     >
//       <defs>
//         {/* The petal outlines are defined once and reused with <use> */}
//         <path id={linesId} d={outline} fillRule="evenodd" fill={lineColor} />
//       </defs>

//       {variant === "pulse" ? (
//         <g className={styles.pulse}>
//           <use href={`#${linesId}`} />
//           <Center />
//         </g>
//       ) : (
//         <>
//           {petals.map((petal, i) => (
//             <g key={i} className={styles.petal} style={{ animationDelay: `${i * 0.15}s` }}>
//               {/* <clipPath id={`${id}-${i}`}>
//                 <path d={petal} />
//               </clipPath> */}
//               <g clipPath={`url(#${id}-${i})`}>
//                 <path d={petal} fill={petalColor} />
//                 <use href={`#${linesId}`} />
//               </g>
//             </g>
//           ))}
//           <Center />
//         </>
//       )}
//     </svg>
//   );
// }

// function Center() {
//   return (
//     <>
//       <path d={centerLines} stroke="black" strokeWidth="0.65" strokeLinecap="round" />
//       <path d={centerDisc} fillRule="evenodd" fill="black" />
//       <path d={stamens} fill="#F0E4D0" />
//     </>
//   );
// }