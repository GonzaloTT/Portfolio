// Public presentation settings only.
export const profile = {
  name: 'Gonzalo Magaña Segovia',
  title: 'Full Stack Developer & UX/UI Designer',
  secondaryTitle: 'Software Engineering & Embedded Systems Engineer',
  headerSubtitle: 'SOFTWARE ENGINEER · FULL STACK',
  githubUrl: 'https://github.com/GonzaloTT',
  email: 'gonzalo.magana.1808@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/gonzalo-magana-segovia-software',
  portfolioUrl: 'https://GonzaloTT.github.io/Portfolio/',
  cvUrl: `${import.meta.env.BASE_URL}cv/${encodeURIComponent('Gonzalo_Magaña_CV.pdf')}`,
  portraitPath: '/images/portrait.webp',
  portraitAvailable: false,
  // Local display identifier; not a registered network identity.
  id: 'gonzalo-portfolio',
}

const whatsAppNumber = '+52 442 233 7055'
const whatsAppMessage = 'Hi Gonzalo! I found your portfolio and would like to connect with you about a project or professional opportunity.'

export const whatsApp = {
  number: whatsAppNumber,
  url: `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsAppMessage)}`,
}

export const navigation = [
  { label: 'Home', to: '/#home' },
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Contact', to: '/#contact' },
]

