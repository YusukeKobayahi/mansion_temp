import { MansionCardDataFragment } from "~/graphql/generated";
import { QueryVariables } from "~/lib/types";
import Pagination from "~/components/commons/Pagination";
import CurrentPageNumber from "~/components/commons/CurrentPageNumber";
import BottomCTA from "~/components/commons/CTAs/BottomCTA";
import PopupCTA from "~/components/commons/CTAs/PopupCTA";
import MansionCard from "~/components/molecules/MansionCard";
import InsertCTA from "~/components/commons/CTAs/InsertCTA";
import Alert from "~/components/commons/Alert";
import NoResults from "~/components/pages/freeword/NoResults";
import styles from "./index.module.scss";

type MansionListProps = {
  mansions: MansionCardDataFragment[];
  subjectNames: string[];
  currentPage: number;
  totalPages: number;
  pathname: string;
  totalCount: number;
  searchCondition: QueryVariables;
  page?: "freeword";
};

const MansionList: React.FC<MansionListProps> = ({
  mansions,
  subjectNames,
  currentPage,
  totalPages,
  pathname,
  totalCount,
  searchCondition,
  page,
}: MansionListProps) => {
  const getNotFoundComponent = (page?: string) => {
    if (page === "freeword") return <NoResults />;
    return (
      <Alert
        text="条件に合う物件がありません。条件を変更して再度検索してください。"
        outline={true}
      />
    );
  };
  return (
    <>
      {totalCount !== 0 && (
        <div>
          {mansions.map((mansion, i) => (
            <div className={styles.cards} key={i}>
              <MansionCard
                {...mansion}
                subjectNames={subjectNames}
                writing={false}
              />
              {Math.ceil(mansions.length / 2) == i + 1 && <InsertCTA />}
            </div>
          ))}
        </div>
      )}
      {totalCount === 0 && getNotFoundComponent(page)}
      <div className={styles.container}>
        {totalCount !== 0 && (
          <div className={styles.inner}>
            <CurrentPageNumber
              currentPage={currentPage}
              totalCount={totalCount}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pathname={pathname}
              searchCondition={searchCondition}
            />
          </div>
        )}
        <BottomCTA />
        <PopupCTA />
      </div>
    </>
  );
};

export default MansionList;
