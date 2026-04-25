import { useEffect, useRef, useState } from 'react'
import AutoVideo from './AutoVideo'
import { PRODUCTION } from '../config/content'

export default function ProductionSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const [headingOffset, setHeadingOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Disable parallax on mobile/tablet
      if (window.innerWidth < 1024) { setOffset(0); setHeadingOffset(0); return }
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const sectionCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 1.5
      setOffset(sectionCenter - viewportCenter)

      const hEl = headingRef.current
      if (hEl) {
        const hRect = hEl.getBoundingClientRect()
        const headingCenter = hRect.top + hRect.height / 2
        setHeadingOffset(headingCenter - viewportCenter)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // blur based on heading's own distance from viewport center, only when still approaching
  const blurPx = Math.min(Math.max(headingOffset, 0) * 0.018, 4)

  // clamp to 0: elements only shift while section is below center; freeze once at/past center
  const clampedOffset = Math.max(offset, 0)

  const px = (speed) => ({
    transform: `translateY(${clampedOffset * speed}px)`,
    willChange: 'transform',
  })

  const pxText = (speed) => ({
    transform: `translateY(${clampedOffset * speed}px)`,
    filter: `blur(${blurPx}px)`,
    willChange: 'transform, filter',
  })

  return (
    <section ref={sectionRef} className="relative w-full bg-brand-bg overflow-hidden">

      {/* ── Decorative background: spiral — desktop only ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute"
        style={{
          left:      '-14vw',
          top:       '10%',
          width:     '38vw',
          aspectRatio: '1 / 1',
          transform: `rotate(124.47deg) translateY(${clampedOffset * 0.07}px)`,
          willChange: 'transform',
        }}
      >
        <img src="/assets/decor-spiral.svg" alt="" className="w-full h-full" />
      </div>

      {/* ── Decorative background: brand lines / logo watermark — desktop only.
           Width = (1 + 0.0854) * (1 - 0.6986) × 100vw ≈ 32.7vw at max 1440px.
           Height kept as natural SVG ratio via aspect-ratio so it never stretches. ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute"
        style={{
          top:   '22.76%',
          left:  '69.86%',
          right: '-8.54%',
          aspectRatio: '1 / 1',
          ...px(0),
        }}
      >
        <img src="/assets/decor-lines.svg" alt="" className="w-full h-full object-contain object-left-top" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[120px] py-12 sm:py-20 lg:py-16">

        {/* ── Grid: both columns stretch to same height ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-[clamp(1.5rem,4vw,3.75rem)] lg:items-stretch">

          {/* ── Left column: image pinned top, features pinned bottom ── */}
          <div className="flex flex-col gap-[clamp(1.5rem,6vw,4.5rem)] lg:justify-between">

            {/* Portrait image — ratio from Figma: 431×465 */}
            <div style={px(0.5)} className="relative w-full max-w-[100%] sm:max-w-[95%] lg:max-w-[85%] mx-auto lg:mx-0 rounded-lg overflow-hidden aspect-[431/465]">
              <img
                src={PRODUCTION.image}
                alt="Production showcase"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Feature list */}
            <ul style={pxText(0.65)} className="flex flex-col gap-[clamp(2rem,3vw,2.75rem)]">
              {PRODUCTION.features.map((f) => (
                <li key={f.title} className="flex flex-col gap-2">
                  <h3 className="font-iceland text-white text-[clamp(1.25rem,2.5vw,2rem)]">
                    {f.title}
                  </h3>
                  <p className="font-inter text-white/60 text-sm sm:text-base lg:text-[1.125rem] leading-relaxed">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right column: heading pinned top, square video pinned bottom ── */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-0 lg:justify-between">

            {/* Heading */}
            <div ref={headingRef} style={pxText(0.18)}>
              {PRODUCTION.headingLines.map((line, i) => (
                <p
                  key={i}
                  className="font-iceland text-white leading-[0.9] uppercase whitespace-nowrap
                             text-[clamp(2rem,5.2vw,4.75rem)]"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Square video (Figma: 540×546 ≈ 1:1) — bottom of column aligns with features bottom */}
            <div style={px(0.5)} className="relative w-full max-w-[100%] sm:max-w-[95%] lg:max-w-[90%] mx-auto lg:mx-0 lg:ml-auto rounded-lg overflow-hidden aspect-square bg-brand-surface">
              {PRODUCTION.video ? (
                <AutoVideo
                  src={PRODUCTION.video}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-inter">
                  Add video path in content.js
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
