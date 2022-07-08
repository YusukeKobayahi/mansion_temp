import styles from "~/components/organisms/SearchModal/index.module.scss";
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import SearchFilterSelection from "~/components/organisms/SearchFilterSelection";
import ButtonRect from "~/components/commons/ButtonRect";
import { useToggles } from "~/components/Context/ToggleContext";
import {
  buildSearchUrlFromHref,
  getFilterQueryVariables,
  useCurrentPath,
  pathFormat,
} from "~/lib/utils";
import { event } from "~/lib/gtag";
import { FilterQueryParameters } from "~/lib/types";

type FilterSelectionProps = {
  filterQueryParameters: FilterQueryParameters;
};

const FilterSelection: React.FC<FilterSelectionProps> = ({
  filterQueryParameters,
}: FilterSelectionProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const currentPath = useCurrentPath();
  const filterQueryVariables = getFilterQueryVariables({
    filterQueryParameters,
  });
  const href = {
    pathname: pathFormat(currentPath),
    query: filterQueryVariables,
  };
  const searchUrl = buildSearchUrlFromHref(href);

  const changeCondition = () => {
    event({
      action: "msl_link_click",
      category: "msl_ichiran",
      label: searchUrl,
      value: 1,
    });
    setIsSearchModalOpen(false);
  };

  return (
    <BasicLayout title="検索条件">
      <SearchFilterSelection withTitle={false} />
      <div className={styles.btn_container}>
        <div className={styles.btn_inner}>
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="閉じる"
            outline={true}
            onClick={() => setIsSearchModalOpen(false)}
          />
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="検索する"
            linkProps={{ href }}
            onClick={changeCondition}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default FilterSelection;
