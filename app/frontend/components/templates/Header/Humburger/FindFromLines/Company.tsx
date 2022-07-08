import { FindFromLinesQuery } from "~/graphql/generated";

import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import Line from "./Line";

export type CompanyProps = FindFromLinesQuery["prefecture"]["companies"][number];
const Company: React.FC<CompanyProps> = ({ name, lines }: CompanyProps) => {
  return (
    <AccordionItem
      text={<div>&emsp;{name}</div>}
      fontSize={"sm"}
      underline="dashed"
    >
      {lines.map((line, i) => (
        <Line key={i} {...line} />
      ))}
    </AccordionItem>
  );
};

export default Company;
