import { useState, useEffect } from "react";
import Image from "next/image";
import { SchoolReviewsDataFragment } from "~/graphql/generated";
import styles from "./index.module.scss";
import classnames from "classnames";
import BoxHeading from "~/components/commons/headings/BoxHeading";

type SchoolReviewsProps = {
  title: string;
  data: SchoolReviewsDataFragment;
};

const SchoolReviews: React.FC<SchoolReviewsProps> = ({
  title,
  data,
}: SchoolReviewsProps) => {
  const totalReviewNum = data ? Number(data?.review?.length) : 0;
  const [isVisibleList, setIsVisibleList] = useState(
    new Array<boolean>(totalReviewNum).fill(false)
  );

  useEffect(() => {
    setIsVisibleList(new Array<boolean>(totalReviewNum).fill(false));
  }, [data]);

  if (!data || !data.review || totalReviewNum === 0) return null;

  const updateIsVisibleList = (n: number) => {
    const updateVisibleList = [...isVisibleList];
    updateVisibleList.splice(n, n + 1, true);
    setIsVisibleList(updateVisibleList);
  };
  const maxRate = 5;
  const items = [...data.review].reverse().map((a, i) => {
    const createArrayFromNumber = (n: number) =>
      Array.from(new Array(n)).map((_, i) => i);
    const stars = createArrayFromNumber(a.generalRate).map((i) => {
      return (
        <Image
          key={i}
          src="/ms-library/images/star.svg"
          width={25}
          height={24}
          alt="星"
        />
      );
    });
    const starsGrey = createArrayFromNumber(maxRate - a.generalRate).map(
      (i) => {
        return (
          <Image
            key={i}
            src="/ms-library/images/star-grey.svg"
            width={25}
            height={24}
            alt="星"
          />
        );
      }
    );
    const valuationRate = (n: number) => {
      return createArrayFromNumber(maxRate).map((i) => {
        return <span key={i} className={i < n ? styles.on : ""}></span>;
      });
    };
    const buildTextFromBoolean = (b: boolean) => {
      return b ? "あり" : "なし";
    };
    return (
      <blockquote
        key={i}
        className={classnames(
          styles.block,
          !isVisibleList[i] ? styles.hide : ""
        )}
      >
        <div className={styles.blockInner}>
          <div className={styles.head}>
            <div className={styles.headImage}>
              <Image
                src="/ms-library/images/man.svg"
                width={44}
                height={44}
                alt="男性"
              />
            </div>
            <div className={styles.headText}>
              <p>
                <span>保護者/{a.admmisionYear}年入学</span>
                <span>
                  {a.postYear}年{a.postMonth}月投稿
                </span>
              </p>
              <h4>{a.title}</h4>
            </div>
          </div>
          <div className={styles.body}>
            <div className={classnames(styles.content, styles.contentTop)}>
              <div className={styles.contentMain}>
                <h5>総合評価</h5>
                <p className={styles.contentText}>{a.generalText}</p>
              </div>
              <div className={styles.chart}>
                <div className={styles.chartHead}>
                  {stars}
                  {starsGrey}
                  <span>{a.generalRate.toFixed(1)}</span>
                </div>
                <div className={styles.chartBody}>
                  <div className={styles.chartContentWrapper}>
                    {a.policyRate ? (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>方針・理念</p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.policyRate))}
                        </div>
                      </div>
                    ) : null}
                    {a.classRate ? (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>授業</p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.classRate))}
                        </div>
                      </div>
                    ) : null}
                    {a.teacherRate ? (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>先生</p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.teacherRate))}
                        </div>
                      </div>
                    ) : null}
                    {a.institutionRate && (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>
                          施設・
                          <br className={"spOnly"} />
                          セキュリティ
                        </p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.institutionRate))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.chartContentWrapper}>
                    {a.accessRate ? (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>
                          アクセス・立地
                        </p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.accessRate))}
                        </div>
                      </div>
                    ) : null}
                    {a.ptaRate ? (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>
                          保護者関係(PTA)
                        </p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.ptaRate))}
                        </div>
                      </div>
                    ) : null}
                    {a.eventRate ? (
                      <div className={styles.chartContent}>
                        <p className={styles.chartContentTitle}>イベント</p>
                        <div className={styles.chartContentBar}>
                          {valuationRate(Number(a.eventRate))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            {isVisibleList[i] && (
              <>
                {a.policyText && (
                  <div className={styles.content}>
                    <h5>方針・理念</h5>
                    <p className={styles.contentText}>{a.policyText}</p>
                  </div>
                )}
                {a.classText && (
                  <div className={styles.content}>
                    <h5>授業</h5>
                    <p className={styles.contentText}>{a.classText}</p>
                  </div>
                )}
                {a.institutionText && (
                  <div className={styles.content}>
                    <h5>施設・セキュリティ</h5>
                    <p className={styles.contentText}>{a.institutionText}</p>
                  </div>
                )}
                {a.accessText && (
                  <div className={styles.content}>
                    <h5>アクセス・立地</h5>
                    <p className={styles.contentText}>{a.accessText}</p>
                  </div>
                )}
                {a.ptaText && (
                  <div className={styles.content}>
                    <h5>保護者関係(PTA)</h5>
                    <p className={styles.contentText}>{a.ptaText}</p>
                  </div>
                )}
                {a.eventText && (
                  <div className={styles.content}>
                    <h5>イベント</h5>
                    <p className={styles.contentText}>{a.eventText}</p>
                  </div>
                )}
                {(a.howGoText ||
                  a.uniformPresent ||
                  a.lunchPresent ||
                  a.lunchText ||
                  a.costText) && <h4>小学校について</h4>}
                {a.howGoText && (
                  <div className={styles.content}>
                    <h5>登下校方法</h5>
                    <p className={styles.contentText}>{a.howGoText}</p>
                  </div>
                )}
                {a.uniformPresent && (
                  <div className={styles.content}>
                    <h5>制服の有無</h5>
                    <p className={styles.contentText}>
                      {buildTextFromBoolean(a.uniformPresent)}
                    </p>
                  </div>
                )}
                {a.lunchPresent && (
                  <div className={styles.content}>
                    <h5>給食の有無</h5>
                    <p className={styles.contentText}>
                      {buildTextFromBoolean(a.lunchPresent)}
                    </p>
                  </div>
                )}
                {a.lunchText && (
                  <div className={styles.content}>
                    <h5>給食の詳細</h5>
                    <p className={styles.contentText}>{a.lunchText}</p>
                  </div>
                )}
                {a.costText && (
                  <div className={styles.content}>
                    <h5>費用</h5>
                    <p className={styles.contentText}>{a.costText}</p>
                  </div>
                )}
                {(a.proceedReasonText || a.motivationText || a.proceedText) && (
                  <h4>入学について</h4>
                )}
                {a.motivationText && (
                  <div className={styles.content}>
                    <h5>志望動機</h5>
                    <p className={styles.contentText}>{a.motivationText}</p>
                  </div>
                )}
                {a.proceedText && (
                  <div className={styles.content}>
                    <h5>進学先</h5>
                    <p className={styles.contentText}>{a.proceedText}</p>
                  </div>
                )}
                {a.proceedReasonText && (
                  <div className={styles.content}>
                    <h5>進学先を選んだ理由</h5>
                    <p className={styles.contentText}>{a.proceedReasonText}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {!isVisibleList[i] && (
          <div className={styles.btn}>
            <button onClick={() => updateIsVisibleList(i)}>
              さらに詳しく見る
            </button>
          </div>
        )}
      </blockquote>
    );
  });
  return (
    <section>
      <h2>
        <BoxHeading>{title}</BoxHeading>
      </h2>
      <div className={styles.body}>
        <p className={styles.info}>
          {data.name}は{data.name}の学区内に位置しています。
          {data.name}
          に実際に通っている人の評価・口コミを掲載しています。
        </p>
        {items}
        <blockquote className={styles.quote}>
          本件の口コミおよびスコアは
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://www.minkou.jp/primary/school/${data.schoolId}/`}
          >
            みんなの小学校情報
          </a>
          が情報提供しています。イエウールは当コンテンツの内容に関与しておりませんので、口コミおよびスコアに関するお問い合わせは、みんなの小学校情報までお願いします。
          <br />
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.minkou.jp/inquiry/"
          >
            みんなの小学校情報(運営：株式会社イトクロ)へのお問い合わせ
          </a>
        </blockquote>
      </div>
    </section>
  );
};

export default SchoolReviews;
