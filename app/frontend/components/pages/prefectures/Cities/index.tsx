import { MsLibraryPrefecturesCitiesFragment } from "~/graphql/generated";

import styles from "./index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface CitiesProps {
  data: MsLibraryPrefecturesCitiesFragment;
}

const Cities: React.FC<CitiesProps> = ({ data }: CitiesProps) => {
  const items = data.cities.map((city) => (
    <LinkBlock
      key={city.jisCode}
      name={city.name}
      id={city.jisCode}
      mansionCount={city.mansionCount}
      link="cities"
      eventParams={{
        action: "msl_cta_click",
        category: "msl_prefectures",
        label: "msl_pop_bottom",
        value: 1,
      }}
      page={"prefectures"}
    />
  ));

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>エリアを選択する</BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default Cities;
