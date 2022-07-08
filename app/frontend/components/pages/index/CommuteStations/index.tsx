import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import { event } from "~/lib/gtag";
import data from "./CommuteStationsList.json";

import styles from "~/components/pages/index/PopularTowns/index.module.scss";

const CommuteStations: React.FC = () => {
  const commuteStations = data.commuteStations;

  const onClick = () => {
    event({
      category: "msl_top",
      action: "msl_area_click",
      label: "msl_commute_station",
      value: 1,
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>人気な駅への通勤・通学圏内から探す</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {commuteStations.map((commuteStations) => {
            return (
              <li key={commuteStations.id} className={styles.item}>
                <Link
                  href={buildLibraryPagePath(
                    "commute/stations",
                    commuteStations.id
                  )}
                  prefetch={false}
                  passHref
                >
                  <button className={styles.link} onClick={onClick}>
                    {commuteStations.name}
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

export default CommuteStations;
