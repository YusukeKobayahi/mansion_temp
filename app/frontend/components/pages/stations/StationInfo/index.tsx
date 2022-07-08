import { StationInfoFragment } from "~/graphql/generated";
import styles from "./index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import Link from "~/components/commons/Link";
import { buildLibraryPagePath } from "~/lib/utils";
import uniqBy from "lodash/uniqBy";
import React from "react";

export type StationInfoProps = {
  title: string;
  commuteStations: StationInfoFragment[];
};

const StationInfo: React.FC<StationInfoProps> = ({
  commuteStations,
  title,
}: StationInfoProps) => {
  if (!commuteStations || !commuteStations.length) return null;

  if (!commuteStations) return null;
  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>{title}</BoxHeading>
      </h2>
      {commuteStations && (
        <ul className={styles.list}>
          {uniqBy(commuteStations, "startStation.id").map(
            ({ startStation }, i) => (
              <React.Fragment key={i}>
                {startStation && (
                  <li className={styles.item}>
                    <Link
                      className={styles.link}
                      linkProps={{
                        href: buildLibraryPagePath(
                          "commute/stations",
                          startStation.id
                        ),
                      }}
                      text={`${startStation.name}駅`}
                      eventParams={{
                        action: "msl_area_click",
                        category: "msl_ichiran",
                        label: "msl_indexed_towns",
                        value: 1,
                      }}
                    />
                  </li>
                )}
              </React.Fragment>
            )
          )}
        </ul>
      )}
    </section>
  );
};

export default StationInfo;
