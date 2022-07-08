import { MsLibraryCityNeighborCitiesFragment } from "~/graphql/generated";

import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface NeighborCitiesProps {
  data: MsLibraryCityNeighborCitiesFragment;
}

const NeighborCities: React.FC<NeighborCitiesProps> = ({
  data,
}: NeighborCitiesProps) => {
  if (!data.neighborCities || data.neighborCities.length === 0) return null;

  const items = data.neighborCities.map((city, i) => {
    return (
      <LinkBlock
        key={i}
        name={city.name}
        id={city.jisCode}
        link="cities"
        eventParams={{
          action: "msl_area_click",
          category: "msl_ichiran",
          label: "msl_linked_cities",
          value: 1,
        }}
        mansionCount={city.mansionCount}
      />
    );
  });

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {data.prefecture.name}
          {data.name}
          の隣接エリアから中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default NeighborCities;
