import { MsLibraryCitiesOtherCitiesFragment } from "~/graphql/generated";

import styles from "~/components/pages/cities/OtherCities/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface OtherCitiesProps {
  data: MsLibraryCitiesOtherCitiesFragment;
}

const OtherCities: React.FC<OtherCitiesProps> = ({
  data,
}: OtherCitiesProps) => {
  const items = data.prefecture.cities.map((city) => (
    <LinkBlock
      key={city.jisCode}
      name={city.name}
      id={city.jisCode}
      mansionCount={city.mansionCount}
      link="cities"
      eventParams={{
        action: "msl_area_click",
        category: "msl_ichiran",
        label: "msl_syuhen",
        value: 1,
      }}
    />
  ));
  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {data.prefecture.name}
          {data.name}周辺エリアから中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default OtherCities;
