import { Helmet } from 'react-helmet-async'

interface SeoHeadProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  schema?: Record<string, unknown>
  noIndex?: boolean
}

export default function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  schema,
  noIndex = false,
}: SeoHeadProps) {
  const fullTitle = `${title} | Springboard Indian School, Hyderabad`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
