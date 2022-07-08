import styles from "./index.module.scss";

const Register: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Housii(ハウシー)に登録すると...</h2>
      <div className={styles.contents}>
        <div className={styles.comments}>
          <div className={styles.comment}>
            <div className={styles.commentHead}>
              <span>Point</span>
              <p>01</p>
            </div>
            <div className={styles.commentBody}>
              <p>
                サイトには、まだ乗っていない
                <br />
                「未公開物件」情報がいち早く手に入る
              </p>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.commentHead}>
              <span>Point</span>
              <p>02</p>
            </div>
            <div className={styles.commentBody}>
              <p>
                気になる物件の新着情報が届くので、
                <br />
                売出し情報を見逃す心配なし
              </p>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.commentHead}>
              <span>Point</span>
              <p>03</p>
            </div>
            <div className={styles.commentBody}>
              <p>
                口コミや偏差値による物件並び替えなど
                <br />
                会員限定コンテンツが使える
              </p>
            </div>
          </div>
        </div>
        <div className={styles.chart}>
          <picture>
            <source
              srcSet={"/ms-library/images/index/chart_sp.png"}
              media={"(max-width:768px)"}
            />
            <img
              src={"/ms-library/images/index/chart.png"}
              alt={"構造図"}
              width={484}
              height={301}
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Register;
