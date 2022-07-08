import styles from "~/components/commons/CurrentPageNumber/index.module.scss";

export interface CurrentPageNumberProps {
  currentPage: number;
  totalCount: number;
}

const CurrentPageNumber: React.FC<CurrentPageNumberProps> = ({
  currentPage = 1,
  totalCount,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.currentCount}>
        {currentPage * 15 < totalCount ? currentPage * 15 : totalCount} /{" "}
      </p>
      <p className={styles.totalCount}>{totalCount}件</p>
    </div>
  );
};

export default CurrentPageNumber;
