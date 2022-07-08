import { MsLibraryTownsInfoWritingFragment } from "~/graphql/generated";
import styles from "~/components/pages/cities/Info/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import FaqJsonLd from "~/components/commons/JsonLd/Faq";

export interface TownInfoWritingProps {
  data: MsLibraryTownsInfoWritingFragment;
}

const TownInfoWriting: React.FC<TownInfoWritingProps> = ({
  data,
}: TownInfoWritingProps) => {
  const town = data;
  const areaName = town.city.prefecture.name + town.city.name + town.name;

  const faqJsonLdData = [
    {
      key: `${areaName}の紹介`,
      value: String(town.writing?.introduce),
    },
    {
      key: `${areaName}のマンション探しのコツ`,
      value: String(town.writing?.tips),
    },
    {
      key: `${areaName}のおすすめエリア`,
      value: String(town.writing?.recommendArea),
    },
    {
      key: `${areaName}の交通事情`,
      value: String(town.writing?.traffic),
    },
    {
      key: `${areaName}のおすすめスポット`,
      value: String(town.writing?.recommendSpot),
    },
  ];
  return (
    <section className={styles.container}>
      <FaqJsonLd data={faqJsonLdData} />
      <h2>
        <BoxHeading>{areaName}周辺に関する情報</BoxHeading>
      </h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            {town.writing?.introduce && (
              <tr>
                <th>
                  <h3>{areaName}の紹介</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{ __html: town.writing?.introduce }}
                ></td>
              </tr>
            )}
            {town.writing?.tips && (
              <tr>
                <th>
                  <h3>{areaName}のマンション探しのコツ</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{ __html: town.writing?.tips }}
                ></td>
              </tr>
            )}
            {town.writing?.recommendArea && (
              <tr>
                <th>
                  <h3>{areaName}のおすすめエリア</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: town.writing?.recommendArea,
                  }}
                ></td>
              </tr>
            )}
            {town.writing?.traffic && (
              <tr>
                <th>
                  <h3>{areaName}の交通事情</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{ __html: town.writing?.traffic }}
                ></td>
              </tr>
            )}
            {town.writing?.recommendSpot && (
              <tr>
                <th>
                  <h3>{areaName}のおすすめスポット</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: town.writing?.recommendSpot,
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
