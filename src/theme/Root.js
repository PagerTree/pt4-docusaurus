import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Root({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pagertree.com/#organization",
        "name": "PagerTree, LLC",
        "url": "https://pagertree.com",
        "logo": "https://static-files.umso.co/lib_yteZXpJQdUuJWoOB/kjk5nze8tj0eenxe.svg?w=308",
        "foundingDate": "2016",
        "founders": [
          {
            "@type": "Person",
            "name": "Austin Miller",
            "url": "https://www.linkedin.com/in/austin-miller-b2b43b36/"
          }
        ],
        "description": "PagerTree helps DevOps, SRE, and IT teams manage on-call schedules, automate alert routing, and respond to incidents faster.",
        "sameAs": [
          "https://linkedin.com/company/pagertree",
          "https://github.com/pagertree",
          "https://www.youtube.com/@pagertree"
        ],
        "address": {
          "@type": "PostalAddress",
          "postOfficeBoxNumber": "11891",
          "addressLocality": "Tempe",
          "addressRegion": "AZ",
          "postalCode": "85284",
          "addressCountry": "US"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://pagertree.com/#website",
        "url": "https://pagertree.com",
        "name": "PagerTree",
        "publisher": { "@id": "https://pagertree.com/#organization" },
        "inLanguage": "en"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pagertree.com/#software",
        "name": "PagerTree",
        "applicationCategory": "IT Management Software",
        "operatingSystem": "Web, macOS, Windows, Linux, iOS, Android",
        "softwareVersion": "2025",
        "url": "https://pagertree.com",
        "publisher": { "@id": "https://pagertree.com/#organization" }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      {children}
    </>
  );
}
