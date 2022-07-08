import BoxHeading from "~/components/commons/headings/BoxHeading";
import { MsLibraryLinesMarketPriceFragment } from "~/graphql/generated";
import { createKey } from "~/lib/utils";
import dynamic from "next/dynamic";
const MarketPriceItem = dynamic(
  () => import("~/components/commons/Chart/MarketPriceItem")
);

type MarketPriceProps = {
  data: MsLibraryLinesMarketPriceFragment;
};

const MarketPrice: React.FC<MarketPriceProps> = ({
  data,
}: MarketPriceProps) => {
  const defaultDiisplayKeyList = ["line"];
  const lineSalePricePerSquare = data.pricePredictions.salePricePerSquare;
  const lineSalePricePerTsubo = data.pricePredictions.salePricePerTsubo;

  if (
    ![lineSalePricePerSquare, lineSalePricePerTsubo].every(
      (el) => el && el.length !== 0
    )
  )
    return null;

  const salePricePerSquare = [];
  for (let i = 0; i < lineSalePricePerSquare.length; i++) {
    salePricePerSquare.push({
      date: lineSalePricePerSquare[i].date,
      line: Number(lineSalePricePerSquare[i].line),
    });
  }
  const salePricePerTsubo = [];
  for (let i = 0; i < lineSalePricePerTsubo.length; i++) {
    salePricePerTsubo.push({
      date: lineSalePricePerTsubo[i].date,
      line: Number(lineSalePricePerTsubo[i].line),
    });
  }

  const lineName = data.name;

  const targetListItems = [
    {
      name: lineName,
      key: createKey("line"),
      color: "#686D87",
    },
  ];

  const mainKey = "line";

  return (
    <section className={"m_y_30px"}>
      <h2>
        <BoxHeading>{lineName}周辺のマンション相場遷移</BoxHeading>
      </h2>
      <MarketPriceItem
        mainKey={mainKey}
        name={lineName}
        salePricePerSquare={salePricePerSquare}
        salePricePerTsubo={salePricePerTsubo}
        targetListItems={targetListItems}
        defaultDiisplayKeyList={defaultDiisplayKeyList}
      />
    </section>
  );
};

export default MarketPrice;
