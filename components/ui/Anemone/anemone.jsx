import { useId } from "react";
import styles from "@/components/ui/Anemone/anemone.module.css";
import { outline, centerLines, centerDisc, stamens, petals } from "@/components/ui/Anemone/anemonedata";

// variant="pulse"  -> the whole flower breathes in and out
// variant="petals" -> each petal closes and opens, one after another
export default function Anemone({ variant = "pulse" }) {
  const id = useId();
  const linesId = `${id}-lines`;

  return (
    <svg width="326" height="326" viewBox="0 0 326 326" fill="none" aria-hidden="true">
      <defs>
        {/* The petal outlines are defined once and reused with <use> */}
        <path id={linesId} d={outline} fillRule="evenodd" fill="black" />
      </defs>

      {variant === "pulse" ? (
        <g className={styles.pulse}>
          <use href={`#${linesId}`} />
          <Center />
        </g>
      ) : (
        <>
          {petals.map((petal, i) => (
            <g key={i} className={styles.petal} style={{ animationDelay: `${i * 0.15}s` }}>
              <clipPath id={`${id}-${i}`}>
                <path d={petal} />
              </clipPath>
              <g clipPath={`url(#${id}-${i})`}>
                <path d={petal} fill="white" />
                <use href={`#${linesId}`} />
              </g>
            </g>
          ))}
          <Center />
        </>
      )}
    </svg>
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