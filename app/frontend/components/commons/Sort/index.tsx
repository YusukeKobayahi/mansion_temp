import Router from "next/router";
import includes from "lodash/includes";
import styles from "~/components/commons/Sort/index.module.scss";
import { QueryVariables } from "~/lib/types";
import { searchOptions, SortQueryKeys, ModelQueryKeys } from "~/lib/property";
import map from "lodash/map";
import omitBy from "lodash/omitBy";
import intersection from "lodash/intersection";
import sortData from "~/components/commons/Sort/sortData.json";

export interface SortProps {
  pathname: string;
  searchCondition: QueryVariables;
}

const Sort: React.FC<SortProps> = ({ pathname, searchCondition }) => {
  const currentSortKeys = intersection(
    SortQueryKeys,
    Object.keys(searchCondition)
  );
  const defaultValue = (() => {
    if (!currentSortKeys.length) sortData.orud[0].value;
    const key = currentSortKeys[0] as keyof QueryVariables;
    return `${key}&${searchCondition[key]}`;
  })();

  const query = omitBy(
    { ...searchCondition },
    (value, key) =>
      includes(searchOptions, key) ||
      (includes(ModelQueryKeys, key) && String(value).split(",").length === 1)
  );

  const setQuery = (key: string, value: string) => {
    query[key] = value;
    Router.push({
      pathname,
      query,
    });
  };

  const sortItem = map(sortData, (value) => {
    return value.map((data, i) => (
      <option key={i} value={data.value}>
        {data.name}
      </option>
    ));
  });
  // onChangeで並び替えの即時検索を行いためESLintを無効に
  /* eslint-disable */ return (
    <section className={styles.container}>
      <p>並べ替え</p>
      <div className={styles.sortBox}>
        <select
          name="sort"
          onChange={(e) => {
            setQuery(
              e.target.value.split("&")[0],
              e.target.value.split("&")[1]
            );
          }}
          value={defaultValue}
        >
          {sortItem}
        </select>
      </div>
    </section>
  );
};

export default Sort;
