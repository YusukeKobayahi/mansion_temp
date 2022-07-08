import Head from "next/head";
import { MsLibraryMansionsProductJsonLdFragment } from "~/graphql/generated";
import compact from "lodash/compact";
import { useDeepCompareMemo } from "use-deep-compare";
import SalesSummaryBuilder from "~/lib/mansions/SalesSummaryBuilder";
import { buildLibraryPagePath } from "~/lib/utils";

type ProductJsonLdProps = {
  data: MsLibraryMansionsProductJsonLdFragment;
  description: string;
};

const ProductJsonLd: React.FC<ProductJsonLdProps> = ({
  data,
  description,
}: ProductJsonLdProps) => {
  const builder = useDeepCompareMemo(
    () => new SalesSummaryBuilder(data.salesHistorySummaries),
    [data.salesHistorySummaries]
  );
  const totalMinPrice = builder.totalMinPrice;
  const totalMaxPrice = builder.totalMaxPrice;
  const accessJson = useDeepCompareMemo(() => {
    return data.access.map((a) => {
      const accessBase = `${a.stationLineName}「${a.stationName}駅」`;
      return {
        "@type": "TrainStation",
        name: a.stationName,
        description:
          a.stationWalkingMinutes !== null
            ? `${accessBase} 徒歩${a.stationWalkingMinutes}分`
            : accessBase,
      };
    });
  }, [data.access]);
  const jsonLdConfigs = {
    "@context": "https://schema.org/",
    "@type": "ItemPage",
    "@id": `https://ieul.jp/ms-library${buildLibraryPagePath(
      "mansions",
      data.uniqueCode
    )}`,
    genre: "中古マンション",
    headline: data.name,
    brand: {
      "@type": "Organization",
      name: "イエウール",
    },
    contentLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        name: data.name,
        streetAddress: compact([data.street?.name, data.blockNumber]).join(""),
        addressLocality: data.city.name,
        addressRegion: data.prefecture.name,
        addressCountry: {
          "@type": "Country",
          name: "JP",
        },
      },
    },
    mainEntity: {
      "@type": "Product",
      name: data.name,
      category: "中古マンション",
      material: data.structure.name,
      description: description,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "JPY",
        highPrice: totalMaxPrice,
        lowPrice: totalMinPrice,
        itemOffered: {
          "@type": "Residence",
          name: data.name,
          containsPlace: accessJson,
          address: {
            "@type": "PostalAddress",
            name: data.name,
            streetAddress: compact([data.street?.name, data.blockNumber]).join(
              ""
            ),
            addressLocality: data.city.name,
            addressRegion: data.prefecture.name,
            addressCountry: {
              "@type": "Country",
              name: "JP",
            },
          },
        },
        seller: {
          "@type": "Organization",
          name: data.managementCompany,
        },
      },
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

export default ProductJsonLd;
