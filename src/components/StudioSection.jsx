import { useEffect, useRef, useState } from 'react'
import { STUDIO } from '../config/content'

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const IconSecurity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-primary">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.14 8 11.32C16.5 22.14 20 17.25 20 12V6L12 2z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const IconWorkflow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-primary">
    <rect x="3" y="3" width="5" height="5" rx="1" />
    <rect x="16" y="3" width="5" height="5" rx="1" />
    <rect x="9.5" y="16" width="5" height="5" rx="1" />
    <path d="M5.5 8v3a1 1 0 001 1h11a1 1 0 001-1V8" />
    <path d="M12 12v4" />
  </svg>
)

const IconInfrastructure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-primary">
    <rect x="2" y="4" width="20" height="5" rx="1" />
    <rect x="2" y="10" width="20" height="5" rx="1" />
    <rect x="2" y="16" width="20" height="5" rx="1" />
    <circle cx="6" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="6" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="6" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const FEATURE_ICONS = {
  security:       <IconSecurity />,
  workflow:        <IconWorkflow />,
  infrastructure: <IconInfrastructure />,
}

export default function StudioSection() {
  const sectionRef   = useRef(null)
  const headingRef   = useRef(null)
  const [offset, setOffset]               = useState(0)
  const [headingOffset, setHeadingOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) { setOffset(0); setHeadingOffset(0); return }
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setOffset(rect.top + rect.height / 2 - window.innerHeight / 2)

      const hEl = headingRef.current
      if (hEl) {
        const hRect = hEl.getBoundingClientRect()
        setHeadingOffset(hRect.top + hRect.height / 2 - window.innerHeight / 2)
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

  const blurPx      = Math.min(Math.max(headingOffset, 0) * 0.018, 4)
  const clampedOffset = Math.max(offset, 0)

  const px = (speed) => ({
    transform:   `translateY(${clampedOffset * speed}px)`,
    willChange:  'transform',
  })

  const pxText = (speed) => ({
    transform:   `translateY(${clampedOffset * speed}px)`,
    filter:      `blur(${blurPx}px)`,
    willChange:  'transform, filter',
  })

  return (
    <section ref={sectionRef} id={STUDIO.id} className="relative w-full bg-brand-bg overflow-hidden">

      {/* ── Decor: brand lines — left edge, desktop only ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute"
        style={{
          top:         '29.89%',
          left:        '-15.28%',
          right:       '76.6%',
          aspectRatio: '1 / 1',
          ...px(0.05),
        }}
      >
        <img src="/assets/decor-lines.svg" alt="" className="w-full h-full object-contain object-right-top" />
      </div>

      {/* ── Decor: spiral — right edge, desktop only ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute"
        style={{
          top:         '-13%',
          right:       '-14vw',
          width:       '56vw',
          aspectRatio: '1 / 1',
          transform:   `rotate(134.86deg) translateY(${clampedOffset * 0.07}px)`,
          willChange:  'transform',
        }}
      >
        <img src="/assets/decor-spiral.svg" alt="" className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[120px] py-16 sm:py-24 lg:py-32">

        {/* ── 2-column grid: left = text + features + locations, right = images ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-6 sm:gap-8">

            {/* Heading + description */}
            <div ref={headingRef} style={px(0.1)} className="flex flex-col gap-4 sm:gap-5">
              <h2 className="font-iceland text-white leading-none uppercase text-[clamp(2.25rem,5vw,4rem)]">
                {STUDIO.heading}
              </h2>
              <p className="font-inter text-white text-sm sm:text-base leading-relaxed">
                {STUDIO.description}
              </p>
            </div>

            {/* Divider */}
            <div style={px(0.12)} className="w-full h-px bg-brand-border" />

            {/* 3 feature columns */}
            <div style={px(0.14)} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STUDIO.features.map((feat) => (
                <div key={feat.id} className="flex flex-col gap-3">
                  <div>{FEATURE_ICONS[feat.id]}</div>
                  <p className="font-space-grotesk font-semibold text-white text-xs tracking-[0.08em] uppercase">
                    {feat.title}
                  </p>
                  <p className="font-inter text-white/60 text-xs leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Location badges — aligned to features columns */}
            <div style={pxText(0.2)} className="grid grid-cols-3 gap-3 sm:gap-4">
              {STUDIO.locations.map((loc) => (
                <div
                  key={loc.city}
                  className="border border-brand-border rounded-xl px-5 py-4 min-w-[120px]"
                >
                  <p className="font-space-grotesk font-medium text-white text-sm sm:text-base tracking-[-0.05em]">
                    {loc.city}
                  </p>
                  {loc.label && (
                    <p className="font-inter text-white/60 text-xs sm:text-[0.7rem] tracking-[-0.02em] mt-0.5">
                      {loc.label}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* ── Right column: large image on top, two smaller below ── */}
          <div className="flex flex-col gap-4">

            {/* Top large image */}
            <div style={px(0.12)} className="w-full rounded-lg overflow-hidden aspect-[578/380]">
              <img
                src={STUDIO.imageTop}
                alt="Studio team at work"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom two images side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div style={px(0.14)} className="w-full rounded-lg overflow-hidden aspect-[4/3]">
                <img
                  src={STUDIO.imageBottomLeft}
                  alt="Studio space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div style={px(0.2)} className="w-full rounded-lg overflow-hidden aspect-[4/3]">
                <img
                  src={STUDIO.imageBottomRight}
                  alt="Studio equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

