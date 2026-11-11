export const site = {
  url: 'https://www.rifad.site',
  name: 'Rifad',
  geo: { lat: 11.2588, lng: 75.7804, region: 'IN-KL', place: 'Kozhikode' },
}

export const profile = {
  name: 'Muhammed Rifad KP',
  short: 'Rifad',
  role: 'Full-stack developer',
  city: 'Calicut, Kerala',
  locality: 'Kozhikode',
  region: 'Kerala',
  country: 'IN',
  email: 'muhammedrifadkp3@gmail.com',
  phone: '+91 73568 52496',
  phoneHref: 'tel:+917356852496',
  whatsapp: 'https://wa.me/917356852496',
  resume: '/Muhammed-Rifad-KP-Resume-.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/muhammedrifadkp' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/muhammed-rifad-64a7172b9' },
    { label: 'Instagram', href: 'https://www.instagram.com/mohd_rifad_/' },
  ],
}

export const waLink = (text) => `${profile.whatsapp}?text=${encodeURIComponent(text)}`

const noPhone = ['cdc-attendance', 'my-ecommerce', 'rain-forest']
const img = (n) => ({
  src: `/work/${n}-1600.webp`,
  small: `/work/${n}-800.webp`,
  phone: noPhone.includes(n) ? null : `/work/${n}-phone.webp`,
})

export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '')

