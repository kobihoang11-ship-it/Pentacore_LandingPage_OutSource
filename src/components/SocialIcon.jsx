/**
 * SocialIcon — renders a social media icon from a local SVG file path.
 * Pass the full public path as `src`, e.g. '/assets/icons/instagram.svg'.
 */
export default function SocialIcon({ src, alt = '', className = '' }) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className={`block w-full h-full ${className}`}
      aria-hidden={alt ? undefined : 'true'}
    />
  )
}
