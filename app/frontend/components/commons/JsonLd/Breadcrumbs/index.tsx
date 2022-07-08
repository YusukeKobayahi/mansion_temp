import Head from "next/head";
import { BreadcrumbItemProps } from "~/components/commons/Breadcrumb";

type BreadcrumbsJsonLdProps = {
  breadcrumbs: BreadcrumbItemProps[];
};

const BreadcrumbsJsonLd: React.FC<BreadcrumbsJsonLdProps> = ({
  breadcrumbs,
}: BreadcrumbsJsonLdProps) => {
  const items = breadcrumbs.map((data, i) => {
    if (data.name !== "" && data.path !== "") {
      return {
        "@type": "ListItem",
        position: i + 2,
        name: data.name,
        item:
          "https://ieul.jp/ms-library" +
          (data.asLink ? data.asLink : data.path),
      };
    }
  });
  items.unshift({
    "@type": "ListItem",
    position: 1,
    name: "イエウールトップ",
    item: "https://ieul.jp/",
  });
  const jsonLdConfigs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
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

export default BreadcrumbsJsonLd;
