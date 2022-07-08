import { MsLibraryMansionsMarketPriceFragment } from "~/graphql/generated";
import dynamic from "next/dynamic";
const MarketPriceItem = dynamic(
  () => import("~/components/commons/Chart/MarketPriceItem")
);

type MarketPriceProps = {
  data: MsLibraryMansionsMarketPriceFragment;
};

const MarketPrice: React.FC<MarketPriceProps> = ({
  data,
}: MarketPriceProps) => {
  const defaultDiisplayKeyList = [
    "building",
    "town",
    "city",
    "prefecture",
    "station",
  ];
  const salePricePerSquare = data.priceHubble?.salePricePerSquare.map((o) => {
    return {
      date: o.date,
      building: Number(o.building),
      town: Number(o.town),
      city: Number(o.city),
      prefecture: Number(o.prefecture),
      station: Number(o.station),
    };
  });
  const salePricePerTsubo = data.priceHubble?.salePricePerTsubo.map((o) => {
    return {
      date: o.date,
      building: Number(o.building),
      town: Number(o.town),
      city: Number(o.city),
      prefecture: Number(o.prefecture),
      station: Number(o.station),
    };
  });
  if (
    !salePricePerSquare ||
    salePricePerSquare.length === 0 ||
    !salePricePerTsubo ||
    salePricePerTsubo.length === 0
  )
    return null;

  const prefectureName = data.prefecture.name;
  const cityName = data.city.name;
  const townName = data.town.name;
  const stationName =
    data.access.length > 0
      ? data.access.map((a) => a.stationName + "駅")[0]
      : "";

  const name = prefectureName + cityName + townName;

  const createKey = (
    s: "building" | "town" | "city" | "prefecture" | "station" | "line"
  ): "building" | "town" | "city" | "prefecture" | "station" | "line" => s;

  const targetListItems = [
    {
      name: data.name,
      key: createKey("building"),
      color: "#B2A173",
    },
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
    {
      name: stationName,
      key: createKey("station"),
      color: "#9D9990",
    },
  ];

  const mainKey = "town";

  return (
    <MarketPriceItem
      mainKey={mainKey}
      name={name}
      salePricePerSquare={salePricePerSquare}
      salePricePerTsubo={salePricePerTsubo}
      targetListItems={targetListItems}
      defaultDiisplayKeyList={defaultDiisplayKeyList}
    />
  );
};

export default MarketPrice;
