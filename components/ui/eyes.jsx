"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./eyes.module.css";

// How far things may move from the centre (in px).
// These match the sizes in eyes.module.css.
const PUPIL_MOVE_X = 15; // (eye width 80 - pupil width 50) / 2
const PUPIL_MOVE_Y = 22; // (eye height 120 - pupil height 75) / 2
const SHINE_MOVE_X = 13; // keeps the shine inside the pupil
const SHINE_MOVE_Y = 24;

function Eye() {
  const eyeRef = useRef(null);
  const [angle, setAngle] = useState(null); // null = mouse hasn't moved yet

  useEffect(() => {
    function handleMouseMove(event) {
      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setAngle(Math.atan2(event.clientY - centerY, event.clientX - centerX));
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cos = angle === null ? 0 : Math.cos(angle);
  const sin = angle === null ? 0 : Math.sin(angle);

  return (
    <div ref={eyeRef} className={styles.eye}>
      <div
        className={styles.pupil}
        style={{ transform: `translate(${cos * PUPIL_MOVE_X}px, ${sin * PUPIL_MOVE_Y}px)` }}
      >
        <div
          className={styles.shine}
          style={{ transform: `translate(${cos * SHINE_MOVE_X}px, ${sin * SHINE_MOVE_Y}px)` }}
        />
      </div>
    </div>
  );
}

export default function Eyes() {
  return (
    <div className={styles.eyes}>
      <Eye />
      <Eye />
    </div>
  );
}