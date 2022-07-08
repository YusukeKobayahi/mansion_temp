import styles from "~/components/commons/CityInfo/index.module.scss";
import { MsLibraryCitiesCityInfoFragment } from "~/graphql/generated";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import SidelineHeading from "~/components/commons/headings/SidelineHeading";
import { yenFormat } from "~/lib/utils";
import { useState } from "react";
import classnames from "classnames";

export interface CityInfoProps {
  data: MsLibraryCitiesCityInfoFragment;
  className?: string;
}

const CityInfo: React.FC<CityInfoProps> = ({
  data,
  className,
}: CityInfoProps) => {
  const [viewState, setviewState] = useState(false);
  const info = data.info;
  if (
    !info.income &&
    !info.age &&
    !info.household &&
    !info.population &&
    !info.crime &&
    !info.medical &&
    !info.care &&
    !info.birthrate &&
    !info.park &&
    !info.school &&
    !info.waitingChild
  )
    return null;
  const checkUndefined = (n: number | string): number | string => {
    return n === 0 ? 0 : n ? n : "-";
  };

  const { name, prefecture } = data;
  return (
    <section className={classnames(styles.container, className)} id="local">
      <h2>
        <BoxHeading>
          数字で見る
          {prefecture?.name}
          {name}
        </BoxHeading>
      </h2>
      <div className={styles.inner}>
        <h3>
          <SidelineHeading>基本情報</SidelineHeading>
        </h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>実数値</th>
              <th>偏差値</th>
              <th>
                順位
                <br className={"spOnly"} />
                <span>({info.crime?.area?.name}内)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {info.income && (
              <tr>
                <td>平均年収</td>
                <td>
                  {checkUndefined(
                    yenFormat(Number(info.income?.averageIncome))
                  )}
                </td>
                <td>{checkUndefined(Number(info.income?.deviation))}</td>
                <td>{checkUndefined(Number(info.income?.areaRank))}位</td>
              </tr>
            )}
            {info.age && (
              <tr>
                <td>平均年齢</td>
                <td>{checkUndefined(Number(info.age?.averageAge))}歳</td>
                <td>{checkUndefined(Number(info.age?.deviation))}</td>
                <td>{checkUndefined(Number(info.age?.areaRank))}位</td>
              </tr>
            )}
            {info.birthrate && (
              <tr>
                <td>特殊出生率</td>
                <td>{checkUndefined(Number(info.birthrate?.birthrate))}％</td>
                <td>{checkUndefined(Number(info.birthrate?.deviation))}</td>
                <td>{checkUndefined(Number(info.birthrate?.areaRank))}位</td>
              </tr>
            )}
            {info.household && (
              <tr>
                <td>持ち家比率</td>
                <td>
                  {checkUndefined(Number(info.household?.ownedPercentage))}％
                </td>
                <td>{checkUndefined(Number(info.household?.deviation))}</td>
                <td>{checkUndefined(Number(info.household?.areaRank))}位</td>
              </tr>
            )}
            {info.population?.density && (
              <tr>
                <td>人口密度</td>
                <td>
                  {checkUndefined(
                    Number(info.population?.density?.populationDensity)
                  )}
                  <br className={"spOnly"} />
                  人/km2
                </td>
                <td>
                  {checkUndefined(Number(info.population?.density?.deviation))}
                </td>
                <td>
                  {checkUndefined(Number(info.population?.density?.areaRank))}位
                </td>
              </tr>
            )}
            {info.population?.growth && (
              <tr className={!viewState ? styles.none : ""}>
                <td>人口増加率</td>
                <td>
                  {checkUndefined(
                    Number(info.population?.growth?.populationGrowthPercentage)
                  )}
                  ％
                </td>
                <td>
                  {checkUndefined(Number(info.population?.growth?.deviation))}
                </td>
                <td>
                  {checkUndefined(Number(info.population?.growth?.areaRank))}位
                </td>
              </tr>
            )}
            {info.crime && (
              <tr className={!viewState ? styles.none : ""}>
                <td>
                  犯罪率
                  <br className={"spOnly"} />
                  (犯罪件数/人口)
                </td>
                <td>
                  {checkUndefined(Number(info.crime?.crimeRatioPercentage))}%
                </td>
                <td>{checkUndefined(Number(info.crime?.deviation))}</td>
                <td>{checkUndefined(Number(info.crime?.areaRank))}位</td>
              </tr>
            )}
            {info.medical?.hospitalClinic && (
              <tr className={!viewState ? styles.none : ""}>
                <td>病院・診療所数</td>
                <td>
                  {Number(info.medical?.hospitalClinic?.clinics) +
                    Number(info.medical?.hospitalClinic?.hospitals)}
                  件
                </td>
                <td>
                  {checkUndefined(
                    Number(info.medical?.hospitalClinic?.deviation)
                  )}
                </td>
                <td>
                  {checkUndefined(
                    Number(info.medical?.hospitalClinic?.areaRank)
                  )}
                  位
                </td>
              </tr>
            )}
            {info.care && (
              <tr className={!viewState ? styles.none : ""}>
                <td>介護施設数</td>
                <td>{checkUndefined(Number(info.care?.careHomes))}件</td>
                <td>{checkUndefined(Number(info.care?.deviation))}</td>
                <td>{checkUndefined(Number(info.care?.areaRank))}位</td>
              </tr>
            )}
            {info.park && (
              <tr className={!viewState ? styles.none : ""}>
                <td>
                  公園面積
                  <br className={"spOnly"} />
                  (10㎡/1人)
                </td>
                <td>
                  {checkUndefined(Number(info.park?.areaPerPerson))}
                  <br className={"spOnly"} />
                  ㎡/人
                </td>
                <td>{checkUndefined(Number(info.park?.deviation))}</td>
                <td>{checkUndefined(Number(info.park?.areaRank))}位</td>
              </tr>
            )}
            {info.waitingChild && (
              <tr className={!viewState ? styles.none : ""}>
                <td>
                  待機児童数
                  <br className={"spOnly"} />
                  (1,000人あたり)
                </td>
                <td>
                  {checkUndefined(Number(info.waitingChild?.waitingChilds))}人
                </td>
                <td>{checkUndefined(Number(info.waitingChild?.deviation))}</td>
                <td>{checkUndefined(Number(info.waitingChild?.areaRank))}位</td>
              </tr>
            )}
            {info.school?.kindergarten && (
              <tr className={!viewState ? styles.none : ""}>
                <td>幼稚園施設数</td>
                <td>
                  {checkUndefined(
                    Number(info.school?.kindergarten?.kindergartens)
                  )}
                  校
                </td>
                <td>
                  {checkUndefined(Number(info.school?.kindergarten?.deviation))}
                </td>
                <td>
                  {checkUndefined(Number(info.school?.kindergarten?.areaRank))}
                  位
                </td>
              </tr>
            )}
            {info.school?.primary && (
              <tr className={!viewState ? styles.none : ""}>
                <td>小学校施設数</td>
                <td>
                  {checkUndefined(Number(info.school?.primary?.primarySchools))}
                  校
                </td>
                <td>
                  {checkUndefined(Number(info.school?.primary?.deviation))}
                </td>
                <td>
                  {checkUndefined(Number(info.school?.primary?.areaRank))}位
                </td>
              </tr>
            )}
            {info.school?.middle && (
              <tr className={!viewState ? styles.none : ""}>
                <td>中学校施設数</td>
                <td>
                  {checkUndefined(Number(info.school?.middle?.middleSchools))}校
                </td>
                <td>
                  {checkUndefined(Number(info.school?.middle?.deviation))}
                </td>
                <td>
                  {checkUndefined(Number(info.school?.middle?.areaRank))}位
                </td>
              </tr>
            )}
            {info.school?.middleProceed && (
              <tr className={!viewState ? styles.none : ""}>
                <td>国私立中学校進学率</td>
                <td>
                  {checkUndefined(
                    Number(info.school?.middleProceed?.proceedRatioPercentage)
                  )}
                  ％
                </td>
                <td>
                  {checkUndefined(
                    Number(info.school?.middleProceed?.deviation)
                  )}
                </td>
                <td>
                  {checkUndefined(
                    Number(info.school?.middleProceed?.capitalRank)
                  )}
                  位
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!viewState && (
          <button onClick={() => setviewState(true)} className={styles.btn}>
            もっと見る
          </button>
        )}
      </div>
    </section>
  );
};

export default CityInfo;
