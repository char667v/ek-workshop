"use client"

import { useEffect, useRef } from "react"
import Matter from "matter-js"
import {
  Move, Sparkles, Shuffle, MousePointerClick, PaintRoller, Globe,
  Smile, Coffee, SquareRoundCorner, Hash, Pencil, BadgeCheck,
} from "lucide-react"
import { Pill } from "@/components/ui/pill"

// No label = circle
// Label = pill
const pills = [
  { label: "Moving rectangles", icon: Move, variant: "blue" },
  { icon: Sparkles, variant: "yellow" },
  { label: "Prototyping", icon: Shuffle, variant: "gray" },
  { label: "Making it pop", icon: PaintRoller, variant: "orange" },
  { label: "Thinking systems", icon: Globe, variant: "pink" },
  { label: "Improving UX", icon: Smile, variant: "yellow" },
  { label: "Rounding corners", icon: SquareRoundCorner, variant: "lime" },
  { label: "Reframing problems", icon: Hash, variant: "green" },
  { label: "Testing", icon: Pencil, variant: "purple" },

  { icon: MousePointerClick, variant: "gray" },
  { icon: Coffee, variant: "purple" },
  { icon: BadgeCheck, variant: "blue" },
]

export default function PillFalling() {
  const containerRef = useRef(null)
  const pillRefs = useRef([])

  useEffect(() => {
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter
    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()
    const engine = Engine.create()
    const runner = Runner.create()

    // 1. Floor and side walls (invisible, never move)
    const t = 100
    const wall = { isStatic: true }
    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + t / 2, width, t, wall),
      Bodies.rectangle(-t / 2, 0, t, height * 4, wall),
      Bodies.rectangle(width + t / 2, 0, t, height * 4, wall),
    ])

    // 2. One physics body per pill, same size as the pill, starting above the box
    const bodies = pillRefs.current.map((el, i) => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      return Bodies.rectangle(
        w / 2 + Math.random() * (width - w),
        -h - i * 60,
        w,
        h,
        { chamfer: { radius: h / 2 }, angle: (Math.random() - 0.5) * 0.5, restitution: 0.2 }
      )
    })
    Composite.add(engine.world, bodies)

    // 3. Drag with mouse or finger
    const mouse = Mouse.create(container)
    mouse.element.removeEventListener("wheel", mouse.mousewheel) // keep page scrolling
    Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } }))

    // 4. Every frame: move each pill to where its body is
    const sync = () => {
      bodies.forEach((body, i) => {
        const el = pillRefs.current[i]
        const x = body.position.x - el.offsetWidth / 2
        const y = body.position.y - el.offsetHeight / 2
        el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`
      })
    }
    sync()
    Events.on(engine, "afterUpdate", sync)

    // 5. Start the fall when the section is half visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        Runner.run(runner, engine)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(container)

    // 6. Clean up when the component is removed
    return () => {
      observer.disconnect()
      Runner.stop(runner)
      Engine.clear(engine)
      Mouse.clearSourceEvents(mouse)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden select-none">
      {pills.map(({ label, icon: Icon, variant }, i) => (
        <Pill
          key={i}
          ref={(el) => (pillRefs.current[i] = el)}
          variant={variant}
          shape={label ? "pill" : "circle"}
          className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
        >
          {label}
          <Icon size={20} />
        </Pill>
      ))}
    </div>
  )
}