import { useMemo } from "react";

import { MsLibraryMansionsUnitSizeFragment } from "~/graphql/generated";
import SidelineHeading from "~/components/commons/headings/SidelineHeading";
import styles from "./index.module.scss";
import uniq from "lodash/uniq";

export interface UnitSizeProps {
  data: MsLibraryMansionsUnitSizeFragment;
}

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

const UnitSize: React.FC<UnitSizeProps> = ({ data }: UnitSizeProps) => {
  const content = useMemo(() => {
    // 間取りの小さい順に並び替えた MansionSalesHistorySummary
    const sortedSummaries = data.salesHistorySummaries.sort((a, b) => {
      if (a.numberOfRooms !== b.numberOfRooms) {
        return a.numberOfRooms - b.numberOfRooms;
      }
      return a.layoutKind.sort - b.layoutKind.sort;
    });

    // 小さい順に並び替えた全 MansionSalesHistorySummary の専有面積
    const sortedAreas = data.salesHistorySummaries
      .reduce<number[]>((areas, val) => areas.concat(val.exclusiveAreas), [])
      .sort((a, b) => a - b);

    const minLayoutSummary = sortedSummaries[0];
    const maxLayoutSummary = sortedSummaries[sortedSummaries.length - 1];
    const minExclusiveArea = sortedAreas[0];
    const maxExclusiveArea = sortedAreas[sortedAreas.length - 1];

    const layoutRangeText = uniq([
      minLayoutSummary.layout,
      maxLayoutSummary.layout,
    ]).join("～");

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

    const hasUnitOf39OrLess = sortedAreas.some((area) => area < 40);
    const hasUnitOf40To59 = sortedAreas.some((area) => 40 <= area && area < 60);
    const hasUnitOf60To89 = sortedAreas.some((area) => 60 <= area && area < 90);
    const hasUnitOf90OrMore = sortedAreas.some((area) => 90 <= area);

    return (
      <>
        <p className={styles.info}>
          間取りには{layoutRangeText}があり、{suitableUseRangeText}
          におすすめのマンションです。
          <br />
          広さでみると{exclusiveAreaRangeText}
          の物件があり、{data.name}
          では表内の色がついている広さの部屋が存在しています。
        </p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th className={hasUnitOf39OrLess ? styles.hasUnit : ""}>
                ～39㎡
              </th>
              <td>
                一人暮らしに向いており、特に30㎡以上だとゆったり使えるスペースがあります。
              </td>
            </tr>
            <tr>
              <th className={hasUnitOf40To59 ? styles.hasUnit : ""}>
                40～59㎡
              </th>
              <td>
                二人暮らしに向いている広さです。リビング・ダイニングの他に1,2部屋つく目安です。
              </td>
            </tr>
            <tr>
              <th className={hasUnitOf60To89 ? styles.hasUnit : ""}>
                60～89㎡
              </th>
              <td>
                家族3人でも過ごしやすく、お子様がいる場合にもおすすめです。
              </td>
            </tr>
            <tr>
              <th className={hasUnitOf90OrMore ? styles.hasUnit : ""}>
                90㎡～
              </th>
              <td>
                家族4人以上で暮らす場合にも適しており、色々な用途でスペースを使い分けられます。
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }, [data.name, data.salesHistorySummaries]);

  return (
    <section className={styles.container}>
      <h3>
        <SidelineHeading>間取り・広さ</SidelineHeading>
      </h3>
      {content}
    </section>
  );
};

export default UnitSize;
