import { Helmet } from 'react-helmet-async';
import ItemList from './Item_list';

export default function DevelopersList({ 
  title, 
  description, 
  logo, 
  items, 
  bg_svg,
  // New SEO props
  metaTitle = title,
  metaDescription = description,
  keywords = '',
  ogImage = logo
}) {
  // Generate structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.title,
      "description": item.description,
      "image": item.logo
    }))
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />

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

      <div className="mb-8 md:mb-14 relative">
        <div className="flex flex-col justify-center items-center bg-white shadow-md mx-4 md:mx-20 rounded-lg">
          {/* Background SVG */}
          <div
            className="absolute w-40 h-40 md:w-fit md:h-fit bg-contain bg-no-repeat bg-left-bottom"
           
            role="presentation"
            aria-hidden="true"
          ></div>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row p-2 mt-8 md:mt-14 relative z-10">
            {/* Logo Image */}
            <div className="w-full md:w-2/6 px-4 md:px-6 mt-4 md:mt-0 order-1 md:order-2">
              <img 
                src={logo} 
                className="rounded-lg w-full" 
                alt={`${title} logo`}
                loading="eager"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col w-full md:w-4/6 px-4 md:px-0 order-2 md:order-1">
              <h1 className="leading-10 bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent py-3 text-3xl md:text-5xl max-w-full md:w-[480px] font-semibold text-center md:text-left md:ml-32">
                {title}
              </h1>
              <p className="text-slate-700 text-lg md:text-xl max-w-full md:w-[490px] font-thin text-center md:text-left md:ml-32">
                {description}
              </p>
            </div>
          </div>

          {/* Grid Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9 p-4 md:p-8 w-full relative z-10">
            {items.map((item, index) => (
              <ItemList
                key={index}
                title={item.title}
                description={item.description}
                logo={item.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}