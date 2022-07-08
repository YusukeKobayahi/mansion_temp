import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import SearchButton from "~/components/templates/Header/Humburger/SearchButton";
import CheckedValuesContextProvider from "~/components/Context/CheckedValuesContext";
import prefecturesList from "~/components/molecules/Search/prefectureList.json";
import Prefecture from "./Prefecture";

const FindFromSchools: React.FC = () => {
  return (
    <AccordionItem text={"小学校区から探す"} underline="solid">
      <CheckedValuesContextProvider>
        {prefecturesList.prefectures.map((prefecture, i) => {
          if (prefecture.jisCode === "40000") return;
          return <Prefecture key={i} {...prefecture} />;
        })}
        <SearchButton subject="schools" />
      </CheckedValuesContextProvider>
    </AccordionItem>
  );
};

export default FindFromSchools;
