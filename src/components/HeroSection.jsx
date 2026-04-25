import { useEffect, useRef, useState } from 'react'
import AutoVideo from './AutoVideo'
import { HERO } from '../config/content'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      // progress 0→1 as the section scrolls from visible to exiting
      const progress = Math.min(Math.max(-top / (height * 0.6), 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const blurProgress = Math.min(Math.max(scrollProgress - 20 / (window.innerHeight * 0.6), 0), 1)

  const headingStyle = {
    transform: `translateY(${-scrollProgress * 180}px)`,
    opacity: 1 - scrollProgress * 1,
    filter: `blur(${blurProgress * 8}px)`,
    transition: 'transform 0.05s linear, opacity 0.05s linear, filter 0.05s linear',
    willChange: 'transform, opacity, filter',
  }

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[480px] overflow-hidden bg-black">
      {/* Gradient base layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-surface to-black" />

      {/* Background video */}
      <AutoVideo
        src={HERO.video}
        poster={HERO.poster}
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* Left-edge darkening overlay (matches Figma gradient direction) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(-26.7deg, rgba(12,12,12,0) 63%, rgba(12,12,12,1) 101%)',
        }}
      />

      {/* Heading — bottom-right on desktop, bottom-left on mobile */}
      <div style={headingStyle} className="absolute bottom-10 sm:bottom-14 lg:bottom-16 right-5 sm:right-10 lg:right-20 text-right">
        {HERO.headingLines.map((line, i) => (
          <p
            key={i}
            className="font-iceland text-white leading-none uppercase whitespace-nowrap
                       text-[clamp(2.5rem,10vw,6.25rem)]"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
