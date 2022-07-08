import { MsLibraryRailwayStationNeighborStationsFragment } from "~/graphql/generated";

import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";
import flatten from "lodash/flatten";
import uniqBy from "lodash/uniqBy";

export interface NeighborStationsProps {
  data: MsLibraryRailwayStationNeighborStationsFragment;
}

const NeighborStations: React.FC<NeighborStationsProps> = ({
  data,
}: NeighborStationsProps) => {
  if (
    !data.sameStations ||
    data.sameStations.length === 0 ||
    data.sameStations.every((station) => station.nextStations.length === 0)
  )
    return null;

  const uniqNextStations = uniqBy(
    flatten(
      data.sameStations.map((sameStations) => {
        return sameStations.nextStations.map((station) => station);
      })
    ),
    (item) => item.name
  );

  const items = uniqNextStations.map((station) => {
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
          {data.name + "駅"}
          の乗り入れ路線の隣接駅から中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default NeighborStations;
