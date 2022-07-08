import { MsLibraryCitiesCityInfoWritingFragment } from "~/graphql/generated";
import styles from "~/components/pages/cities/Info/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import FaqJsonLd from "~/components/commons/JsonLd/Faq";

export interface CityInfoWritingProps {
  data: MsLibraryCitiesCityInfoWritingFragment;
}

const CityInfoWriting: React.FC<CityInfoWritingProps> = ({
  data,
}: CityInfoWritingProps) => {
  const areaName = data.prefecture.name + data.name;

  const faqJsonLdData = [
    {
      key: `${areaName}の紹介`,
      value: String(data.writing?.introduce),
    },
    {
      key: `${areaName}のマンション探しのコツ`,
      value: String(data.writing?.tips),
    },
    {
      key: `${areaName}のおすすめエリア`,
      value: String(data.writing?.recommendArea),
    },
    {
      key: `${areaName}の交通事情`,
      value: String(data.writing?.traffic),
    },
    {
      key: `${areaName}のおすすめスポット`,
      value: String(data.writing?.recommendSpot),
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
            {data.writing?.introduce && (
              <tr>
                <th>
                  <h3>{areaName}の紹介</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{ __html: data.writing?.introduce }}
                ></td>
              </tr>
            )}
            {data.writing?.tips && (
              <tr>
                <th>
                  <h3>{areaName}のマンション探しのコツ</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{ __html: data.writing?.tips }}
                ></td>
              </tr>
            )}
            {data.writing?.recommendArea && (
              <tr>
                <th>
                  <h3>{areaName}のおすすめエリア</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: data.writing?.recommendArea,
                  }}
                ></td>
              </tr>
            )}
            {data.writing?.traffic && (
              <tr>
                <th>
                  <h3>{areaName}の交通事情</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{ __html: data.writing?.traffic }}
                ></td>
              </tr>
            )}
            {data.writing?.recommendSpot && (
              <tr>
                <th>
                  <h3>{areaName}のおすすめスポット</h3>
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: data.writing?.recommendSpot,
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

export default CityInfoWriting;
