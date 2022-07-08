import Router from "next/router";
import { intersection, omitBy, flatten } from "lodash";
import SelectBox from "~/components/commons/SelectBox";
import { CommuteStationsQueryVariables } from "~/graphql/generated";
import sortQueryData from "~/components/pages/commute/stations/json/sortQueryData.json";

type SortBoxProps = {
  currentPath: string;
  searchCondition: CommuteStationsQueryVariables;
};

const SortBox: React.FC<SortBoxProps> = ({
  currentPath,
  searchCondition,
}: SortBoxProps) => {
  const sortQueryDataKeys = Object.keys(sortQueryData);
  const currentSortKeys = intersection(
    sortQueryDataKeys,
    Object.keys(searchCondition)
  );
  const currentSortKey = currentSortKeys[0] as keyof CommuteStationsQueryVariables;
  const defaultValue = currentSortKeys.length
    ? `${currentSortKey}&${searchCondition[currentSortKey]}`
    : sortQueryData.orap.patterns[0].value;

  const query = omitBy({ ...searchCondition }, (_, key) =>
    sortQueryDataKeys.includes(key)
  );

  const setSortQuery = (key: string, value: string) => {
    query[key] = value;
    Router.push({
      pathname: currentPath,
      query,
    });
  };

  // 扱っているデータは../json/sortQueryData.jsonを参照
  // データ上二次元配列になってしまうため一次元配列にするためにflattenしている
  // 例: flatten([[option, option],[option]...]) => [option, option, option ...]
  const sortOptions = flatten(
    sortQueryDataKeys.map((key) => {
      const queryData = sortQueryData[key as keyof typeof sortQueryData];
      return queryData.patterns.map(({ name, value }) => {
        const option = {
          value: `${key}&${value}`,
          text: name,
        };
        return option;
      });
    })
  );

  return (
    <SelectBox
      options={sortOptions}
      defaultValue={defaultValue}
      onChange={(e) => {
        const [key, value] = e.target.value.split("&");
        setSortQuery(key, value);
      }}
    />
  );
};

export default SortBox;
