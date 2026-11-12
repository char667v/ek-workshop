"use client";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

import HeroHello from "@/components/ui/hello-word";
import HeroSentence from "@/components/ui/hero-sentence";

import Anemone from "@/components/ui/Anemone/anemone";
// import AnemoneCollage from "@/components/ui/Anemone/anemone-collage";

// The 4 looks
const peachLines = { lineColor: "#F8D9C8", petalColor: "#030816" };
const orangeLines = { lineColor: "orange", petalColor: "#030816" };
const peachFill = { petalColor: "#F8D9C8" };
const orangeFill = { petalColor: "orange" };

// Placed like image 1
// x, y = center of the flower in % of the hero
// size = width in % of the hero width
// delay = seconds; negative means "already this far into the movement", so they don't move in sync
const flowers = [
  // { x: 26, y: 18, size: 19, rotate: 0, delay: -0.4, ...peachLines },
  { x: 87, y: 42, size: 15, rotate: -20, delay: -2.6, ...peachLines },
  { x: 55, y: 51, size: 21, rotate: 0, delay: -1.3, ...peachFill },
  { x: 13, y: 63, size: 27, rotate: -10, delay: -3.5, ...peachLines },
  { x: 73, y: 72, size: 19, rotate: 10, delay: -0.9, ...orangeLines },
  { x: 28, y: 79, size: 23, rotate: -15, delay: -2.0, ...peachFill },
  { x: 10, y: 87, size: 21, rotate: -15, delay: -3.1, ...orangeFill },
  { x: 90, y: 81, size: 23, rotate: 15, delay: -0.2, ...orangeFill },
  { x: 64, y: 88, size: 18, rotate: 5, delay: -1.7, ...peachFill },
  { x: 39, y: 92, size: 17, rotate: 10, delay: -2.9, ...orangeFill },
  { x: 51, y: 92, size: 15, rotate: 0, delay: -3.8, ...peachLines },
  { x: 80, y: 94, size: 19, rotate: -5, delay: -1.0, ...peachLines },
  { x: 23, y: 97, size: 22, rotate: 0, delay: -2.3, ...orangeLines },
  { x: 97, y: 97, size: 15, rotate: 30, delay: -0.6, ...orangeLines },
];

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  return (
    <main className={`${dark ? "dark" : ""} min-h-screen bg-background text-foreground`}>
      <header className="flex justify-end p-4">
        <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
          {dark ? <Moon /> : <Sun />}
        </button>
      </header>

      {/* Image 1. For image 2: replace this section with <AnemoneCollage /> */}
      <section className="relative w-full aspect-[1500/1060] overflow-hidden">
        {flowers.map(({ x, y, size, rotate, delay, ...looks }, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%`, width: `${size}%` }}
          >
            <Anemone variant="petals" size="100%" rotate={rotate} delay={delay} {...looks} />
          </div>
        ))}

        {/* Same size as the section, so the wave lines up with the flowers */}
        {/* <svg className="typing-hero absolute inset-0" style={{ maxWidth: "none" }} viewBox="-35 -150 1500 1060">
          <HeroHello variant="still" />
          <HeroSentence variant="flashlight" shape="wave" />
        </svg> */}
      </section>
    </main>
  );
}


// "use client";
// import { useState } from "react";
// import { Sun, Moon } from "lucide-react";

// import HeroHello from "@/components/ui/hello-word";
// import HeroSentence from "@/components/ui/hero-sentence";

// import Anemone from "@/components/ui/Anemone/anemone";
// import AnemoneCollage from "@/components/ui/Anemone/anemone-collage";

// export default function Portfolio() {
//   const [dark, setDark] = useState(true);

//   const flowers = [
//     { size: 200, rotate: 0 },
//     { size: 120, rotate: 30, variant: "petals" },
//     { size: 160, rotate: 75 },
//     { size: 90, rotate: 140, variant: "petals", petalColor: "orange" },
//     { size: 240, rotate: 200 },
//     { size: 110, rotate: 15, variant: "petals", petalColor: "#F8D9C8" },
//     { size: 180, rotate: 300 },
//     { size: 70, rotate: 45, variant: "petals" },
//     { size: 140, rotate: 260, variant: "petals", petalColor: "orange" },
//     { size: 100, rotate: 110 },
//     { size: 220, rotate: 330, variant: "petals", petalColor: "#F8D9C8" },
//     { size: 130, rotate: 180 },
//   ];

//   return (
//     <main className={`${dark ? "dark" : ""} min-h-screen bg-background text-foreground`}>
//       <header className="flex justify-end p-4">
//         <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
//           {dark ? <Moon /> : <Sun />}
//         </button>
//       </header>

//       <div className="container mx-auto px-4 py-16">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <svg className="typing-hero" viewBox="0 -60 870 960">
//             <HeroHello variant="fade" />
//             <HeroSentence variant="flashlight" />
//           </svg>

//           <div className="mt-auto">
//             {/* <AnemoneCollage /> */}
//             {/* <Anemone /> */}
//             {/* <Anemone variant="petals" petalColor="white" /> */}
//             <Anemone variant="petals" lineColor="orange" petalColor="#030816" />
//             <Anemone variant="petals" lineColor="#F8D9C8" petalColor="#030816" />
//             <Anemone variant="petals" petalColor="orange" />
//             <Anemone variant="petals" petalColor="#F8D9C8" />
//           </div>
//         </div>
//       </div>
//       {/* <div className="flex items-center gap-4 overflow-x-auto">
//         {flowers.map((flower, i) => (
//           <div key={i} className="shrink-0">
//             <Anemone {...flower} />
//           </div>
//         ))}
//       </div> */}
//     </main>
//   );
// }
