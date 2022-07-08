import { xor } from "lodash";
import { yenFormat, buildLibraryPagePath } from "~/lib/utils";
import { ReactSetStateType } from "~/lib/types";
import {
  MsLibraryRailwayStationToStationItemFragment,
  CommuteStationsQuery,
} from "~/graphql/generated";

import CheckBox from "~/components/commons/CheckBox";
import Title from "~/components/pages/commute/stations/Item/Title";

import styles from "./index.module.scss";
import classnames from "classnames";
import Router from "next/router";

type ItemProps = {
  data: MsLibraryRailwayStationToStationItemFragment;
  st: string[];
  setSt: ReactSetStateType<string[]>;
  fromStation: CommuteStationsQuery["station"];
};

const Item: React.FC<ItemProps> = ({
  data,
  st,
  setSt,
  fromStation,
}: ItemProps) => {
  const { minutes, endStation: toStation, transferTime } = data;
  const {
    mansionCount = 0,
    sameStations = [],
    averageMansionPrice = { averageSquarePrice: 0 },
    city = { name: "", prefecture: { name: "" } },
  } = toStation ? toStation : {};

  const location = `${city?.prefecture?.name}${city?.name}`;
  const lineInfo = sameStations.map((station) => station?.line?.name).join(",");
  const marketPrice = yenFormat(averageMansionPrice?.averageSquarePrice || 0);
  const toStationPath = buildLibraryPagePath("stations", String(toStation?.id));

  return (
    <div className={styles.layout}>
      <div className={styles.checkbox}>
        <CheckBox
          value={String(toStation?.id)}
          checked={st.includes(String(toStation?.id))}
          onChange={(e) => {
            setSt(xor([...st], [e.target.value]));
          }}
        />
      </div>
      <div className={styles.title}>
        <Title onClick={() => Router.push(toStationPath)}>
          {`${toStation?.name}駅` || ""}
        </Title>
      </div>
      <div className={styles.content}>
        <div className={styles.body}>
          <table className={classnames(styles.pcTable, "pcOnly")}>
            <tbody>
              <tr>
                <td>{fromStation?.name}駅までの時間</td>
                <td>{minutes}分</td>

                <td>乗り換え回数</td>
                <td>{transferTime}回</td>
              </tr>
              <tr>
                <td>平均相場(㎡)</td>
                <td> {marketPrice}</td>

                <td>物件数</td>
                <td> {mansionCount}件</td>
              </tr>
              <tr>
                <td>所在地</td>
                <td colSpan={3}>{location}</td>
              </tr>
              <tr>
                <td>路線情報</td>
                <td colSpan={3}> {lineInfo}</td>
              </tr>
            </tbody>
          </table>
          <div className="spOnly">
            <table className={styles.spTable}>
              <tbody>
                <tr>
                  <td>{fromStation?.name}駅まで</td>
                  <td>
                    {minutes}分(乗り換え{transferTime}回)
                  </td>
                </tr>
                <tr>
                  <td>平均相場(㎡)</td>
                  <td> {marketPrice}</td>
                </tr>
                <tr>
                  <td>物件数</td>
                  <td> {mansionCount}件</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classnames(styles.subText, "spOnly")}>
            <div>{location}</div>
            <div>{lineInfo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
