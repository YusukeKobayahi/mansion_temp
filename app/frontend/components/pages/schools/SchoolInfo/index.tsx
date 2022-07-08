import styles from "~/components/pages/cities/Info/index.module.scss";
import { SchoolInfoDataFragment } from "~/graphql/generated";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import { yenFormat } from "~/lib/utils";

type SchoolInfoProps = SchoolInfoDataFragment & {
  className?: string;
};

const SchoolInfo: React.FC<SchoolInfoProps> = ({
  name,
  averagePrice,
  city,
  prefecture,
  className = "",
}: SchoolInfoProps) => {
  if (!city) return null;

  /**
   * 学区の不動産事情
   */
  const safeGetAverageSquarePrice = (obj: Array<any>) => {
    return obj && obj.length > 0 ? obj[0]["averageSquarePrice"] : null;
  };
  const schoolAverageSquarePrice = safeGetAverageSquarePrice(averagePrice.base);
  const schoolLayoutAverageSquarePrice = safeGetAverageSquarePrice(
    averagePrice.layout
  );
  const cityAverageSquarePrice = safeGetAverageSquarePrice(
    city.averagePrice.base
  );
  const cityLayoutAverageSquarePrice = safeGetAverageSquarePrice(
    city.averagePrice.layout
  );
  const prefectureAverageSquarePrice = safeGetAverageSquarePrice(
    prefecture.averagePrice.base
  );
  const prefectureLayoutAverageSquarePrice = safeGetAverageSquarePrice(
    prefecture.averagePrice.layout
  );

  const schoolFullLayoutName =
    averagePrice.layout && averagePrice.layout.length
      ? averagePrice.layout[0].fullLayoutName
      : null;

  const priceDiffFormat = (num1: number, num2: number) => {
    const diff = num1 - num2;
    const highOrLow = Math.abs(diff) === diff ? "高く" : "低く";
    return `${yenFormat(diff)}${highOrLow}なっています。`;
  };

  /**
   * どんな街
   */
  const { crime, park } = city.info;

  return (
    <div className={className}>
      <BoxHeading>{name}区について</BoxHeading>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            {/* <tr>
              <th>
                <h3>{name}とは</h3>
              </th>
              <td>
                <p>{"小学校名"}は{"エリア名"}にある小学校です。創立は{"創立年"}年で、今年で創立{"記入年-創立年"}年になります。</p>
                <p>全校生徒数は{"全校生徒数"}で、{"市区名"}内で{"○"}位/{"○"}校中となっています。（{"データ取得年"}年時点）</p>
                <p>1学年は{"全校生徒数/6"}人前後で、{"市区名"}平均より{"多く"}なっています。</p>
              </td>
            </tr> */}
            {(schoolAverageSquarePrice ||
              cityAverageSquarePrice ||
              prefectureAverageSquarePrice ||
              cityLayoutAverageSquarePrice ||
              schoolLayoutAverageSquarePrice ||
              prefectureLayoutAverageSquarePrice ||
              schoolFullLayoutName) && (
              <tr>
                <th>
                  <h3>{name}区の不動産事情は？</h3>
                </th>
                <td>
                  <p>
                    {name}区の平均坪単価は{yenFormat(schoolAverageSquarePrice)}
                    で、
                    {city.name}平均より
                    {priceDiffFormat(
                      cityAverageSquarePrice,
                      schoolAverageSquarePrice
                    )}
                    {prefecture.name}平均と比べると、
                    {priceDiffFormat(
                      prefectureAverageSquarePrice,
                      schoolAverageSquarePrice
                    )}
                  </p>
                  <p>
                    また、{schoolFullLayoutName}
                    の中古マンションの平均価格は
                    {yenFormat(schoolLayoutAverageSquarePrice)}で、
                    {priceDiffFormat(
                      cityLayoutAverageSquarePrice,
                      schoolLayoutAverageSquarePrice
                    )}
                    {prefecture.name}平均と比べると、
                    {priceDiffFormat(
                      prefectureLayoutAverageSquarePrice,
                      schoolLayoutAverageSquarePrice
                    )}
                  </p>
                </td>
              </tr>
            )}
            {/* <tr>
              <th>
                <h3>{city.name}の中学受験事情は？</h3>
              </th>
              <td>
                <p>{name}のある{city.name}の中学受験率は{"中学受験率"}%となっており、</p>
                <p>{prefecture.name}平均に比べ{"高く"}、中学受験熱の{"高い"}エリアとなっています。</p>
              </td>
            </tr> */}
            {(crime || park) && (
              <tr>
                <th>
                  <h3>{city.name}はどんな街？</h3>
                </th>
                <td>
                  {crime && (
                    <p>
                      {name}のある{city.name}の1年間の犯罪件数は{crime.crimes}
                      回で、
                      {prefecture.name}内で{crime.areaRank}位
                      {crime.area && crime.grade && (
                        <>
                          /{crime.area.citiesCount}エリア中と犯罪数が
                          {crime.grade.typeName}エリア
                        </>
                      )}
                      となっています。
                    </p>
                  )}
                  {park && park.area && park.grade && (
                    <p>
                      {name}のある{city.name}の公園数は{park.parks}園で、
                      {prefecture.name}内で{park.areaRank}位
                      {park.area && park.grade && (
                        <>
                          /{park.area.citiesCount}エリア中と公園数の
                          {park.grade.typeName}エリア
                        </>
                      )}
                      となっています。
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolInfo;
