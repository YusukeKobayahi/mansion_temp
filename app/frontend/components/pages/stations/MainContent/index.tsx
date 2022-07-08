import { StationsQuery, MansionPaginationQuery } from "~/graphql/generated";
import { QueryVariables } from "~/lib/types";
import styles from "~/components/pages/cities/MainContent/index.module.scss";
import MansionList from "~/components/organisms/MansionList";
import MansionSearchTemplate from "~/components/templates/MansionSearchTemplate";
import classnames from "classnames";
import isEqual from "lodash/isEqual";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";

type MainContentProps = {
  data: StationsQuery;
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
  const page = "stations";
  const stations = data.stations;
  const lines = uniqBy(
    stations.map(({ line }) => line),
    "id"
  );
  const mansions = mansionsData.mansionPagination.mansions;
  const subjectNames = stations.map(({ name }) => name);

  /**
   * ある路線内全ての駅を検索中の場合「${路線名}/全ての駅」にしたい。
   * そうでない場合は「${路線名}/${駅名,,,}」にしたい。
   */
  const longSubjectNames = lines.map(({ name, stations: stationsOfLine }) => {
    const stationIdsOfLine = stationsOfLine.map(({ id }) => id);
    const filteredStations = stations.filter(({ id }) =>
      stationIdsOfLine.includes(id)
    );
    const filteredStationIds = filteredStations.map(({ id }) => id);
    const isIdsMatched = isEqual(
      sortBy(stationIdsOfLine),
      sortBy(filteredStationIds)
    );
    const suffix = isIdsMatched
      ? "全ての駅"
      : filteredStations.map(({ name }) => name).join(",");
    return `${name}/${suffix}`;
  });

  return (
    <div className={styles.container} id="list">
      <div className={styles.listWrapper}>
        <div className={classnames(styles.search, "pcOnly")}>
          <MansionSearchTemplate
            searchCondition={searchCondition}
            subjectList={longSubjectNames}
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
          subjectList={longSubjectNames}
          page={page}
        />
      </div>
    </div>
  );
};

export default MainContent;
