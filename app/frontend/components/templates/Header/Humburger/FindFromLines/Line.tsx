import dynamic from "next/dynamic";
import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import { CompanyProps } from "./Company";
import Station from "./Station";
const Radio = dynamic(() => import("~/components/commons/Radio"), {
  ssr: false,
});

export type LineProps = CompanyProps["lines"][number];
const Line: React.FC<LineProps> = ({ name, mansionCount, stations }) => {
  if (mansionCount === 0) return null;
  const stationsIds = stations.map(({ id }) => id);
  return (
    <AccordionItem
      text={
        <div className={"flex"}>
          <div className={"p_l_20px"}>
            <Radio values={stationsIds} shape={"circle"} useProvider={true} />
          </div>
          <span className={"p_l_20px"}>
            {name}({mansionCount})
          </span>
        </div>
      }
      fontSize={"sm"}
      underline="dashed"
    >
      {stations.map((station, i) => (
        <Station key={i} {...station} />
      ))}
    </AccordionItem>
  );
};

export default Line;
