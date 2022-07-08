import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface IncludedCityProps {
  station: string;
  name: string;
  jisCode: string;
  mansionCount: number;
}

const IncludedCity: React.FC<IncludedCityProps> = ({
  station,
  name,
  jisCode,
  mansionCount,
}: IncludedCityProps) => {
  const item = (
    <LinkBlock
      key={jisCode}
      name={name}
      id={jisCode}
      link="cities"
      mansionCount={mansionCount}
      eventParams={{
        action: "msl_area_click",
        category: "msl_ichiran",
        label: "msl_linked_cities",
        value: 1,
      }}
    />
  );

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {station + "駅"}
          のある{name}から中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{item}</ul>
    </section>
  );
};

export default IncludedCity;
