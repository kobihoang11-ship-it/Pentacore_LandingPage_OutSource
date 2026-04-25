/**
 * GridBackground — reusable dark section background with dot-grid pattern.
 * Matches the "Background Pattern / Dark" layer from the Figma design.
 *
 * Props:
 *   direction  'b' | 't' | 'l' | 'r'  – gradient direction (default: 'b')
 *   className  extra Tailwind classes for the wrapper
 *   children   section content (rendered above the background)
 */
export default function GridBackground({ direction = 'b', children, className = '' }) {
  const gradientClass = {
    b: 'bg-gradient-to-b',
    t: 'bg-gradient-to-t',
    l: 'bg-gradient-to-l',
    r: 'bg-gradient-to-r',
  }[direction] ?? 'bg-gradient-to-b'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient base */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${gradientClass} from-[#181818] to-brand-bg`}
      />
      {/* Dot grid overlay (mix-blend-screen keeps it subtle on dark backgrounds) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen grid-dots"
      />
      {/* Content sits above the background layers */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
