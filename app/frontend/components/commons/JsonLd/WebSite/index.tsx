import Head from "next/head";

const WebSiteJsonLd: React.FC = () => {
  const jsonLdConfigs = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://ieul.jp/ms-library/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://ieul.jp/ms-library/freeword?wd={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdConfigs) }}
      />
    </Head>
  );
};

export default WebSiteJsonLd;
