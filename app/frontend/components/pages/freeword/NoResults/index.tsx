import styles from "./index.module.scss";

const Alert: React.FC = () => (
  <div className={styles.container}>
    <p className={styles.text}>
      ご指定のキーワードを含むマンションはありませんでした。
      <br />
      キーワードを変更し、再度検索ください。
    </p>
    <div className={styles.faq}>
      <p className={styles.title}>もしかして...</p>
      <div className={styles.block}>
        <p className={styles.question}>マンション名は正しいですか？</p>
        <p className={styles.answer}>
          <span>例) </span>
          ○ヴェールマンション ×ベールマンション
          <br />
          ○プラウドマンション ×ブラウドマンション
        </p>
      </div>
      <div className={styles.block}>
        <p className={styles.question}>
          マンション名以外のキーワードが入っていませんか？
        </p>
        <p className={styles.answer}>
          <span>例) </span>
          ×ヴェールマンション205 3LDK
          <br />
          ○ヴェールマンション
        </p>
      </div>
    </div>
  </div>
);

export default Alert;
