import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * VideoModal — fullscreen lightbox player.
 *
 * Props:
 *   src     — video URL
 *   poster  — optional poster image
 *   onClose — callback to close the modal
 */
export default function VideoModal({ src, poster, startTime = 0, onClose }) {
  const videoRef = useRef(null)

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Prevent body scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* Auto-play from startTime when opened */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = startTime
    el.play().catch(() => {})
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Container — stops click propagation so clicking the video doesn't close */}
      <div
        className="relative w-full max-w-5xl mx-4 sm:mx-10"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          className="w-full max-h-[85vh] rounded-lg bg-black"
        />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>,
    document.body
  )
}
