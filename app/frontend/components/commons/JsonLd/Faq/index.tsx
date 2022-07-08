import Head from "next/head";

export type FaqJsonLdDataProps = {
  key: string;
  value: string;
};

type FaqJsonLdProps = {
  data: FaqJsonLdDataProps[];
};

const FaqJsonLd: React.FC<FaqJsonLdProps> = ({ data }: FaqJsonLdProps) => {
  const jsonLdConfigsItems = data.map((o) => {
    return {
      "@type": "Question",
      name: o.key,
      acceptedAnswer: {
        "@type": "Answer",
        text: o.value,
      },
    };
  });
  const jsonLdConfigs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jsonLdConfigsItems,
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

export default FaqJsonLd;
