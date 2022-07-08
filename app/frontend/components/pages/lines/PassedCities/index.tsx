import { MsLibraryRailwayLinePassedCitiesFragment } from "~/graphql/generated";

import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface PassedCitiesProps {
  data: MsLibraryRailwayLinePassedCitiesFragment;
}

const PassedCities: React.FC<PassedCitiesProps> = ({
  data,
}: PassedCitiesProps) => {
  if (!data.cities || data.cities.length === 0) return null;

  const items = data.cities.map((city) => {
    return (
      <LinkBlock
        key={city.jisCode}
        name={city.name}
        id={city.jisCode}
        link="cities"
        mansionCount={city.mansionCount}
        eventParams={{
          action: "msl_area_click",
          category: "msl_ichiran",
          label: "msl_linked_cities",
          value: 1,
        }}
      />
    );
  });

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {data.name}
          が通るエリアから中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default PassedCities;
