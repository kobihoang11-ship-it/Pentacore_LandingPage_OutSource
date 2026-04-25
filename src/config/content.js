// =============================================================================
// 📝  CONTENT CONFIGURATION
//     Chỉnh sửa file này để thay đổi toàn bộ nội dung của landing page.
//     Edit this file to update all text, images, and videos on the page.
// =============================================================================
//
// 📂  Asset placement guide (put files in the /public/ folder):
//       Logo SVG     →  public/assets/logo.svg
//       Favicon      →  public/assets/favicon.svg
//       Videos       →  public/videos/<name>.mp4
//       Images       →  public/assets/<name>.jpg  (or .png / .webp)
//
// =============================================================================

// ── Site-wide ─────────────────────────────────────────────────────────────
export const SITE = {
  title:       'Pentacore Animation Studio',
  description: 'End-to-end animation solutions for the global market.',
  email:       'info@pentacorestudio.com',
}

// ── Header ────────────────────────────────────────────────────────────────
export const HEADER = {
  logo: {
    src: '/assets/logo.svg',   // ✅ downloaded from Figma
    alt: 'Pentacore',
  },
  // Add navigation links here (leave empty to hide nav):
  navLinks: [
    // { label: 'Services',  href: '#services'    },
    // { label: 'Projects',  href: '#projects'    },
    // { label: 'Studio',    href: '#studio'      },
    // { label: 'Contact',   href: '#contact'     },
  ],
}

// ── Hero ──────────────────────────────────────────────────────────────────
export const HERO = {
  // 📂 Figma videos must be placed manually — copy your .mp4 into public/videos/
  video:        '/videos/hero.mp4',
  poster:       '',                          // Optional thumbnail (jpg/png)
  headingLines: ['ENDLESS', 'IMAGINATION'],  // Each string = one line
}

// ── Services & Mission ────────────────────────────────────────────────────
export const SERVICES = {
  id:           'services',
  logoMark:     '/assets/logo-mark.svg',  // ✅ downloaded from Figma
  headingLines: ['OUR SERVICES', 'AND MISSION'],
  paragraphs: [
    'From the bustling creative hubs of Vietnam, Pentacore Animation Studio provides end-to-end animation solutions for the global market.',
    'We partner with brands and studios to deliver top-tier game cinematics, commercials and TV series that stand out in a crowded digital landscape.',
    'Beyond services, Pentacore is on a mission to produce original animated feature films, dedicated to bringing unique, high-quality cinematic experiences to the Vietnamese audience.',
  ],
}

// ── Built for Modern Production ───────────────────────────────────────────
export const PRODUCTION = {
  headingLines: ['BUILT FOR MODERN', 'PRODUCTION'],
  // Static portrait image (left card) — ✅ downloaded from Figma
  image:        '/assets/production-image.png',
  // Landscape video (right card) — 📂 copy your .mp4 into public/videos/
  video:        '/videos/production.mp4',
  features: [
    {
      title:       'Faster Turnaround',
      description: 'Reduce production time without compromising quality.',
    },
    {
      title:       'Cost Efficiency',
      description: 'Optimize resources with smarter, scalable workflows.',
    },
    {
      title:       'Seamless Collaboration',
      description: 'Work across teams with a streamlined pipeline.',
    },
  ],
}

// ── Our Projects ──────────────────────────────────────────────────────────
export const PROJECTS = {
  id:      'projects',
  heading: 'OUR PROJECTS',
  // 📂 Videos must be placed manually in public/videos/projects/
  items: [
    {
      id:     'bcg',
      title:  'BCG Trailer',
      client: 'Block Clan game',
      video:  '/videos/projects/bcg.mp4',
      poster: '',
    },
    {
      id:     'revenge',
      title:  'Revenge Trailer',
      client: 'Revenge the game',
      video:  '/videos/projects/revenge.mp4',
      poster: '',
    },
    {
      id:     'mavia',
      title:  'Mavia Trailers',
      client: 'Heroes of Mavia',
      video:  '/videos/projects/mavia.mp4',
      poster: '',
    },
  ],
}

// ── Shorts Gallery ────────────────────────────────────────────────────────
export const SHORTS = {
  heading:    'Mavia Shorts',
  subheading: 'Hover to play',
  // 📂 Videos must be placed manually in public/videos/shorts/
  items: [
    { id: 1, video: '/videos/shorts/1.mp4', poster: '' },
    { id: 2, video: '/videos/shorts/2.mp4', poster: '' },
    { id: 3, video: '/videos/shorts/3.mp4', poster: '' },
    { id: 4, video: '/videos/shorts/4.mp4', poster: '' },
  ],
}

// ── Our Studio ────────────────────────────────────────────────────────────
export const STUDIO = {
  id:               'studio',
  heading:          'OUR STUDIO',
  description:      'High-fidelity visuals, high-level security. Our TPN-compliant workflow ensures that every frame of your project is handled with the highest degree of reliability.',
  imageTop:         '/assets/studio/1.png',       // ✅ large top-right image
  imageBottomLeft:  '/assets/studio/2.png',        // ✅ bottom-left image
  imageBottomRight: '/assets/studio/3.png',        // 📂 replace with a third studio photo
  features: [
    {
      id:          'security',
      title:       'SECURITY FIRST',
      description: 'Encrypted storage, and role-based access control to protect your projects at every stage.',
    },
    {
      id:          'workflow',
      title:       'RELIABLE WORKFLOW',
      description: 'A well-structured production pipeline ensures clear task tracking, efficient collaboration, and consistent delivery from start to finish.',
    },
    {
      id:          'infrastructure',
      title:       'SECURE INFRASTRUCTURE',
      description: 'Robust infrastructure, regular backups, and secure data management ensure smooth collaboration and data integrity.',
    },
  ],
  locations: [
    { city: 'HANOI',      label: 'MAIN HEADQUARTER' },
    { city: 'SAIGON',     label: '' },
    { city: 'NEW JERSEY', label: '' },
  ],
}

// ── CTA ──────────────────────────────────────────────────────────────────
export const CTA = {
  id:          'contact',
  heading:     "LET'S GET STARTED",
  subheading:  'Turn your idea into a production plan. Request a quote now.',
  buttonText:  'Request a Quote',
  buttonHref:  'mailto:info@pentacorestudio.com',  // Change to your contact URL
}

// ── Footer ────────────────────────────────────────────────────────────────
export const FOOTER = {
  companyName: 'Pentacore Animation Std.',
  email:       'info@pentacorestudio.com',
  // icon paths point to ✅ downloaded SVGs in public/assets/icons/
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/pentacore.studio', icon: '/assets/icons/instagram.svg' },
    { name: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61578499433487', icon: '/assets/icons/facebook.svg'  },
    { name: 'Twitter/X', href: 'https://x.com/PentacoreStudio',  icon: '/assets/icons/twitter.svg'   },
    { name: 'Vimeo',     href: 'https://vimeo.com/user256106324',    icon: '/assets/icons/vimeo.svg'     },
    { name: 'YouTube',   href: 'https://www.youtube.com/@PentacoreStudio',  icon: '/assets/icons/youtube.svg'   },
  ],
}
