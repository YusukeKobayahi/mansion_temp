import dynamic from "next/dynamic";
import Item from "~/components/templates/Header/Humburger/Item";
const Radio = dynamic(() => import("~/components/commons/Radio"), {
  ssr: false,
});

import { CityProps } from "./City";

type NonNullable<T> = Exclude<T, null | undefined>;
type SchoolProps = NonNullable<CityProps["primarySchools"]>[number];
const School: React.FC<SchoolProps> = ({
  schoolId,
  name,
  mansionCount,
}: SchoolProps) => {
  if (mansionCount === 0) return null;
  return (
    <Item
      text={
        <div className={"flex"}>
          <div className={"p_l_40px"}>
            <Radio values={[schoolId]} shape={"circle"} useProvider={true} />
          </div>
          <span className={"p_l_20px"}>{name}区</span>
        </div>
      }
      underline={"dashed"}
      fontSize={"sm"}
      type={"normal"}
      arrow={false}
    />
  );
};

export default School;
