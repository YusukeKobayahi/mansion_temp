import { useState } from "react";
import { PageCategory, QueryVariables } from "~/lib/types";
import SearchFilterSelection from "~/components/organisms/SearchFilterSelection";
import SearchModal, {
  SearchModalTabType,
} from "~/components/organisms/SearchModal";
import SearchCondition from "~/components/organisms/SearchCondition";
import FloatMiniSearch from "~/components/organisms/FloatMiniSearch";
import MiniSearch from "~/components/organisms/MiniSearch";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";

type MansionSearchTemplateProps = {
  subjectList: string[];
  cityNemeList?: string[];
  searchCondition: QueryVariables;
  jisCode?: string;
  // できればpageみたいに引数を渡したくない。ページによって表示するものを変更するのは子コンポーネント側の仕事にはできるだけしたくない。
  page: PageCategory;
  prefecture?: { name: string; jisCode: string };
};

const MansionSearchTemplate: React.FC<MansionSearchTemplateProps> = ({
  subjectList,
  cityNemeList,
  searchCondition,
  jisCode,
  page,
  prefecture,
}: MansionSearchTemplateProps) => {
  const [tab, setTab] = useState<SearchModalTabType>("City");

  return (
    <SearchConditionContextProvider searchCondition={searchCondition}>
      <ToggleContextProvider>
        <section>
          <div className="pcOnly">
            <div className="m_b_20px">
              <SearchCondition
                searchCondition={searchCondition}
                page={page}
                currentMainSearchCondition={subjectList}
                prefectureInfo={prefecture}
                setTab={setTab}
              />
            </div>
            <SearchFilterSelection />
          </div>
          <div className="spOnly">
            <div className="p_x_16px m_y_20px">
              <MiniSearch
                page={page}
                currentMainSearchCondition={subjectList.join(",")}
                currentCitiesSearchCondition={
                  cityNemeList ? cityNemeList.join(",") : undefined
                }
                searchCondition={searchCondition}
                setTab={setTab}
              />
            </div>
            <FloatMiniSearch
              page={page}
              currentMainSearchCondition={subjectList.join(",")}
              currentCitiesSearchCondition={
                cityNemeList ? cityNemeList.join(",") : undefined
              }
              searchCondition={searchCondition}
              setTab={setTab}
            />
          </div>
          <SearchModal jisCode={jisCode} tab={tab} setTab={setTab} />
        </section>
      </ToggleContextProvider>
    </SearchConditionContextProvider>
  );
};

export default MansionSearchTemplate;
