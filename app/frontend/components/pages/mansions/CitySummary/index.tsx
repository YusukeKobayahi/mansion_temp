import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { MsLibraryMansionsCitySummaryFragment } from "~/graphql/generated";
import { yenFormat } from "~/lib/utils";

type CitySummaryProps = {
  data: MsLibraryMansionsCitySummaryFragment;
};

const CitySummary: React.FC<CitySummaryProps> = ({
  data,
}: CitySummaryProps) => {
  // 間取りの販売履歴を初期表示
  const [show, setShow] = useState("md");
  const [mdViewState, setMdViewState] = useState(false);
  const [cktViewState, setCktViewState] = useState(false);
  const defaultShowNumber = 4;
  const averagePriceLayout = data.city.averagePrice.layout;
  const averagePriceDate = data.city.averagePrice.date;

  useEffect(() => {
    // 間取りの販売履歴情報がない場合、築年数の販売履歴を初期表示
    if (averagePriceLayout.length === 0) setShow("ckt");
    else setShow("md");
    if (averagePriceLayout.length > defaultShowNumber) setMdViewState(true);
    else setMdViewState(false);
    if (averagePriceDate.length > defaultShowNumber) setCktViewState(true);
    else setCktViewState(false);
  }, [data]);

  if (averagePriceLayout.length === 0 && averagePriceDate.length === 0)
    return null;

  const averagePriceLayoutTable = averagePriceLayout.map((a, i) => {
    const tr = (
      <tr key={i}>
        <td>{a.fullLayoutName}</td>
        <td>{yenFormat(a.averagePrice)}</td>
        <td>{a.salesHistoriesCount}件</td>
      </tr>
    );
    if (mdViewState) {
      return i < defaultShowNumber ? tr : null;
    } else {
      return tr;
    }
  });

  const averagePriceDateTable = averagePriceDate.map((a, i) => {
    const tr = (
      <tr key={i}>
        <td>{a.age}年</td>
        <td>{yenFormat(a.averagePrice)}</td>
        <td>{a.salesHistoriesCount}件</td>
      </tr>
    );
    if (cktViewState) {
      return i < defaultShowNumber ? tr : null;
    } else {
      return tr;
    }
  });

  return (
    <section className={styles.container}>
      <div className={styles.btns}>
        {averagePriceLayout.length !== 0 && (
          <button
            onClick={() => setShow("md")}
            className={show === "md" ? styles.show : ""}
          >
            間取り別平均価格
          </button>
        )}
        {averagePriceDate.length !== 0 && (
          <button
            onClick={() => setShow("ckt")}
            className={show === "ckt" ? styles.show : ""}
          >
            築年数別平均価格
          </button>
        )}
      </div>
      {show === "md" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>間取り</th>
              <th>平均価格</th>
              <th>取引件数</th>
            </tr>
          </thead>
          <tbody>{averagePriceLayoutTable}</tbody>
        </table>
      )}
      {show === "md" && mdViewState && (
        <button onClick={() => setMdViewState(false)} className={styles.btn}>
          さらに表示する
        </button>
      )}
      {show === "ckt" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>築年数</th>
              <th>平均価格</th>
              <th>取引件数</th>
            </tr>
          </thead>
          <tbody>{averagePriceDateTable}</tbody>
        </table>
      )}
      {show === "ckt" && cktViewState && (
        <button onClick={() => setCktViewState(false)} className={styles.btn}>
          さらに表示する
        </button>
      )}
    </section>
  );
};

export default CitySummary;
