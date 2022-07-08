import { MsLibraryTownsLinkedStationsFragment } from "~/graphql/generated";

import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface IndexedStationsProps {
  data: MsLibraryTownsLinkedStationsFragment;
}

const LinkedStations: React.FC<IndexedStationsProps> = ({
  data,
}: IndexedStationsProps) => {
  if (!data.linkedStations || data.linkedStations.length === 0) return null;

  const items = data.linkedStations.map((station) => {
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
          {data.city.prefecture.name}
          {data.city.name}
          {data.name}
          の近隣の駅から中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default LinkedStations;
