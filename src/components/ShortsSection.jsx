import { useRef, useState, useCallback, useEffect } from 'react'
import GridBackground from './GridBackground'
import { SHORTS } from '../config/content'
import VideoModal from './VideoModal'

/** Portrait video card — plays on hover (desktop) or tap (mobile). */
function ShortCard({ video, poster }) {
  const ref = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [startTime, setStartTime] = useState(0)

  const tryPlay = () => {
    if (ref.current) {
      ref.current.play().catch(() => {/* autoplay blocked — no-op */})
    }
  }

  const tryPause = () => {
    if (ref.current) {
      ref.current.pause()
      ref.current.currentTime = 0
    }
  }

  // Mobile: play/pause via IntersectionObserver when card scrolls into view
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only auto-play on touch devices (mobile/tablet)
        if (!window.matchMedia('(hover: none)').matches) return
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
          video.currentTime = 0
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const openModal = useCallback(() => {
    setStartTime(ref.current?.currentTime ?? 0)
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <div
        className="relative rounded-lg overflow-hidden aspect-[9/16] cursor-pointer group"
        onMouseEnter={tryPlay}
        onMouseLeave={tryPause}
        onClick={openModal}
      >
        <video
          ref={ref}
          src={video}
          poster={poster}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dim overlay fades out on hover/play */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />

        {/* Play button hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {modalOpen && <VideoModal src={video} poster={poster} startTime={startTime} onClose={closeModal} />}
    </>
  )
}

export default function ShortsSection() {
  return (
    <GridBackground direction="b" className="w-full">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[120px] py-16 sm:py-24 lg:py-32">

        {/* Heading */}
        <div className="flex flex-col items-center gap-3 mb-10 sm:mb-14 text-center">
          <h2 className="font-iceland text-white text-[clamp(2.25rem,6vw,5rem)] leading-none">
            {SHORTS.heading}
          </h2>
          <p className="font-inter text-white/60 text-base sm:text-lg lg:text-xl">
            {SHORTS.subheading}
          </p>
        </div>

        {/* 4-column grid — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {SHORTS.items.map((s) => (
            <ShortCard key={s.id} video={s.video} poster={s.poster} />
          ))}
        </div>
      </div>
    </GridBackground>
  )
}
