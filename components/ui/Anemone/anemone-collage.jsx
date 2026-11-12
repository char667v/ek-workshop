import Anemone from "./anemone";

// The 4 looks
const orangeLines = { variant: "petals", lineColor: "orange", petalColor: "#030816" };
const peachLines = { variant: "petals", lineColor: "#F8D9C8", petalColor: "#030816" };
const orange = { variant: "petals", petalColor: "orange" };
const peach = { variant: "petals", petalColor: "#F8D9C8" };

// x, y = center of the flower in % of the collage
// size = width in % of the collage width
const flowers = [
  { x: 0, y: 62, size: 17, rotate: 250, ...peach },
  { x: 5, y: 38, size: 13, rotate: 60, ...orangeLines },
  { x: 10, y: 70, size: 15, rotate: 135, ...orange },
  { x: 15, y: 45, size: 19, rotate: 265, ...peachLines },
  { x: 20, y: 75, size: 12, rotate: 350, ...peach },
  { x: 25, y: 40, size: 14, rotate: 140, ...orange },
  { x: 30, y: 66, size: 18, rotate: 20, ...orangeLines },
  { x: 35, y: 35, size: 12, rotate: 185, ...peach },
  { x: 40, y: 60, size: 16, rotate: 75, ...peachLines },
  { x: 45, y: 78, size: 13, rotate: 290, ...orange },
  { x: 50, y: 42, size: 17, rotate: 350, ...orangeLines },
  { x: 55, y: 70, size: 14, rotate: 130, ...peach },
  { x: 60, y: 38, size: 12, rotate: 215, ...orange },
  { x: 65, y: 62, size: 19, rotate: 155, ...peachLines },
  { x: 70, y: 32, size: 13, rotate: 190, ...peach },
  { x: 75, y: 72, size: 15, rotate: 40, ...orangeLines },
  { x: 80, y: 45, size: 17, rotate: 265, ...orange },
  { x: 85, y: 75, size: 12, rotate: 95, ...peachLines },
  { x: 90, y: 50, size: 16, rotate: 315, ...peach },
  { x: 95, y: 30, size: 12, rotate: 10, ...orange },
  { x: 100, y: 65, size: 17, rotate: 170, ...orangeLines },
];

export default function AnemoneCollage() {
  return (
    // 200% wide on phones (cropped at the sides) so the flowers aren't tiny, full width from md
    <div className="relative left-1/2 -translate-x-1/2 w-[200%] md:w-full aspect-[4/1]">
      {flowers.map(({ x, y, size, rotate, ...looks }, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%`, width: `${size}%` }}
        >
          <Anemone size="100%" rotate={rotate} {...looks} />
        </div>
      ))}
    </div>
  );
}