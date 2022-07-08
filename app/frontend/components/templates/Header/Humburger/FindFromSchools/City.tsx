import { FindFromShoolsQuery } from "~/graphql/generated";

import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import School from "./School";
import dynamic from "next/dynamic";
const Radio = dynamic(() => import("~/components/commons/Radio"), {
  ssr: false,
});

export type CityProps = FindFromShoolsQuery["prefecture"]["cities"][number];
const City: React.FC<CityProps> = ({ name, primarySchools }: CityProps) => {
  if (!primarySchools || !primarySchools.length) return null;

  const sumOfSchoolsMansionCount = primarySchools.reduce(
    (sum, { mansionCount }) => (sum += mansionCount),
    0
  );
  if (sumOfSchoolsMansionCount === 0) return null;

  const schoolIds = primarySchools.map(({ schoolId }) => schoolId);
  return (
    <AccordionItem
      text={
        <div className={"flex"}>
          <div className={"p_l_20px"}>
            <Radio values={schoolIds} shape={"circle"} useProvider={true} />
          </div>
          <span className={"p_l_20px"}>
            {name}({sumOfSchoolsMansionCount})
          </span>
        </div>
      }
      fontSize={"sm"}
      underline="dashed"
    >
      {primarySchools.map((school, i) => (
        <School key={i} {...school} />
      ))}
    </AccordionItem>
  );
};

export default City;
