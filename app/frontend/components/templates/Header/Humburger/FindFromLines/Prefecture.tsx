import { useLazyQuery } from "@apollo/client";
import { FindFromLinesDocument, FindFromLinesQuery } from "~/graphql/generated";
import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";

import prefecturesList from "~/components/molecules/Search/prefectureList.json";

import {
  handleLazyQueryErrorOrElement,
  useIsFetchedStatus,
} from "~/components/templates/Header/Humburger/utils";
import Company from "./Company";

export type PrefectureProps = typeof prefecturesList.prefectures[number];
const Prefecture: React.FC<PrefectureProps> = ({
  name,
  jisCode,
}: PrefectureProps) => {
  const [getCompanies, result] = useLazyQuery(FindFromLinesDocument);
  const isFetched = useIsFetchedStatus(result);

  const onClick = () => {
    if (isFetched) return;
    getCompanies({
      variables: { jisCode },
    });
  };

  return (
    <AccordionItem
      text={name}
      underline={"dashed"}
      fontSize="sm"
      onClick={onClick}
    >
      {handleLazyQueryErrorOrElement(result, (data: FindFromLinesQuery) => {
        const { companies } = (data as FindFromLinesQuery).prefecture;
        return (
          <>
            {companies.map((company, i) => (
              <Company key={i} {...company} />
            ))}
          </>
        );
      })}
    </AccordionItem>
  );
};

export default Prefecture;
