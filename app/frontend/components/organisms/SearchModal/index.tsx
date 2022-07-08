import CityList from "./CityList";
import TownList from "./TownList";
import LineList from "./LineList";
import StationList from "./StationList";
import FilterSelection from "./FilterSelection";
import PrimarySchoolsList from "./PrimarySchoolsList";
import BrandList from "./BrandList";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import { useToggles } from "~/components/Context/ToggleContext";
import { ReactSetStateType } from "~/lib/types";

export type SearchModalTabType =
  | "City"
  | "Town"
  | "Line"
  | "Station"
  | "Brand"
  | "PrimarySchool"
  | "FilterSelection";

type ModalsProps = {
  jisCode?: string;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const SearchModal: React.FC<ModalsProps> = ({
  jisCode = "13000", //東京都jisCode
  tab,
  setTab,
}: ModalsProps) => {
  const { filterQueryParameters } = useSearchCondition();
  const { toggle: isOpen } = useToggles();

  if (!isOpen) return null;
  return (
    <>
      {tab === "FilterSelection" && (
        <FilterSelection filterQueryParameters={filterQueryParameters} />
      )}
      {tab === "City" && (
        <CityList
          jisCode={jisCode}
          filterQueryParameters={filterQueryParameters}
          setTab={setTab}
          tab={tab}
        />
      )}
      {tab === "Town" && (
        <TownList
          filterQueryParameters={filterQueryParameters}
          tab={tab}
          setTab={setTab}
        />
      )}
      {tab === "Line" && (
        <LineList
          jisCode={jisCode}
          filterQueryParameters={filterQueryParameters}
          setTab={setTab}
          tab={tab}
        />
      )}
      {tab === "Station" && (
        <StationList
          filterQueryParameters={filterQueryParameters}
          tab={tab}
          setTab={setTab}
        />
      )}
      {tab === "Brand" && (
        <BrandList
          filterQueryParameters={filterQueryParameters}
          tab={tab}
          setTab={setTab}
        />
      )}
      {tab === "PrimarySchool" && (
        <PrimarySchoolsList
          jisCode={jisCode}
          filterQueryParameters={filterQueryParameters}
          setTab={setTab}
          tab={tab}
        />
      )}
    </>
  );
};

export default SearchModal;
