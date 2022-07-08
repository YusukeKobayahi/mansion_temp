import BoxHeading from "~/components/commons/headings/BoxHeading";
import { MsLibraryTownsMarketPriceFragment } from "~/graphql/generated";
import { createKey } from "~/lib/utils";
import dynamic from "next/dynamic";
const MarketPriceItem = dynamic(
  () => import("~/components/commons/Chart/MarketPriceItem")
);

type MarketPriceProps = {
  data: MsLibraryTownsMarketPriceFragment;
};

const MarketPrice: React.FC<MarketPriceProps> = ({
  data,
}: MarketPriceProps) => {
  const defaultDiisplayKeyList = ["town", "city", "prefecture"];
  const townSalePricePerSquare = data.pricePredictions.salePricePerSquare;
  const townSalePricePerTsubo = data.pricePredictions.salePricePerTsubo;
  const citySalePricePerSquare = data.city.pricePredictions.salePricePerSquare;
  const citySalePricePerTsubo = data.city.pricePredictions.salePricePerTsubo;
  const prefectureSalePricePerSquare =
    data.city.prefecture.pricePredictions.salePricePerSquare;
  const prefectureSalePricePerTsubo =
    data.city.prefecture.pricePredictions.salePricePerTsubo;

  if (
    ![
      townSalePricePerSquare,
      townSalePricePerTsubo,
      citySalePricePerSquare,
      citySalePricePerTsubo,
      prefectureSalePricePerSquare,
      prefectureSalePricePerTsubo,
    ].every((el) => el && el.length !== 0)
  )
    return null;

  const salePricePerSquare = [];
  for (let i = 0; i < townSalePricePerSquare.length; i++) {
    salePricePerSquare.push({
      date: townSalePricePerSquare[i].date,
      town: Number(townSalePricePerSquare[i].town),
      city: Number(citySalePricePerSquare[i].city),
      prefecture: Number(prefectureSalePricePerSquare[i].prefecture),
    });
  }
  const salePricePerTsubo = [];
  for (let i = 0; i < townSalePricePerTsubo.length; i++) {
    salePricePerTsubo.push({
      date: townSalePricePerTsubo[i].date,
      town: Number(townSalePricePerTsubo[i].town),
      city: Number(citySalePricePerTsubo[i].city),
      prefecture: Number(prefectureSalePricePerTsubo[i].prefecture),
    });
  }

  const townName = data.name;
  const cityName = data.city.name;
  const prefectureName = data.city.prefecture.name;

  const targetListItems = [
    {
      name: prefectureName + cityName + townName,
      key: createKey("town"),
      color: "#746744",
    },
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

  const mainKey = "town";
  const name = prefectureName + cityName + townName;

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
