import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import CheckedValuesContextProvider from "~/components/Context/CheckedValuesContext";
import SearchButton from "~/components/templates/Header/Humburger/SearchButton";

import prefecturesList from "~/components/molecules/Search/prefectureList.json";

import Prefecture from "./Prefecture";

const FindFromLines: React.FC = () => {
  return (
    <AccordionItem text={"路線から探す"} underline="solid">
      <CheckedValuesContextProvider>
        {prefecturesList.prefectures.map((prefecture, i) => (
          <Prefecture key={i} {...prefecture} />
        ))}
        <SearchButton subject="stations" />
      </CheckedValuesContextProvider>
    </AccordionItem>
  );
};

export default FindFromLines;
