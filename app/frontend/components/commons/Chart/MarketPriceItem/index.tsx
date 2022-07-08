import { useState, useEffect } from "react";
import styles from "~/components/commons/Chart/MarketPriceItem/index.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import {
  yenFormat,
  createDayThisMonth,
  createDayOneYearAndHalfMonthsAgo,
} from "~/lib/utils";
import xor from "lodash/xor";
import flatten from "lodash/flatten";
import max from "lodash/max";
import find from "lodash/find";
import pickBy from "lodash/pickBy";
import classnames from "classnames";

export type KeyProps =
  | "building"
  | "town"
  | "city"
  | "prefecture"
  | "station"
  | "line";

export type TargetListItemsProps = {
  name: string;
  key: KeyProps;
  color: string;
};

type SalePricePer = {
  date: string;
  building?: number;
  town?: number;
  city?: number;
  prefecture?: number;
  station?: number;
  line?: number;
};

type MarketPriceItemProps = {
  mainKey: KeyProps;
  name: string;
  salePricePerSquare: SalePricePer[];
  salePricePerTsubo: SalePricePer[];
  targetListItems: TargetListItemsProps[];
  defaultDiisplayKeyList: string[];
};

const MarketPriceItem: React.FC<MarketPriceItemProps> = ({
  mainKey,
  name,
  salePricePerSquare,
  salePricePerTsubo,
  targetListItems,
  defaultDiisplayKeyList,
}: MarketPriceItemProps) => {
  const [display, setDisplay] = useState(defaultDiisplayKeyList);
  useEffect(() => {
    setDisplay(defaultDiisplayKeyList);
  }, [name]);

  const displaySalePricePerSquare = salePricePerSquare.map((o) => {
    // 単位を万に変更かつ小数点第二位までに制限
    const format = (n: number) => Math.floor(n / 100) / 100;
    const date = new Date(o.date);

    return pickBy({
      date: date.getFullYear() + "/" + (date.getMonth() + 1),
      building: format(Number(o.building)),
      town: format(Number(o.town)),
      city: format(Number(o.city)),
      prefecture: format(Number(o.prefecture)),
      station: format(Number(o.station)),
      line: format(Number(o.line)),
    });
  });

  const dayThisMonth = createDayThisMonth();
  const thisMonth = createDayThisMonth().replace("-", "/").replace("-01", "");
  const dayOneYearAndHalfMonthsAgo = createDayOneYearAndHalfMonthsAgo();
  const todaySalePricePerSquare = find(salePricePerSquare, [
    "date",
    dayThisMonth,
  ]);
  const oneYearAndHalfMonthsAgoSalePricePerSquare = find(salePricePerSquare, [
    "date",
    dayOneYearAndHalfMonthsAgo,
  ]);
  const todaySalePricePerTsubo = find(salePricePerTsubo, [
    "date",
    dayThisMonth,
  ]);

  const targetList = targetListItems.map((o) => {
    return {
      name: o.name,
      key: o.key,
      color: o.color,
      squareMeter: todaySalePricePerSquare ? todaySalePricePerSquare[o.key] : 0,
      tsubo: todaySalePricePerTsubo ? todaySalePricePerTsubo[o.key] : 0,
    };
  });

  const lines = targetList.map((a, i) =>
    !display.includes(a.key) || a.name === "" ? null : (
      <Line
        key={i}
        type="monotone"
        dataKey={a.key}
        name={a.name}
        stroke={a.color}
        strokeWidth={2}
        dot={false}
      />
    )
  );

  const list = targetList.map((a, i) => {
    const format = (n: number) => {
      if (n > 10000) {
        return Math.floor(n / 10000) * 10000;
      } else {
        return Math.floor(n);
      }
    };
    const clickButton = (s: string) => {
      if (display.length === defaultDiisplayKeyList.length) setDisplay([s]);
      else if (display.join("") === s) setDisplay(defaultDiisplayKeyList);
      else setDisplay(xor([...display], [s]));
    };
    return (
      <div className={styles.block} key={i}>
        <button
          className={classnames(
            styles.head,
            display.includes(a.key) ? styles.display : ""
          )}
          onClick={() => clickButton(a.key)}
        >
          {a.name}
        </button>
        <div className={styles.body}>
          <p>
            {yenFormat(format(Number(a.squareMeter)))}
            <span>(㎡)</span>
          </p>
          <p className={styles.slash}>/</p>
          <p>
            {yenFormat(format(Number(a.tsubo)))}
            <span>(坪)</span>
          </p>
        </div>
      </div>
    );
  });

  const nav = targetList.map((a, i) => {
    const style = {
      backgroundColor: a.color,
    };
    return (
      <p key={i}>
        <span style={style}></span>
        {a.name}
      </p>
    );
  });

  const allSalePricePerSquarePrice = flatten(
    salePricePerSquare.map((o) => [
      o.building,
      o.town,
      o.city,
      o.prefecture,
      o.station,
      o.line,
    ])
  );
  const maxSalePricePerSquarePrice =
    Math.ceil(Number(max(allSalePricePerSquarePrice)) / 100000) * 10;

  const lineChartOption = {
    data: displaySalePricePerSquare,
  };

  const cartesianGridOption = {
    strokeDasharray: "1 1",
    viewBox: "{y: 275}",
  };

  const xAxisOption = {
    dataKey: "date",
    interval: Math.floor(salePricePerSquare.length / 5),
  };

  const yAxisOption = {
    label: { value: "万円/㎡", angle: -90, position: "insideLeft" },
    domain: [0, maxSalePricePerSquarePrice],
    interval: 0,
    tickCount:
      maxSalePricePerSquarePrice > 100
        ? maxSalePricePerSquarePrice / 20 + 1
        : maxSalePricePerSquarePrice / 10 + 1,
    padding: { top: 10 },
  };

  const referenceLineOption = {
    x: thisMonth,
    stroke: "red",
    strokeDasharray: "3 3",
    label: { value: "現在" },
    className: styles.today,
  };

  const tooltipOption = {
    formatter: (value: string, name: string, props: string) => [
      value + "万円/㎡",
      name,
      props,
    ],
  };

  const changePrice =
    todaySalePricePerSquare && oneYearAndHalfMonthsAgoSalePricePerSquare
      ? Math.floor(
          Number(todaySalePricePerSquare[mainKey]) -
            Number(oneYearAndHalfMonthsAgoSalePricePerSquare[mainKey])
        )
      : 0;

  const changePriceText =
    todaySalePricePerSquare?.city &&
    oneYearAndHalfMonthsAgoSalePricePerSquare?.city
      ? changePrice > 0
        ? `${name}は1年半前に比べて、相場が` +
          yenFormat(changePrice) +
          "(㎡単価)上がっています。"
        : `${name}は1年半前に比べて、相場が` +
          yenFormat(changePrice) +
          "(㎡単価)下がっています。"
      : "";

  return (
    <div className={styles.container}>
      <p className={styles.text}>{changePriceText}</p>
      <div className={styles.main}>
        <div className={styles.charts}>
          <div className={styles.legends}>{nav}</div>
          <div className={classnames(styles.chart, "pcOnly")}>
            <LineChart width={600} height={300} {...lineChartOption}>
              <CartesianGrid {...cartesianGridOption} />
              <XAxis {...xAxisOption} />
              <YAxis {...yAxisOption} />
              <ReferenceLine {...referenceLineOption} />
              {lines}
              <Tooltip {...tooltipOption} />
            </LineChart>
          </div>
          <div className={classnames(styles.chart, "spOnly")}>
            <LineChart width={300} height={250} {...lineChartOption}>
              <CartesianGrid {...cartesianGridOption} />
              <XAxis {...xAxisOption} />
              <YAxis {...yAxisOption} />
              <ReferenceLine {...referenceLineOption} />
              {lines}
              <Tooltip {...tooltipOption} />
            </LineChart>
          </div>
        </div>
        <div className={styles.summary}>
          <h3>
            <span>マンション相場遷移</span>
          </h3>
          {list}
        </div>
      </div>
    </div>
  );
};

export default MarketPriceItem;
