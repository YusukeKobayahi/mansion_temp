import { LinesQuery } from "~/graphql/generated";

import styles from "~/components/pages/cities/OtherCities/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface OtherStationsProps {
  data: LinesQuery;
}

const OtherStations: React.FC<OtherStationsProps> = ({
  data,
}: OtherStationsProps) => {
  const items = data.lines.map((line) => {
    const links = line.stations.map((station) => (
      <LinkBlock
        key={station.id}
        name={station.name + "駅"}
        id={station.id}
        mansionCount={station.mansionCount}
        link="stations"
        eventParams={{
          action: "msl_area_click",
          category: "msl_ichiran",
          label: "msl_station",
          value: 1,
        }}
      />
    ));
    return (
      <div className={styles.items} key={line.id}>
        <h2>
          <BoxHeading>{line.name}の駅から中古マンションを探す</BoxHeading>
        </h2>
        <ul className={styles.list}>{links}</ul>
      </div>
    );
  });

  return <section className={styles.container}>{items}</section>;
};

export default OtherStations;
