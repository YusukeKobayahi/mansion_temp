import { CitiesQuery, MansionPaginationQuery } from "~/graphql/generated";
import styles from "./index.module.scss";
import MansionList from "~/components/organisms/MansionList";
import MansionSearchTemplate from "~/components/templates/MansionSearchTemplate";
import classnames from "classnames";
import { QueryVariables } from "~/lib/types";

type MainContentProps = {
  data: CitiesQuery;
  mansionsData: MansionPaginationQuery;
  currentPage: number;
  totalPages: number;
  pathname: string;
  totalCount: number;
  searchCondition: QueryVariables;
};

const MainContent: React.FC<MainContentProps> = ({
  data,
  mansionsData,
  currentPage,
  totalPages,
  pathname,
  totalCount,
  searchCondition,
}: MainContentProps) => {
  const page = "cities";
  const subjectNames = data.cities.map(({ name }) => name);
  const mansions = mansionsData.mansionPagination.mansions;
  return (
    <div className={styles.container} id="list">
      <div className={styles.listWrapper}>
        <div className={classnames(styles.search, "pcOnly")}>
          <MansionSearchTemplate
            page={page}
            subjectList={subjectNames}
            searchCondition={searchCondition}
            jisCode={data.cities[0].prefecture.jisCode}
            prefecture={data.cities[0].prefecture}
          />
        </div>
        <div className={styles.list}>
          <MansionList
            {...{
              subjectNames,
              mansions,
              currentPage,
              totalPages,
              pathname,
              totalCount,
              searchCondition,
            }}
          />
        </div>
      </div>
      {/**
       * 以下の部分は本来MiniSearchを表示させたいためだけに存在するのでMiniSearchコンポーネントのみを置くべきで
       * MansionSearchTemplateはMiniSearchを保持すべきでないが、SearchConditionContextに依存しているのでこのコンポーネントの階層でSearchConditionContextを定義することになってくる。
       * しかし、それではこのコンポーネントの共通化、つまりマンション一覧ページのテンプレートを作成することにつながってくるので
       * MiniSearchに置き換える作業はマンション一覧ページのテンプレートを作成する際にする。
       */}
      <div className={"spOnly"}>
        <MansionSearchTemplate
          page={page}
          subjectList={subjectNames}
          searchCondition={searchCondition}
          jisCode={data.cities[0].prefecture.jisCode}
          prefecture={data.cities[0].prefecture}
        />
      </div>
    </div>
  );
};

export default MainContent;
