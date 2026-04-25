import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let dismissed = false

    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      setFadeOut(true)
      setTimeout(() => setVisible(false), 600)
    }

    // Hard fallback: dismiss after 2s regardless
    const fallbackTimer = setTimeout(dismiss, 2000)

    // Poll until the hero video element is available in the DOM
    const pollInterval = setInterval(() => {
      const video = document.querySelector('video')
      if (!video) return

      clearInterval(pollInterval)

      const checkBuffered = () => {
        const { buffered, duration } = video
        if (
          duration > 0 &&
          buffered.length > 0 &&
          buffered.end(0) / duration >= 0.35
        ) {
          clearTimeout(fallbackTimer)
          video.removeEventListener('progress', checkBuffered)
          dismiss()
        }
      }

      video.addEventListener('progress', checkBuffered)
      // Run immediately in case data is already buffered
      checkBuffered()
    }, 50)

    return () => {
      clearInterval(pollInterval)
      clearTimeout(fallbackTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-bg"
      style={{
        transition: 'opacity 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <svg
        width="144"
        height="141"
        viewBox="0 0 38 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Each path gets a sequential animation delay */}
        {/* Clockwise order: 12h → 2h → 4:30 → 7h → 9h */}
        <path
          d="M3.07031 10.5493L10.8028 10.0695L16.1578 0L21.1255 0.639556L11.216 19.2732L3.07031 10.5493Z"
          fill="#FF3D3D"
          style={{ animation: 'star-seq 2.5s ease-in-out infinite', animationDelay: '0ms' }}
        />
        <path
          d="M22.7518 1.02342L25.6286 8.30434L36.8619 10.2847L37.7885 15.206L17.0015 11.5414L22.7518 1.02342Z"
          fill="#FF3D3D"
          style={{ animation: 'star-seq 2.5s ease-in-out infinite', animationDelay: '500ms' }}
        />
        <path
          d="M37.9457 16.8473L31.6549 21.8535L33.2423 33.1469L28.8474 35.5489L26.0583 14.643L37.9457 16.8473Z"
          fill="#FF3D3D"
          style={{ animation: 'star-seq 2.5s ease-in-out infinite', animationDelay: '1000ms' }}
        />
        <path
          d="M27.4517 36.4501L20.5637 32.2637L10.5546 36.8437L6.91168 33.4069L25.8831 24.4705L27.4517 36.4501Z"
          fill="#FF3D3D"
          style={{ animation: 'star-seq 2.5s ease-in-out infinite', animationDelay: '1500ms' }}
        />
        <path
          d="M5.98317 32.2777L7.6806 24.7404L0 16.4323L2.14345 11.7488L16.5631 27.1916L5.98317 32.2777Z"
          fill="#FF3D3D"
          style={{ animation: 'star-seq 2.5s ease-in-out infinite', animationDelay: '2000ms' }}
        />
      </svg>
    </div>
  )
}
