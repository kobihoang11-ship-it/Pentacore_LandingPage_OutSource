import { useRef, useEffect, useState, useCallback } from 'react'
import { PROJECTS } from '../config/content'
import VideoModal from './VideoModal'

/** Full-width video card with gradient overlay, title, and client tag. */
function ProjectCard({ title, client, video, poster }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
          setPlaying(true)
        } else {
          el.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const openModal = useCallback(() => {
    setStartTime(videoRef.current?.currentTime ?? 0)
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <div
        className="relative w-full overflow-hidden cursor-pointer group"
        style={{ height: 'clamp(240px, 42vw, 1080px)' }}
        onClick={openModal}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dim overlay — fades out when playing */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${playing ? 'opacity-0' : 'opacity-40'}`}
        />

        {/* Play button hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-bg to-transparent" />

        {/* Client tag + title */}
        <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-16 lg:left-[100px] right-4">
          {/* Client indicator */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <span className="block w-5 sm:w-6 h-2 sm:h-2.5 rounded-full bg-brand-red border border-white/40 flex-shrink-0" />
            <span className="font-inter text-white text-sm sm:text-base lg:text-xl">{client}</span>
          </div>

          {/* Project title */}
          <h3
            className="font-iceland text-white leading-none uppercase
                       text-[clamp(1.75rem,5.5vw,4.5rem)]"
          >
            {title}
          </h3>
        </div>
      </div>

      {modalOpen && <VideoModal src={video} poster={poster} startTime={startTime} onClose={closeModal} />}
    </>
  )
}

export default function ProjectsSection() {
  return (
    <section id={PROJECTS.id} className="w-full bg-brand-bg">
      {/* Section heading */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[120px] pt-16 sm:pt-24 pb-10 sm:pb-14">
        <h2 className="font-iceland text-white text-[clamp(2.25rem,6vw,5rem)] leading-none text-center">
          {PROJECTS.heading}
        </h2>
      </div>

      {/* Project cards — edge-to-edge, stacked */}
      <div className="flex flex-col">
        {PROJECTS.items.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  )
}
