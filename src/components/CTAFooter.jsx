import GridBackground from './GridBackground'
import SocialIcon from './SocialIcon'
import { CTA, FOOTER } from '../config/content'

export default function CTAFooter() {
  return (
    <GridBackground id={CTA.id} direction="t" className="w-full">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[120px] pt-16 sm:pt-24 lg:pt-32 pb-10 sm:pb-14">

        {/* ── CTA block ── */}
        <div className="flex flex-col items-center text-center gap-4 sm:gap-5 mb-16 sm:mb-20 lg:mb-24">
          <h2 className="font-iceland text-white leading-none uppercase text-[clamp(2.25rem,7vw,5rem)]">
            {CTA.heading}
          </h2>
          <p className="font-inter text-white text-sm sm:text-base lg:text-lg max-w-xl">
            {CTA.subheading}
          </p>
        </div>

        {/* ── Divider ── */}
        <hr className="border-t border-white/20 mb-8 sm:mb-10" />

        {/* ── Footer row ── */}
        <div className="flex flex-col sm:flex-row sm:items-stretch justify-between gap-6 sm:gap-0">

          {/* Company info */}
          <div className="flex flex-col justify-between">
            <p className="font-iceland text-white text-2xl sm:text-4xl">
              {FOOTER.companyName}
            </p>
            <a
              href={`mailto:${FOOTER.email}`}
              className="font-inter text-white/60 text-xs sm:text-sm hover:text-white/90 transition-colors"
            >
              {FOOTER.email}
            </a>
          </div>

          {/* Social icons + copyright */}
          <div className="flex flex-col items-start sm:items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              {FOOTER.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-muted hover:bg-white/10 transition-colors"
                >
                  <span className="block w-4 h-4">
                    <SocialIcon src={social.icon} alt={social.name} />
                  </span>
                </a>
              ))}
            </div>
            <p className="font-inter text-white/30 text-xs sm:text-sm">
              © {new Date().getFullYear()} {FOOTER.companyName} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </GridBackground>
  )
}
