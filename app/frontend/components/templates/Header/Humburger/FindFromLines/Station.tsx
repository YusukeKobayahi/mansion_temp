import dynamic from "next/dynamic";
import Item from "~/components/templates/Header/Humburger/Item";
import { LineProps } from "./Line";
const Radio = dynamic(() => import("~/components/commons/Radio"), {
  ssr: false,
});

type StationProps = LineProps["stations"][number];
const Station: React.FC<StationProps> = ({
  id,
  name,
  mansionCount,
}: StationProps) => {
  if (mansionCount === 0) return null;
  return (
    <Item
      text={
        <div className={"flex"}>
          <div className={"p_l_40px"}>
            <Radio values={[id]} shape={"circle"} useProvider={true} />
          </div>
          <span className={"p_l_20px"}>{name}</span>
        </div>
      }
      underline={"dashed"}
      fontSize={"sm"}
      type={"normal"}
      arrow={false}
    />
  );
};

export default Station;
