import BoxHeading from "~/components/commons/headings/BoxHeading";
import { MsLibraryCitiesMarketPriceFragment } from "~/graphql/generated";
import { createKey } from "~/lib/utils";
import dynamic from "next/dynamic";
const MarketPriceItem = dynamic(
  () => import("~/components/commons/Chart/MarketPriceItem")
);

type MarketPriceProps = {
  data: MsLibraryCitiesMarketPriceFragment;
};

const MarketPrice: React.FC<MarketPriceProps> = ({
  data,
}: MarketPriceProps) => {
  const defaultDiisplayKeyList = ["city", "prefecture"];
  const citySalePricePerSquare = data.pricePredictions.salePricePerSquare;
  const citySalePricePerTsubo = data.pricePredictions.salePricePerTsubo;
  const prefectureSalePricePerSquare =
    data.prefecture.pricePredictions.salePricePerSquare;
  const prefectureSalePricePerTsubo =
    data.prefecture.pricePredictions.salePricePerTsubo;

  if (
    ![
      citySalePricePerSquare,
      citySalePricePerTsubo,
      prefectureSalePricePerSquare,
      prefectureSalePricePerTsubo,
    ].every((el) => el && el.length !== 0)
  )
    return null;

  const salePricePerSquare = [];
  for (let i = 0; i < citySalePricePerSquare.length; i++) {
    salePricePerSquare.push({
      date: citySalePricePerSquare[i].date,
      city: Number(citySalePricePerSquare[i].city),
      prefecture: Number(prefectureSalePricePerSquare[i].prefecture),
    });
  }
  const salePricePerTsubo = [];
  for (let i = 0; i < citySalePricePerTsubo.length; i++) {
    salePricePerTsubo.push({
      date: citySalePricePerTsubo[i].date,
      city: Number(citySalePricePerTsubo[i].city),
      prefecture: Number(prefectureSalePricePerTsubo[i].prefecture),
    });
  }

  const prefectureName = data.prefecture.name;
  const cityName = data.name;

  const name = prefectureName + cityName;

  const targetListItems = [
    {
      name: prefectureName + cityName,
      key: createKey("city"),
      color: "#686D87",
    },
    {
      name: prefectureName,
      key: createKey("prefecture"),
      color: "#505050",
    },
  ];

  const mainKey = "city";

  return (
    <section className={"m_y_30px"}>
      <h2>
        <BoxHeading>{name}周辺のマンション相場遷移</BoxHeading>
      </h2>
      <MarketPriceItem
        mainKey={mainKey}
        name={name}
        salePricePerSquare={salePricePerSquare}
        salePricePerTsubo={salePricePerTsubo}
        targetListItems={targetListItems}
        defaultDiisplayKeyList={defaultDiisplayKeyList}
      />
    </section>
  );
};

export default MarketPrice;
