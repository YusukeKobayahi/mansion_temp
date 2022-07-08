import { MsLibraryIndexIeulColumnFragment } from "~/graphql/generated";
import styles from "./index.module.scss";
import classnames from "classnames";
import { useState } from "react";
import { buildArrayFromNumber } from "~/lib/utils";
import { event } from "~/lib/gtag";

type ColumnsProps = {
  data: MsLibraryIndexIeulColumnFragment[];
};

const Columns: React.FC<ColumnsProps> = ({ data }: ColumnsProps) => {
  const [currentNum, setCurrentNum] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const categoryPosts = data[0].category;
  const idsPosts = data[0].ids;
  if (![categoryPosts, idsPosts].every((el) => el && el.length !== 0))
    return null;
  const clickColumn = () => {
    event({
      action: "msl_content_click",
      category: "msl_top",
      label: "msl_column",
      value: 1,
    });
  };

  const totalCategoryPosts = Number(categoryPosts?.length);
  const spDefaultVisiblePosts = 4;
  const categoryPostsBlocks = categoryPosts?.map((a, i) => {
    return (
      <a
        href={String(a.href)}
        key={i}
        className={classnames(
          styles.block,
          i > spDefaultVisiblePosts - 1 && !isVisible ? styles.spHide : ""
        )}
        onClick={clickColumn}
      >
        <div className={styles.image}>
          <img src={String(a.thumbnail)} alt={String(a.title)} />
        </div>
        <div className={styles.text}>{a.title}</div>
      </a>
    );
  });
  const idsPostsBlocks = idsPosts?.map((a, i) => {
    return (
      <a href={String(a.href)} key={i} className={styles.column}>
        <div className={styles.image}>
          <img src={String(a.thumbnail)} alt={String(a.title)} />
        </div>
        <div className={styles.text}>{a.title}</div>
      </a>
    );
  });
  const slideAmount = {
    width: 220 * totalCategoryPosts,
    transform: `translateX(${-220 * currentNum}px)`,
  };
  const slideNext = () => {
    if (currentNum < totalCategoryPosts - 4) {
      setCurrentNum(currentNum + 1);
    } else {
      setCurrentNum(0);
    }
  };
  const slidePrev = () => {
    if (currentNum > 0) {
      setCurrentNum(currentNum - 1);
    } else {
      setCurrentNum(totalCategoryPosts - 4);
    }
  };
  const pagers = buildArrayFromNumber(totalCategoryPosts - 3).map((i) => {
    return (
      <button className={styles.pager} onClick={() => setCurrentNum(i)} key={i}>
        {currentNum === i ? (
          <span className={styles.current}>●</span>
        ) : (
          <span>●</span>
        )}
      </button>
    );
  });
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>物件探しお役立ちコラム</h2>
      <div className={styles.subTitle}>
        <h3>新着コラム</h3>
      </div>
      <div className={classnames(styles.slider, "pcOnly")}>
        <button
          onClick={slidePrev}
          className={classnames(styles.arrow, styles.prev)}
        ></button>
        <button
          onClick={slideNext}
          className={classnames(styles.arrow, styles.next)}
        ></button>
        <div className={styles.sliderInner}>
          <div className={styles.slides} style={slideAmount}>
            {categoryPostsBlocks}
          </div>
        </div>
        <div className={styles.pagers}>{pagers}</div>
      </div>
      <div className={classnames(styles.slider, "spOnly")}>
        <div className={styles.sliderInner}>
          <div className={styles.slides}>{categoryPostsBlocks}</div>
        </div>
        {!isVisible && (
          <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={() => setIsVisible(true)}>
              もっと見る
            </button>
          </div>
        )}
      </div>
      <div className={styles.columns}>{idsPostsBlocks}</div>
    </section>
  );
};

export default Columns;
