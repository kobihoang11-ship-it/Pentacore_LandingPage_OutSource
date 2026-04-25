import GridBackground from './GridBackground'
import { SERVICES } from '../config/content'

export default function ServicesSection() {
  return (
    <GridBackground
      id={SERVICES.id}
      direction="b"
      className="w-full"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[120px] py-20 sm:py-28 lg:py-28">

        {/* Two-column layout: heading left / paragraphs right */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

          {/* Left — large heading */}
          <div className="lg:w-1/2 lg:pr-16 flex items-center">
            <div>
              {SERVICES.headingLines.map((line, i) => (
                <p
                  key={i}
                  className="font-iceland text-white leading-none uppercase
                             text-[clamp(2.25rem,6vw,5rem)]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Right — paragraphs */}
          <div className="lg:w-1/2 flex flex-col gap-5 sm:gap-6 justify-center">
            {SERVICES.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-inter text-white text-sm sm:text-base lg:text-[1.125rem] leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </GridBackground>
  )
}
