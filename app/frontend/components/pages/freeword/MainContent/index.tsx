import { MansionPaginationQuery } from "~/graphql/generated";
import { QueryVariables } from "~/lib/types";
import styles from "~/components/pages/cities/MainContent/index.module.scss";
import MansionList from "~/components/organisms/MansionList";
import classnames from "classnames";
import MansionSearchTemplate from "~/components/templates/MansionSearchTemplate/";

type MainContentProps = {
  mansionsData: MansionPaginationQuery;
  currentPage: number;
  totalPages: number;
  pathname: string;
  totalCount: number;
  searchCondition: QueryVariables;
};

const MainContent: React.FC<MainContentProps> = ({
  mansionsData,
  currentPage,
  totalPages,
  pathname,
  totalCount,
  searchCondition,
}: MainContentProps) => {
  const page = "freeword";
  const subjectNames = [String(searchCondition.wd)];
  const mansions = mansionsData.mansionPagination.mansions;
  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        <div className={classnames(styles.search, "pcOnly")}>
          <MansionSearchTemplate
            searchCondition={searchCondition}
            subjectList={subjectNames}
            page={page}
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
              page,
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
          searchCondition={searchCondition}
          subjectList={subjectNames}
          page={page}
        />
      </div>
    </div>
  );
};

export default MainContent;
