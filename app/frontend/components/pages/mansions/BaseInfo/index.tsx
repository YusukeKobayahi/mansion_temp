import Link from "next/link";
import { buildLibraryPagePath, buildConstructedDate } from "~/lib/utils";
import { event } from "~/lib/gtag";
import compact from "lodash/compact";
import { useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import styles from "./index.module.scss";
import { MsLibraryMansionsBaseInfoFragment } from "~/graphql/generated";
import UnderlineHeading from "~/components/commons/headings/UnderlineHeading";
import { GoogleAnalyticsEvent } from "~/lib/types";

export interface BaseInfoProps {
  data: MsLibraryMansionsBaseInfoFragment;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ data }: BaseInfoProps) => {
  const clickArea = (label: GoogleAnalyticsEvent["label"]) => {
    event({
      action: "msl_area_click",
      category: "msl_shosai",
      label: label,
      value: 1,
    });
  };
  const constructedDate = buildConstructedDate(data.constructedIn, data.age);
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
        <Link href={buildLibraryPagePath("cities", data.city.jisCode)} passHref>
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
          <Link href={buildLibraryPagePath("lines", String(a.lineId))} passHref>
            <button onClick={() => clickArea("msl_line")}>
              {a.stationLineName}
            </button>
          </Link>
          「
          <Link href={buildLibraryPagePath("stations", String(a.stationId))}>
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

  const exclusiveArea = useMemo(() => {
    if (data.display.maxExclusiveArea === data.display.minExclusiveArea) {
      return `${data.display.maxExclusiveArea}㎡`;
    } else {
      return `${data.display.minExclusiveArea}㎡~${data.display.maxExclusiveArea}㎡`;
    }
  }, [data.display.minExclusiveArea, data.display.maxExclusiveArea]);

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <h1>
          <UnderlineHeading>{data.name}</UnderlineHeading>
        </h1>
      </div>
      <div className={styles.info}>
        <p>
          <span>占有面積 {exclusiveArea} / </span>
          <span>築年月 {constructedDate} / </span>
          <span>最寄駅 {accessInfo}</span>
        </p>
        <p>
          <span>所在地 {address}</span>
        </p>
      </div>
    </section>
  );
};

export default BaseInfo;
