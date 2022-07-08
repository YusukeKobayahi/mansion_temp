import { LineWritingFragment } from "~/graphql/generated";
import styles from "~/components/pages/cities/Info/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import FaqJsonLd from "~/components/commons/JsonLd/Faq";

type WritingProps = LineWritingFragment;

const TownInfoWriting: React.FC<WritingProps> = ({
  name,
  writing,
}: WritingProps) => {
  if (!writing) return null;
  const { introduce, recommendArea, recommendSpot, traffic, tips } = writing;

  const faqJsonLdData = [
    {
      key: `${name}の紹介`,
      value: String(introduce),
    },
    {
      key: `${name}のマンション探しのコツ`,
      value: String(tips),
    },
    {
      key: `${name}のおすすめ駅`,
      value: String(recommendArea),
    },
    {
      key: `${name}の交通事情`,
      value: String(traffic),
    },
    {
      key: `${name}のおすすめスポット`,
      value: String(recommendSpot),
    },
  ];
  return (
    <section className={styles.container}>
      <FaqJsonLd data={faqJsonLdData} />
      <h2>
        <BoxHeading>{name}周辺に関する情報</BoxHeading>
      </h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            {introduce && (
              <tr>
                <th>
                  <h3>{name}の紹介</h3>
                </th>
                <td dangerouslySetInnerHTML={{ __html: introduce }}></td>
              </tr>
            )}
            {tips && (
              <tr>
                <th>
                  <h3>{name}のマンション探しのコツ</h3>
                </th>
                <td dangerouslySetInnerHTML={{ __html: tips }}></td>
              </tr>
            )}
            {recommendArea && (
              <tr>
                <th>
                  <h3>{name}のおすすめ駅</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: recommendArea,
                  }}
                ></td>
              </tr>
            )}
            {traffic && (
              <tr>
                <th>
                  <h3>{name}の交通事情</h3>
                </th>
                <td dangerouslySetInnerHTML={{ __html: traffic }}></td>
              </tr>
            )}
            {recommendSpot && (
              <tr>
                <th>
                  <h3>{name}のおすすめスポット</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: recommendSpot,
                  }}
                ></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TownInfoWriting;
