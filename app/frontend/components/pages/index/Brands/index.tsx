import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import { event } from "~/lib/gtag";
import brandsList from "~/components/pages/index/Brands/BrandsList.json";

import styles from "~/components/pages/index/PopularTowns/index.module.scss";

export type BrandsListProps = {
  name: string;
  id: string;
};

const Prefectures: React.FC = () => {
  const filteredBrandsList: BrandsListProps[] = brandsList.brands;

  const clickBrand = () => {
    event({
      action: "msl_area_click",
      category: "msl_top",
      label: "msl_brands",
      value: 1,
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>マンションブランドから探す</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {filteredBrandsList.map((brand) => {
            return (
              <li key={brand.id} className={styles.item}>
                <Link
                  href={buildLibraryPagePath("brands", brand.id)}
                  prefetch={false}
                  passHref
                >
                  <button className={styles.link} onClick={clickBrand}>
                    {brand.name}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Prefectures;
