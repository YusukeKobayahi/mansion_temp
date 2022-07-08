import { MsLibraryCityIncludedStationsFragment } from "~/graphql/generated";

import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface IncludedStationsProps {
  data: MsLibraryCityIncludedStationsFragment;
}

const IncludedStations: React.FC<IncludedStationsProps> = ({
  data,
}: IncludedStationsProps) => {
  if (!data.stations || data.stations.length === 0) return null;

  const items = data.stations.map((station) => {
    return (
      <LinkBlock
        key={station.id}
        name={station.name + "駅"}
        id={station.id}
        link="stations"
        mansionCount={station.mansionCount}
        eventParams={{
          action: "msl_area_click",
          category: "msl_ichiran",
          label: "msl_linked_stations",
          value: 1,
        }}
      />
    );
  });

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {data.prefecture.name}
          {data.name}
          内の駅から中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default IncludedStations;