/* category: client | app | lab */
export const projects = [
  {
    slug: 'pixel-conversions',
    name: 'Pixel Conversions',
    kind: 'Web and growth agency',
    category: 'client',
    pitch: 'An agency site that sells custom Next.js builds, Shopify stores and paid growth, and turns visitors into booked calls.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shopify'],
    points: ['Service pages built to convert', 'Shopify and Next.js case studies', 'SEO set up from day one'],
    url: 'https://www.pixelconversions.com/',
    code: 'https://github.com/muhammedrifadkp/pixel-conversions',
    tint: '#e9eef6',
    ...img('pixelconversions'),
  },
  {
    slug: 'zhm-real-estate',
    name: 'ZHM Real Estate',
    kind: 'Property portal, Dubai and Abu Dhabi',
    category: 'client',
    pitch: 'Luxury listings for two emirates, with property search and enquiry forms that land straight in the sales team’s inbox.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    points: ['Listings across Dubai and Abu Dhabi', 'Lead capture on every property', 'Built mobile first'],
    url: 'https://zhmrealestatellc.ae',
    code: 'https://github.com/muhammedrifadkp/zhmrealestatellc',
    tint: '#e9edf2',
    ...img('zhmrealestatellc'),
  },
  {
    slug: 'ag-star',
    name: 'AG Star Automobiles',
    kind: 'Motorcycle accessories store',
    category: 'client',
    pitch: 'An accessories shop with a Bike Finder: pick your motorcycle and see only the parts that fit it.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    points: ['Bike Finder compatibility search', 'Cart and checkout flow', 'Server-rendered for search'],
    url: 'https://agstarautomobiles.vercel.app',
    code: 'https://github.com/muhammedrifadkp/agstarautomobiles',
    tint: '#ececec',
    ...img('agstarautomobiles'),
  },
  {
    slug: 'ad-firms',
    name: 'Ad Firms',
    kind: 'Business setup, Dubai',
    category: 'client',
    pitch: 'Mainland and free-zone company packages priced on the page, with a WhatsApp line to a consultant one tap away.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'WhatsApp'],
    points: ['Mainland and free-zone package pricing', 'WhatsApp consultation', 'Lead funnel'],
    url: 'https://businesssetup.ad-firms.com',
    code: 'https://github.com/muhammedrifadkp/adfirms',
    tint: '#e7eef0',
    ...img('adfirms'),
  },
  {
    slug: 'fixerland',
    name: 'Fixerland',
    kind: 'Phone repair shop, Kasaragod',
    category: 'client',
    pitch: 'A repair shop that takes bookings online: choose the device, see the fix, book it on WhatsApp.',
    stack: ['JavaScript', 'HTML', 'CSS', 'WhatsApp'],
    points: ['Repair booking flow', 'WhatsApp booking', 'Device and price pages'],
    url: 'https://www.fixerland.com/',
    code: 'https://github.com/muhammedrifadkp/fixerland',
    tint: '#eef0f3',
    ...img('fixerland'),
  },
  {
    slug: 'ztoiq',
    name: 'Ztoiq',
    kind: 'E-commerce store',
    category: 'client',
    pitch: 'A full online store: catalogue, category filters, cart and checkout.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    points: ['Catalogue with filters', 'Persistent cart', 'Checkout flow'],
    url: 'https://ztoiq.com/',
    code: 'https://github.com/muhammedrifadkp/ztoiq',
    tint: '#eceef1',
    ...img('ztoiq'),
  },
  {
    slug: 'cdc-attendance',
    name: 'CDC Attendance',
    kind: 'Attendance system for an institute',
    category: 'app',
    pitch: 'Admins, faculty and students each get their own view of lab attendance, behind JWT login.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    points: ['Three roles with their own access', 'Lab attendance reports', 'JWT and bcrypt security'],
    url: 'https://cdc-attendance-com.vercel.app',
    code: 'https://github.com/muhammedrifadkp/CDC_Attendance',
    tint: '#e8edf5',
    ...img('cdc-attendance'),
  },
  {
    slug: 'daily-horeca',
    name: 'Daily Horeca',
    kind: 'Supplies for hotels and cafés',
    category: 'client',
    pitch: 'Hotels, restaurants and caterers order their daily supplies and bulk ingredients in one place.',
    stack: ['JavaScript', 'HTML', 'CSS', 'REST'],
    points: ['B2B order requests', 'Product catalogue', 'Fast, light pages'],
    url: 'https://www.dailyhoreca.com',
    code: 'https://github.com/muhammedrifadkp/Daily-Horeca',
    tint: '#eef1ea',
    ...img('dailyhoreca'),
  },
  {
    slug: 'one-pack',
    name: 'One Pack Online',
    kind: 'Bio-disposable packaging supplier',
    category: 'client',
    pitch: 'Bio-disposable packaging for restaurants, hotels, cafés and bakeries, with a product catalogue and ordering on WhatsApp.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    points: ['Product catalogue', 'Ordering on WhatsApp', 'Lean bundle'],
    url: 'https://www.onepackonline.com/',
    code: 'https://github.com/muhammedrifadkp/one-pack',
    tint: '#ebedf0',
    ...img('onepackonline'),
  },
  {
    slug: 'rasdent',
    name: 'Rasdent',
    kind: 'Dental clinic',
    category: 'client',
    pitch: 'A dental clinic with treatments, prices and online appointment booking.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    points: ['Appointment booking', 'Treatment catalogue', 'Mobile first'],
    url: 'https://rasdent.in',
    code: 'https://github.com/muhammedrifadkp/rasdent',
    tint: '#e9f1f2',
    ...img('rasdent'),
  },
  {
    slug: 'b4-baking',
    name: 'B4 Baking',
    kind: 'Bakery ingredient supplier',
    category: 'client',
    pitch: 'Bulk baking ingredients for bakeries and commercial kitchens, with enquiry forms.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    points: ['Product showcase', 'Supply enquiries'],
    url: 'https://www.b4baking.com',
    code: 'https://github.com/muhammedrifadkp/B4-Baking',
    tint: '#eef0f2',
    ...img('b4baking'),
  },
  {
    slug: 'chillera',
    name: 'Chillera',
    kind: 'Frozen food delivery',
    category: 'client',
    pitch: 'Frozen and ready-to-cook foods, stored cold and delivered to the door.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    points: ['Frozen, fresh and fast ranges', 'Ordering on WhatsApp'],
    url: 'https://www.chillera.co.in',
    code: 'https://github.com/muhammedrifadkp/Chillera',
    tint: '#e6eef4',
    ...img('chillera'),
  },
  {
    slug: 'zuditt',
    name: 'Zuditt AI',
    kind: 'AI services company',
    category: 'app',
    pitch: 'The company site for an AI and digital services firm, where I also worked as a full-stack developer.',
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js'],
    points: ['AI service integrations', 'Server-side rendering'],
    url: 'https://www.zuditt.com/',
    code: 'https://github.com/muhammedrifadkp/zuditt-next',
    tint: '#eaeaf0',
    ...img('zuditt'),
  },
  {
    slug: 'freshmarket',
    name: 'FreshMarket',
    kind: 'Grocery store with admin panel',
    category: 'app',
    pitch: 'A MERN shop with accounts, an admin panel and orders sent straight to WhatsApp.',
    stack: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    points: ['Cart saved in the database', 'WhatsApp order dispatch', 'Admin portal'],
    url: 'https://my-ecommerce-black.vercel.app/',
    code: 'https://github.com/muhammedrifadkp/my-ecommerce',
    tint: '#ebf1e8',
    ...img('my-ecommerce'),
  },
  {
    slug: 'nasiha',
    name: 'Nasiha Sara',
    kind: 'Portfolio for an architectural designer',
    category: 'lab',
    pitch: 'A portfolio for an architectural designer and 3D visualiser, with her projects and a CV to download.',
    stack: ['React', 'Tailwind CSS', 'Vercel'],
    points: ['Project gallery', 'CV download', 'Responsive layout'],
    url: 'https://nasiha-arc.vercel.app',
    code: 'https://github.com/muhammedrifadkp/nasiha',
    tint: '#eeeef0',
    ...img('nasiha'),
  },
  {
    slug: 'rainforest',
    name: 'Rainforest',
    kind: '2D platformer game',
    category: 'lab',
    pitch: 'A browser platformer on HTML5 canvas with its own game loop and collision physics.',
    stack: ['Canvas', 'JavaScript'],
    points: ['Game loop', 'Collision detection', 'Keyboard controls'],
    url: 'https://rain-forest.vercel.app',
    code: 'https://github.com/muhammedrifadkp/rain-forest-game',
    tint: '#e8f0ea',
    ...img('rain-forest'),
  },
]

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Client sites' },
  { id: 'app', label: 'Web apps' },
  { id: 'lab', label: 'Experiments' },
]

