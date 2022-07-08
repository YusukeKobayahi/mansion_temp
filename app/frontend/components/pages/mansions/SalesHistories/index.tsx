import { format } from "date-fns";
import { MsLibraryMansionsSalesHistoriesFragment } from "~/graphql/generated";
import compact from "lodash/compact";
import zip from "lodash/zip";
import { useDeepCompareMemo } from "use-deep-compare";

import styles from "./index.module.scss";
import SidelineHeading from "~/components/commons/headings/SidelineHeading";
import ShowMoreBtn from "~/components/commons/buttons/ShowMoreBtn";
import { yenFormat } from "~/lib/utils";

export interface SalesHistoriesProps {
  data: MsLibraryMansionsSalesHistoriesFragment;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  hasHistoryNextPage: boolean;
}

const SalesHistories: React.FC<SalesHistoriesProps> = ({
  data,
  onLoadMore,
  isLoadingMore,
  hasHistoryNextPage,
}: SalesHistoriesProps) => {
  const histories = compact(
    data?.salesHistories?.edges?.map((edge) =>
      edge !== null ? edge.node : null
    )
  );
  const ids = useDeepCompareMemo(() => histories.map((node) => node.id), [
    histories,
  ]);
  const dates = useDeepCompareMemo(() => {
    return histories.map((node) =>
      format(Date.parse(node.saleOn), "yyyy年MM月")
    );
  }, [histories]);
  const prices = useDeepCompareMemo(
    () => histories.map((node) => yenFormat(node.price)),
    [histories]
  );
  const layouts = useDeepCompareMemo(
    () => histories.map((node) => node.layout),
    [histories]
  );
  const areas = useDeepCompareMemo(
    () => histories.map((node) => `${node.exclusiveArea}㎡`),
    [histories]
  );
  const floorNumbers = useDeepCompareMemo(
    () =>
      histories.map((node) =>
        node.floorNumber ? `${node.floorNumber}階` : "-"
      ),
    [histories]
  );

  const resultsForPC = zip(ids, dates, prices, layouts, areas, floorNumbers);
  const resultsForSp = zip(
    ids,
    dates,
    prices,
    layouts,
    areas,
    floorNumbers
  ).map((result) => {
    return [
      result[0],
      result[1],
      result[2],
      [result[3], result[4], result[5]].join(" / "),
    ];
  });

  return (
    <section className={styles.container}>
      <h3>
        <SidelineHeading>販売履歴</SidelineHeading>
      </h3>
      {resultsForPC.length && (
        <div className="pcOnly">
          <table className={styles.tablePc}>
            <thead>
              <tr>
                <th>年月</th>
                <th>価格</th>
                <th>間取り</th>
                <th>専有面積</th>
                <th>所在階</th>
              </tr>
            </thead>
            <tbody>
              {resultsForPC.map((arr) => (
                <tr key={arr[0]}>
                  <td>{arr[1]}</td>
                  <td>{arr[2]}</td>
                  <td>{arr[3]}</td>
                  <td>{arr[4]}</td>
                  <td>{arr[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {resultsForSp.length && (
        <div className="spOnly">
          <table className={styles.tableSp}>
            <tbody>
              {resultsForSp.map((arr) => (
                <tr key={arr[0]}>
                  <th>{arr[1]}</th>
                  <td>
                    <p className={styles.tableSp__price}>{arr[2]}</p>
                    <span className={styles.tableSp__info}>{arr[3]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {hasHistoryNextPage ? (
        <div className={styles.showmoreContainer}>
          <ShowMoreBtn onClick={onLoadMore} isLoading={isLoadingMore} />
        </div>
      ) : null}
    </section>
  );
};

export default SalesHistories;
