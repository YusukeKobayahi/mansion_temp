import styles from "./index.module.scss";

type ShowMoreBtnProps = {
  onClick: () => void;
  isLoading: boolean;
};

const ShowMoreBtn: React.FC<ShowMoreBtnProps> = ({ onClick, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <button className={styles.btn}>
          <span className={styles.skCircleFade}>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
            <span className={styles.skCircleFadeDot}></span>
          </span>
          読み込み中...
        </button>
      ) : (
        <button className={styles.btn} onClick={onClick}>
          さらに表示する
        </button>
      )}
    </>
  );
};

export default ShowMoreBtn;