/* the three that play on the workstation screen */
export const onScreen = ['pixel-conversions', 'zhm-real-estate', 'ag-star']
export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))

export const services = [
  {
    name: 'Business websites',
    text: 'Fast, search-ready sites for clinics, agencies, real estate and service companies, with enquiries going to WhatsApp or email.',
  },
  {
    name: 'Online stores',
    text: 'Catalogues, filters, carts and checkout, from a small shop to a store with a custom product finder.',
  },
  {
    name: 'Web apps',
    text: 'Logins, roles, dashboards and APIs on React, Node.js and MongoDB, like the attendance system running at an institute today.',
  },
  {
    name: '3D on the web',
    text: 'Interactive models and scroll scenes in Three.js, like the workstation and the flight on this page.',
  },
]

export const experience = [
  {
    when: '2023 – now',
    role: 'Freelance full-stack developer',
    where: 'Clients in the UAE and India',
    text: 'Sites and stores for businesses in Dubai, Abu Dhabi and India: AG Star’s Bike Finder, ZHM’s property portal, Ad Firms’ setup packages, and the CDC attendance system.',
    shots: ['agstarautomobiles', 'zhmrealestatellc', 'adfirms'],
  },
  {
    when: '6 months',
    role: 'Full-stack developer',
    where: 'Zuditt AI',
    text: 'Built React and Next.js dashboards and wired AI services into the product through secure REST APIs.',
    shots: ['zuditt'],
  },
  {
    when: '1 year',
    role: 'Full-stack instructor',
    where: 'CADD Centre, Kasaragod',
    text: 'Taught HTML, CSS, JavaScript, React, Node.js and MongoDB, and saw students through their capstone builds.',
  },
  {
    when: 'Now',
    role: 'IT lab teacher',
    where: 'Sirajul Huda',
    text: 'I write and teach the IT syllabus from Plus One to PG, and publish it as its own site.',
    shots: ['sirajul-huda'],
    link: { label: 'Open the syllabus site', href: 'https://sirajul-huda-it-lab.vercel.app' },
  },
]

export const education = [
  { when: '2021 – 2024', what: 'Bachelor of Computer Applications', where: 'Yenepoya University, Mangaluru' },
  { when: '2019 – 2021', what: 'Higher Secondary, Computer Science', where: 'Emjay VHSS, Calicut' },
  { when: '2018 – 2019', what: 'SSLC', where: 'SS HSS Moorkanad, Calicut' },
]

export const skills = [
  { group: 'Front end', items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML and CSS'] },
  { group: 'Back end', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT auth'] },
  { group: 'Motion and 3D', items: ['Three.js', 'React Three Fiber', 'GSAP'] },
  { group: 'Shipping', items: ['Git and GitHub', 'Vercel', 'SEO', 'Shopify'] },
]

/* how a project goes, in the order it happens */
export const process = [
  {
    title: 'You tell me what you need.',
    text: 'Send a message on WhatsApp or by email. We have a short call, and I come back with a plan and a price before any work starts.',
  },
  {
    title: 'I design it around your customers.',
    text: 'Pages, wording and layout are planned for the people who will use the site, and for a phone screen first.',
  },
  {
    title: 'I build it where you can see it.',
    text: 'You get a preview link while I build, so you watch the site take shape and can ask for changes while they are still easy.',
  },
  {
    title: 'It goes live, and I stay.',
    text: 'I connect your domain, set the site up for Google and hand it over. Updates, fixes and new pages are covered after launch.',
  },
]

export const stack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Three.js', 'Express', 'Shopify', 'Vercel']

export const faqs = [
  { q: 'What do you build?', a: 'Business websites, online stores and web apps, front end to database. If you need 3D or motion on the page, that too.' },
  { q: 'How long does a project take?', a: 'Most websites take two to four weeks. Larger apps take one to three months, depending on what they have to do.' },
  { q: 'Do you look after the site after launch?', a: 'Yes. I offer ongoing maintenance and support, so updates, fixes and new pages are covered.' },
  { q: 'What does a website cost?', a: 'Every project is priced on what it has to do. Tell me the pages and features you need, and I send a plan with a price before any work starts.' },
  { q: 'Which technologies do you use?', a: 'Next.js and React on the front end, Node.js, Express and MongoDB on the back end, Tailwind CSS for styling and Vercel for hosting. For stores I also work with Shopify.' },
  { q: 'Where are you based, and who do you work with?', a: 'I work from Calicut (Kozhikode) in Kerala, India, with businesses in the UAE and across India. Everything happens online, over WhatsApp, email and calls.' },
  { q: 'How do we start?', a: 'Send a message on WhatsApp or by email with what you have in mind. We set up a short call and I come back with a plan and a price.' },
]
