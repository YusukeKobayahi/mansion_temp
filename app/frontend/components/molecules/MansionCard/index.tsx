import Link from "next/link";
import classnames from "classnames";
import { event } from "~/lib/gtag";
import { MansionCardDataFragment } from "~/graphql/generated";
import { yenFormat, buildLibraryPagePath } from "~/lib/utils";
import uniq from "lodash/uniq";
import compact from "lodash/compact";
import sortBy from "lodash/sortBy";
import { format } from "date-fns";
import styles from "./index.module.scss";
import tableStyles from "~/components/pages/cities/Info/index.module.scss";
import _Link from "~/components/commons/Link";
import { GoogleAnalyticsEvent } from "~/lib/types";

/**
 * 将来的にimage,reviewなどが拡張される予定
 */
type MansionCardProps = MansionCardDataFragment & {
  subjectNames?: string[];
  writing?: boolean;
  eventParams?: GoogleAnalyticsEvent;
};

const MansionCard: React.FC<MansionCardProps> = ({
  uniqueCode,
  name,
  age,
  constructedIn,
  unitAmount,
  pageView,
  prefecture,
  city,
  town,
  street,
  blockNumber,
  display,
  access,
  salesHistorySummaries,
  subjectNames,
  writing = false,
  eventParams = {
    action: "msl_link_click",
    category: "msl_ichiran",
    label: "msl_mansion_title",
    value: 1,
  },
}: MansionCardProps) => {
  const clickMansion = () => {
    event(eventParams);
  };
  const linkProps = {
    href: "/mansions/[uniqueCode]",
    as: buildLibraryPagePath("mansions", uniqueCode),
  };
  const layout = display.layoutName;
  const address = compact([
    prefecture.name,
    city.name,
    town.name,
    street?.name,
    blockNumber,
  ]).join("");
  const priceRange = uniq([
    yenFormat(display.minPrice),
    yenFormat(display.maxPrice),
  ]).join(" ~ ");
  const exclusiveArea = uniq([
    display.minExclusiveArea + "㎡",
    display.maxExclusiveArea + "㎡",
  ]).join(" ~ ");
  const hasSafty = Date.parse(constructedIn) < Date.parse("1983-06-01");
  const constructedDate = `${format(
    Date.parse(constructedIn),
    "yyyy年MM月"
  )} (築${age}年)`;

  const accessText = access.map(
    ({ stationName, stationLineName, stationWalkingMinutes }, i) => {
      return (
        <span
          key={i}
          className={
            subjectNames &&
            (subjectNames.includes(stationName) ||
              subjectNames.includes(stationLineName))
              ? styles.highlight
              : ""
          }
        >
          {`${stationLineName}「${stationName}駅」`}
          {stationWalkingMinutes && `徒歩${stationWalkingMinutes}分`}
        </span>
      );
    }
  );

  const mansionScale = (() => {
    if (!unitAmount) return "";
    else if (unitAmount > 100) return "大規模";
    else if (unitAmount > 20) return "中規模";
    else return "小規模";
  })();

  const accessConvenience = (() => {
    const closestStationWalkingMinutes = Math.min(
      ...access.map(({ stationWalkingMinutes }) =>
        Number(stationWalkingMinutes)
      )
    );

    if (closestStationWalkingMinutes <= 5)
      return "ロケーションにも優れています。";
    else if (closestStationWalkingMinutes <= 10)
      return "主要都市へのアクセスに便利です。";
    else return "";
  })();

  // 間取りの小さい順に並び替えた MansionSalesHistorySummary
  const sortedSummaries = sortBy(salesHistorySummaries, [
    "numberOfRooms",
    ({ layoutKind }) => layoutKind.sort,
  ]);

  // 小さい順に並び替えた全 MansionSalesHistorySummary の専有面積
  const sortedAreas = salesHistorySummaries
    .reduce(
      (areas, { exclusiveAreas }) => areas.concat(exclusiveAreas),
      [] as number[]
    )
    .sort((a, b) => a - b);

  const minLayoutSummary = sortedSummaries[0];
  const maxLayoutSummary = sortedSummaries[sortedSummaries.length - 1];
  const minExclusiveArea = sortedAreas[0];
  const maxExclusiveArea = sortedAreas[sortedAreas.length - 1];

  const layoutRangeText = uniq([
    minLayoutSummary.layout,
    maxLayoutSummary.layout,
  ]).join("～");

  function createSuitableUseText(
    numberOfRooms: number,
    layoutKindSlug: string
  ): string {
    switch (numberOfRooms) {
      case 1:
        if (layoutKindSlug === "r" || layoutKindSlug === "k") {
          return "一人暮らしを検討している方";
        }
        return "部屋を活用する一人暮らし・二人暮らしを検討している方";
      case 2:
        return "ゆったりとした二人暮らしを検討している方や、お子様がお一人いるご家庭";
      case 3:
        return "お子様が二人いるご家庭で広々と部屋をご活用したい場合";
      default:
        return "お子様が二人以上いて子供部屋が欲しいとお考えの場合や住むご予定の人数が多い場合";
    }
  }

  const suitableUseRangeText = uniq([
    createSuitableUseText(
      minLayoutSummary.numberOfRooms,
      minLayoutSummary.layoutKind.slug
    ),
    createSuitableUseText(
      maxLayoutSummary.numberOfRooms,
      maxLayoutSummary.layoutKind.slug
    ),
  ]).join("～");

  const exclusiveAreaRangeText = uniq([
    `${minExclusiveArea}㎡`,
    `${maxExclusiveArea}㎡`,
  ]).join("～");

  return (
    <div className={styles.container}>
      <div className={styles.pcOnly}>
        <div className={styles.block}>
          <Link {...linkProps} prefetch={false} passHref>
            <button className={styles.name} onClick={() => clickMansion()}>
              <h3>{name}</h3>
            </button>
          </Link>
          <div className={styles.columns}>
            <ul className={styles.table}>
              <li className={styles.item}>
                <p className={styles.label}>物件名</p>
                <p className={styles.content}>{name}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>中古販売価格</p>
                <p className={styles.content}>{priceRange}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>所在地</p>
                <p className={styles.content}>{address}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>沿線・駅</p>
                <p className={styles.content}>{accessText}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>占有面積</p>
                <p className={styles.content}>{exclusiveArea}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>間取り</p>
                <p className={styles.content}>{layout}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>築年月</p>
                <p className={styles.content}>{constructedDate}</p>
              </li>
              <li className={styles.item}>
                <p className={styles.label}>総戸数</p>
                <p className={styles.content}>
                  {unitAmount ? `${unitAmount}戸` : "-"}
                </p>
              </li>
            </ul>
          </div>
          {pageView && (
            <p className={styles.page_view}>
              ※ {pageView}人がこの物件を閲覧しました。
            </p>
          )}
          {writing && (
            <div className={classnames(tableStyles.tableWrapper, "m_b_30px")}>
              <table className={tableStyles.table}>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        {name}は{address}に位置する総戸数{unitAmount}戸の
                        {mansionScale}マンションです。
                      </p>
                      <p>
                        最寄駅は{accessText}で、{accessConvenience}
                        {age <= 16 ? (
                          <>
                            {name}の築年月は{constructedDate}で、
                            {age > 5 ? "比較的" : ""}新しい物件となっています。
                            {name}の販売価格は{priceRange}です。
                          </>
                        ) : (
                          <>
                            {name}の築年月は{constructedDate}であり、 販売価格は
                            {priceRange}です。
                          </>
                        )}
                      </p>
                      <p>
                        {name}間取りには{layoutRangeText}があり、
                        {suitableUseRangeText}
                        におすすめのマンションです。
                      </p>
                      <p>
                        広さでみると{exclusiveAreaRangeText}
                        の物件があり、{name}
                        では表内の色がついている広さの部屋が存在しています。
                      </p>
                      {hasSafty && (
                        <p>
                          {name}
                          の耐震性は新耐性基準を採用しており、中規模の地震（震度5強程度）でほとんど損傷せず、大規模な地震震度6強～7程度の揺れでも倒壊しないような構造基準が適用されており、安心して住める基準を満たしています。
                        </p>
                      )}
                      <p>
                        <_Link
                          text="Housii"
                          linkProps={{ href: "https://ieul.jp/buy/" }}
                          eventParams={eventParams}
                        />
                        に登録することで、{name}
                        の最新情報をお届けいたします。
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <Link {...linkProps} prefetch={false} passHref>
            <button onClick={() => clickMansion()} className={styles.link}>
              この物件の詳細を見る
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.spOnly}>
        <Link {...linkProps} prefetch={false} passHref>
          <button onClick={() => clickMansion()} className={styles.card}>
            <h3>{name}</h3>
            <ul>
              <li>{priceRange}</li>
              <li>{exclusiveArea}</li>
              <li>{layout}</li>
              <li>{constructedDate}</li>
              <li>{unitAmount}</li>
            </ul>
            <p>
              {address}
              <br />
              {accessText}
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MansionCard;
