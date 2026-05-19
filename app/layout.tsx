import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const siteUrl = 'https://sejours.hermitagelelab.com'
const siteName = "L'Hermitage — Séjours d'entreprise sur-mesure"
const siteTitle = "L'Hermitage | Séjours d'entreprise sur-mesure dans un tiers-lieu d'innovation à 1h40 de Paris"
const siteDescription = "Séminaires, team-buildings et séjours d'entreprise sur-mesure dans un tiers-lieu d'innovation rurale de 30 hectares en forêt patrimoniale, à 1h40 de Paris. 100+ couchages, espaces de travail modulables, restauration et activités nature."
const ogImage = `${siteUrl}/images/grande-maison-1.jpg`

export const viewport: Viewport = {
  themeColor: '#E75754',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | L'Hermitage",
  },
  description: siteDescription,
  applicationName: siteName,
  generator: 'Next.js',
  keywords: [
    "séjour d'entreprise sur-mesure",
    "séminaire entreprise nature",
    "team building Paris",
    "tiers-lieu innovation",
    "séminaire forêt",
    "domaine forestier patrimonial",
    "séminaire 1h40 Paris",
    "séjour entreprise Oise",
    "Autrêches",
    "Compiègne séminaire",
    "lieu atypique séminaire",
    "événement d'entreprise nature",
    "innovation rurale",
    "L'Hermitage Le Lab",
    "retraite d'entreprise",
    "off-site team",
  ],
  authors: [{ name: "L'Hermitage Le Lab" }],
  creator: "L'Hermitage Le Lab",
  publisher: "L'Hermitage Le Lab",
  category: 'Travel',
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "L'Hermitage — Domaine forestier patrimonial de 30 hectares accueillant séminaires et séjours d'entreprise sur-mesure",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
    creator: '@hermitagelelab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: "L'Hermitage Le Lab",
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://www.instagram.com/l_hermitage_/',
        'https://www.facebook.com/projethermitage',
        'https://www.youtube.com/@lhermitage1573',
        'https://www.linkedin.com/company/leprojethermitage/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'reservations',
        telephone: '+33-6-21-17-03-17',
        email: 'laetitia@hermitagelelab.com',
        areaServed: 'FR',
        availableLanguage: ['French', 'English'],
      },
    },
    {
      '@type': ['LodgingBusiness', 'EventVenue', 'Resort'],
      '@id': `${siteUrl}#lodging`,
      name: "L'Hermitage",
      description: siteDescription,
      url: siteUrl,
      image: [
        `${siteUrl}/images/grande-maison-1.jpg`,
        `${siteUrl}/images/hebergement.jpeg`,
        `${siteUrl}/images/dome-people.jpg`,
        `${siteUrl}/images/tipis.jpg`,
      ],
      priceRange: '€€€',
      telephone: '+33-6-21-17-03-17',
      email: 'laetitia@hermitagelelab.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: "17 rue de l'Hermitage",
        addressLocality: 'Autrêches',
        postalCode: '60350',
        addressRegion: 'Hauts-de-France',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 49.3878788,
        longitude: 2.9184413,
      },
      hasMap: "https://www.google.com/maps/place/L'Hermitage+Le+Lab/@49.3878788,2.9184413,17z",
      numberOfRooms: '100+',
      maximumAttendeeCapacity: 250,
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Hébergements (100+ couchages)', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Restauration sur place', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Espaces de travail modulables', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Activités de groupe', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Domaine forestier de 30 hectares', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Tiers-lieu d\'innovation', value: true },
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          name: "Séminaire d'entreprise sur-mesure",
          description: "Séminaires stratégiques en pleine nature à 1h40 de Paris, dans un domaine forestier patrimonial de 30 hectares.",
        },
        {
          '@type': 'Offer',
          name: 'Team building nature',
          description: "Team buildings et activités de cohésion en forêt et en tiers-lieu d'innovation rurale.",
        },
        {
          '@type': 'Offer',
          name: "Événement d'entreprise sur-mesure",
          description: "Événements professionnels jusqu'à 250 personnes : lancements, AG, retraites, off-sites.",
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { '@id': `${siteUrl}#organization` },
      inLanguage: 'fr-FR',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
