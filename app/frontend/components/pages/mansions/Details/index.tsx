import Link from "next/link";
import { buildLibraryPagePath, buildConstructedDate } from "~/lib/utils";
import isEmpty from "lodash/isEmpty";
import compact from "lodash/compact";
import { useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import { event } from "~/lib/gtag";

import styles from "./index.module.scss";
import { MsLibraryMansionsDetailsFragment } from "~/graphql/generated";
import { GoogleAnalyticsEvent } from "~/lib/types";

export interface DetailsProps {
  data: MsLibraryMansionsDetailsFragment;
}

const Details: React.FC<DetailsProps> = ({ data }: DetailsProps) => {
  const constructedDate = buildConstructedDate(data.constructedIn, data.age);
  const floor = useMemo(() => {
    return data.groundFloor == null
      ? "-"
      : data.undergroundFloor !== null
      ? `地下${data.undergroundFloor}階 / ${data.groundFloor}階建て`
      : `${data.groundFloor}階建て`;
  }, [data.groundFloor, data.undergroundFloor]);
  const layouts = useDeepCompareMemo(() => {
    return isEmpty(data.layouts) ? "-" : `${data.layouts.join("、 ")}など`;
  }, [data.layouts]);
  const landUseZones = useDeepCompareMemo(() => {
    return isEmpty(data.landUseZones)
      ? "-"
      : `${data.landUseZones.join("、 ")}`;
  }, [data.landUseZones]);
  const unitAmount = useMemo(
    () => (data.unitAmount !== null ? `${data.unitAmount}戸` : "-"),
    [data.unitAmount]
  );
  const clickArea = (label: GoogleAnalyticsEvent["label"]) => {
    event({
      action: "msl_area_click",
      category: "msl_shosai",
      label: label,
      value: 1,
    });
  };
  const address = useDeepCompareMemo(() => {
    return (
      <span>
        <Link
          href={"/prefectures/[jisCode]"}
          as={buildLibraryPagePath("prefectures", data.prefecture.jisCode)}
          prefetch={false}
          passHref
        >
          <button className={styles.link} onClick={() => clickArea("msl_pref")}>
            {data.prefecture.name}
          </button>
        </Link>
        &nbsp;
        <Link
          href={buildLibraryPagePath("cities", data.city.jisCode)}
          prefetch={false}
          passHref
        >
          <button className={styles.link} onClick={() => clickArea("msl_city")}>
            {data.city.name}
          </button>
        </Link>
        &nbsp;
        <Link
          href={{
            pathname: buildLibraryPagePath("cities", data.city.jisCode),
            query: { tw: data.town.id },
          }}
          prefetch={false}
          passHref
        >
          <button onClick={() => clickArea("msl_town")} className={styles.link}>
            {data.town.name}
          </button>
        </Link>
        &nbsp;
        {compact([data.street?.name, data.blockNumber]).join("")}
      </span>
    );
  }, [
    data.prefecture.name,
    data.city.name,
    data.town.name,
    data.street?.name,
    data.blockNumber,
  ]);
  const accessInfo = useDeepCompareMemo(() => {
    return data.access.map((a, i) => {
      return (
        <span key={i}>
          <Link
            href={buildLibraryPagePath("lines", String(a.lineId))}
            prefetch={false}
            passHref
          >
            <button onClick={() => clickArea("msl_line")}>
              {a.stationLineName}
            </button>
          </Link>
          「
          <Link
            href={buildLibraryPagePath("stations", String(a.stationId))}
            prefetch={false}
          >
            <button onClick={() => clickArea("msl_station")}>
              {a.stationName}
            </button>
          </Link>
          」
          {a.stationWalkingMinutes != null &&
            "徒歩" + a.stationWalkingMinutes + "分"}
        </span>
      );
    });
  }, [data.access]);

  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <tbody className="pcOnly">
          <tr>
            <th>物件名</th>
            <td>{data.name}</td>
            <th>住所</th>
            <td>{address}</td>
          </tr>
          <tr>
            <th>最寄り駅</th>
            <td>{accessInfo}</td>
            <th>築年月</th>
            <td>{constructedDate}</td>
          </tr>
          <tr>
            <th>階建</th>
            <td>{floor}</td>
            <th>間取り</th>
            <td>{layouts}</td>
          </tr>
          <tr>
            <th>総戸数</th>
            <td>{unitAmount}</td>
            <th>構造</th>
            <td>{data.structure.name}</td>
          </tr>
          <tr>
            <th>土地権利</th>
            <td>{data.landPrivilege || "-"}</td>
            <th>用途地域</th>
            <td>{landUseZones}</td>
          </tr>
          <tr>
            <th>施工会社</th>
            <td>{data.constructCompany || "-"}</td>
            <th>管理会社</th>
            <td>{data.managementCompany || "-"}</td>
          </tr>
          <tr>
            <th>管理形態</th>
            <td>{data.managementForm || "-"}</td>
            <th>駐車場</th>
            <td>{data.parking || "-"}</td>
          </tr>
        </tbody>

        <tbody className="spOnly">
          <tr>
            <th>物件名</th>
            <td>{data.name}</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>{address}</td>
          </tr>
          <tr>
            <th>最寄り駅</th>
            <td>{accessInfo}</td>
          </tr>
          <tr>
            <th>階建</th>
            <td>{floor}</td>
          </tr>
          <tr>
            <th>築年月</th>
            <td>{constructedDate}</td>
          </tr>
          <tr>
            <th>間取り</th>
            <td>{layouts}</td>
          </tr>
          <tr>
            <th>総戸数</th>
            <td>{unitAmount}</td>
          </tr>
          <tr>
            <th>構造</th>
            <td>{data.structure.name}</td>
          </tr>
          <tr>
            <th>土地権利</th>
            <td>{data.landPrivilege || "-"}</td>
          </tr>
          <tr>
            <th>用途地域</th>
            <td>{landUseZones}</td>
          </tr>
          <tr>
            <th>施工会社</th>
            <td>{data.constructCompany || "-"}</td>
          </tr>
          <tr>
            <th>管理会社</th>
            <td>{data.managementCompany || "-"}</td>
          </tr>
          <tr>
            <th>管理形態</th>
            <td>{data.managementForm || "-"}</td>
          </tr>
          <tr>
            <th>駐車場</th>
            <td>{data.parking || "-"}</td>
          </tr>
        </tbody>
      </table>
      <p className={styles.note}>
        ※駐車場については過去の売却情報をベースに表記しており、空きがあることを保証するものではありません。
      </p>
    </section>
  );
};

export default Details;
