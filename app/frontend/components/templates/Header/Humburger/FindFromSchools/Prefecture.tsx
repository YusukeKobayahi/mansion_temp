import { useLazyQuery } from "@apollo/client";
import {
  FindFromShoolsDocument,
  FindFromShoolsQuery,
} from "~/graphql/generated";

import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import City from "./City";

import prefecturesList from "~/components/molecules/Search/prefectureList.json";

import {
  handleLazyQueryErrorOrElement,
  useIsFetchedStatus,
} from "~/components/templates/Header/Humburger/utils";

type PrefectureProps = typeof prefecturesList.prefectures[number];
const Prefecture: React.FC<PrefectureProps> = ({
  name,
  jisCode,
}: PrefectureProps) => {
  const [getCompanies, result] = useLazyQuery(FindFromShoolsDocument);
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
      {handleLazyQueryErrorOrElement(result, (data: FindFromShoolsQuery) => {
        const { cities } = (data as FindFromShoolsQuery).prefecture;
        return (
          <>
            {cities.map((city, i) => (
              <City key={i} {...city} />
            ))}
          </>
        );
      })}
    </AccordionItem>
  );
};

export default Prefecture;
