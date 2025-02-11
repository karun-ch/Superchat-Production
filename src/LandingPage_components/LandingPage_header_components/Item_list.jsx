import { Helmet } from "react-helmet-async";

export default function ItemList({ 
  title, 
  description, 
  logo,
  // SEO props
  metaTitle = title,
  metaDescription = description,
  imageAlt = title,
  itemUrl,
  category,
  tags = [],
  canonicalUrl,
  ogImage = logo
}) {
  // Generate structured data for each item
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": logo,
    ...(category && { "category": category }),
    ...(tags.length > 0 && { "keywords": tags.join(", ") }),
    ...(itemUrl && { "url": itemUrl })
  };

  const ContentWrapper = itemUrl ? 'a' : 'div';
  const wrapperProps = itemUrl ? { 
    href: itemUrl,
    rel: "noopener noreferrer",
    className: "block hover:shadow-lg transition-shadow duration-300"
  } : {};

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        {tags.length > 0 && <meta name="keywords" content={tags.join(", ")} />}

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        {itemUrl && <meta property="og:url" content={itemUrl} />}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article className="flex flex-col items-center bg-white shadow-md rounded-lg p-1 w-full max-w-[320px] mx-auto">
        <ContentWrapper {...wrapperProps}>
          <div className="w-full">
            <img
              src={logo}
              alt={imageAlt}
              className="w-full h-32 md:h-40 object-cover rounded-lg mb-4"
              loading="lazy"
              width="320"
              height="160"
            />
            <div className="text-start w-full p-3">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                {description}
              </p>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ContentWrapper>
      </article>
    </>
  );
}