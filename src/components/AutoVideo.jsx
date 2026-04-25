/**
 * AutoVideo — muted, looping, auto-playing video for background / showcase use.
 *
 * Props mirror <video> attributes.
 * Passes all extra props to the underlying <video> element.
 */
export default function AutoVideo({ src, poster, className = '', style, ...props }) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      className={className}
      style={style}
      {...props}
    />
  )
}
