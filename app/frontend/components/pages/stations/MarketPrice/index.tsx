import BoxHeading from "~/components/commons/headings/BoxHeading";
import { MsLibraryStationsMarketPriceFragment } from "~/graphql/generated";
import { createKey } from "~/lib/utils";
import dynamic from "next/dynamic";
const MarketPriceItem = dynamic(
  () => import("~/components/commons/Chart/MarketPriceItem")
);

type MarketPriceProps = {
  data: MsLibraryStationsMarketPriceFragment;
};

const MarketPrice: React.FC<MarketPriceProps> = ({
  data,
}: MarketPriceProps) => {
  const defaultDiisplayKeyList = ["station", "city", "prefecture"];
  const stationSalePricePerSquare = data.pricePredictions.salePricePerSquare;
  const stationSalePricePerTsubo = data.pricePredictions.salePricePerTsubo;
  const citySalePricePerSquare = data.city.pricePredictions.salePricePerSquare;
  const citySalePricePerTsubo = data.city.pricePredictions.salePricePerTsubo;
  const prefectureSalePricePerSquare =
    data.city.prefecture.pricePredictions.salePricePerSquare;
  const prefectureSalePricePerTsubo =
    data.city.prefecture.pricePredictions.salePricePerTsubo;

  if (
    ![
      stationSalePricePerSquare,
      stationSalePricePerTsubo,
      citySalePricePerSquare,
      citySalePricePerTsubo,
      prefectureSalePricePerSquare,
      prefectureSalePricePerTsubo,
    ].every((el) => el && el.length !== 0)
  )
    return null;

  const salePricePerSquare = [];
  for (let i = 0; i < stationSalePricePerSquare.length; i++) {
    salePricePerSquare.push({
      date: stationSalePricePerSquare[i].date,
      station: Number(stationSalePricePerSquare[i].station),
      city: Number(citySalePricePerSquare[i].city),
      prefecture: Number(prefectureSalePricePerSquare[i].prefecture),
    });
  }
  const salePricePerTsubo = [];
  for (let i = 0; i < stationSalePricePerTsubo.length; i++) {
    salePricePerTsubo.push({
      date: stationSalePricePerTsubo[i].date,
      station: Number(stationSalePricePerTsubo[i].station),
      city: Number(citySalePricePerTsubo[i].city),
      prefecture: Number(prefectureSalePricePerTsubo[i].prefecture),
    });
  }

  const stationName = data.name + "駅";
  const cityName = data.city.name;
  const prefectureName = data.city.prefecture.name;

  const targetListItems = [
    {
      name: stationName,
      key: createKey("station"),
      color: "#9D9990",
    },
    {
      name: cityName,
      key: createKey("city"),
      color: "#686D87",
    },
    {
      name: prefectureName,
      key: createKey("prefecture"),
      color: "#505050",
    },
  ];

  const mainKey = "station";

  return (
    <section className={"m_y_30px"}>
      <h2>
        <BoxHeading>{stationName}周辺のマンション相場遷移</BoxHeading>
      </h2>
      <MarketPriceItem
        mainKey={mainKey}
        name={stationName}
        salePricePerSquare={salePricePerSquare}
        salePricePerTsubo={salePricePerTsubo}
        targetListItems={targetListItems}
        defaultDiisplayKeyList={defaultDiisplayKeyList}
      />
    </section>
  );
};

export default MarketPrice;
