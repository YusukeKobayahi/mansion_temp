import { useMemo } from "react";
import { MsLibraryCitiesCityInfoAutoFragment } from "~/graphql/generated";
import styles from "~/components/pages/cities/Info/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import FaqJsonLd from "~/components/commons/JsonLd/Faq";
import { populationFormat, yenFormat, createDayThisMonth } from "~/lib/utils";
import find from "lodash/find";

export interface CityInfoAutoProps {
  data: MsLibraryCitiesCityInfoAutoFragment;
  citiesLength: number;
}

const CityInfoAuto: React.FC<CityInfoAutoProps> = ({
  data,
  citiesLength,
}: CityInfoAutoProps) => {
  const areaName = data.prefecture.name + data.name;
  const info = data.info;
  const citySalePricePerTsubo = data.pricePredictions.salePricePerTsubo;
  const prefectureSalePricePerTsubo =
    data.prefecture.pricePredictions.salePricePerTsubo;
  const TotalaverageIncome = 4360000;

  const populationInfo = useMemo(() => {
    const population = populationFormat(
      Number(info.population?.basic?.population)
    );
    return `${areaName}の人口は${population}です。`;
  }, [areaName, info.population?.basic?.population]);

  const incomeInfo = useMemo(() => {
    const buildTextAndPriceByDifference = (n: number) => {
      if (n > TotalaverageIncome)
        return ["上回って", yenFormat(n - TotalaverageIncome)];
      else return ["下回って", yenFormat(TotalaverageIncome - n)];
    };
    const [differenceText, differencePrice] = buildTextAndPriceByDifference(
      Number(info.income?.averageIncome)
    );
    return `${areaName}の平均年収は${yenFormat(
      Number(info.income?.averageIncome)
    )}で、${data.prefecture.name}内で${
      info.income?.prefectureRank
    }位/${citiesLength}エリア中となっています。全国平均と比べると、${differencePrice}${differenceText}います。`;
  }, [
    areaName,
    data.prefecture.name,
    TotalaverageIncome,
    info.income?.averageIncome,
    info.income?.prefectureRank,
    citiesLength,
  ]);

  const realEstateInfo = useMemo(() => {
    const dayThisMonth = createDayThisMonth();
    const thisMonthCitySalePricePerTsubo = Math.floor(
      Number(find(citySalePricePerTsubo, ["date", dayThisMonth])?.city)
    );
    const thisMonthPrefectureSalePricePerTsubo = Math.floor(
      Number(
        find(prefectureSalePricePerTsubo, ["date", dayThisMonth])?.prefecture
      )
    );
    const buildTextAndPriceByDifference = () => {
      if (thisMonthCitySalePricePerTsubo > thisMonthPrefectureSalePricePerTsubo)
        return [
          "高く",
          yenFormat(
            thisMonthCitySalePricePerTsubo -
              thisMonthPrefectureSalePricePerTsubo
          ),
        ];
      else
        return [
          "低く",
          yenFormat(
            thisMonthPrefectureSalePricePerTsubo -
              thisMonthCitySalePricePerTsubo
          ),
        ];
    };
    const [differenceText, differencePrice] = buildTextAndPriceByDifference();
    return `${areaName}の平均坪単価は ${yenFormat(
      thisMonthCitySalePricePerTsubo
    )}です。${
      data.prefecture.name
    }と比べると、${differencePrice}${differenceText}なっています。`;
  }, [
    areaName,
    data.prefecture.name,
    citySalePricePerTsubo,
    prefectureSalePricePerTsubo,
  ]);

  const crimeInfo = useMemo(() => {
    const buildTextByDeviation = (s: number) => {
      if (s >= 65) return "非常に治安のいい";
      else if (s <= 55 || 64 < s) return "治安のいい";
      else if (s <= 45 || 54 < s) return "治安に少し不安のある";
      else return "治安に不安のある";
    };
    return `${areaName}の1年間の犯罪件数は${info.crime?.crimes}件で、${
      data.prefecture.name
    }内で${
      info.crime?.prefectureRank
    }位/${citiesLength}エリア中と${buildTextByDeviation(
      Number(info.crime?.deviation)
    )}エリアになります。`;
  }, [
    areaName,
    info.crime?.crimes,
    info.crime?.prefectureRank,
    citiesLength,
    data.prefecture.name,
    info.crime?.deviation,
  ]);

  const childInfo = useMemo(() => {
    const buildTextByDeviation = (s: number) => {
      if (s >= 65) return "非常に多くあり安心です";
      else if (s <= 55 || 64 < s) return "探すのには苦労しないでしょう";
      else if (s <= 45 || 54 < s) return "少し探すのに苦労する可能性があります";
      else return "探すのに苦労する可能性があります";
    };
    return `${areaName}の幼稚園の数は${
      info.school?.kindergarten?.kindergartens
    }校で、${data.prefecture.name}内で${
      info.school?.kindergarten?.prefectureRank
    }位/${citiesLength}エリア中と${buildTextByDeviation(
      Number(info.school?.kindergarten?.deviation)
    )}。`;
  }, [
    areaName,
    info.school?.kindergarten?.kindergartens,
    info.school?.kindergarten?.prefectureRank,
    citiesLength,
    data.prefecture.name,
    info.school?.kindergarten?.deviation,
  ]);

  const faqJsonLdData = [
    {
      key: `${areaName}の基本情報`,
      value: populationInfo + incomeInfo,
    },
    {
      key: `${areaName}の不動産事情`,
      value: realEstateInfo,
    },
    {
      key: `${areaName}は生活事情`,
      value: crimeInfo,
    },
    {
      key: `${areaName}の子育て事情`,
      value: childInfo,
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
            {info.population && info.income && (
              <tr>
                <th>
                  <h3>{areaName}の基本情報</h3>
                </th>
                <td>
                  <p>
                    {populationInfo}
                    <br />
                    {incomeInfo}
                  </p>
                </td>
              </tr>
            )}
            {[citySalePricePerTsubo, prefectureSalePricePerTsubo].every(
              (el) => el && el.length !== 0
            ) && (
              <tr>
                <th>
                  <h3>{areaName}の不動産事情</h3>
                </th>
                <td>
                  <p>{realEstateInfo}</p>
                </td>
              </tr>
            )}
            {info.crime && (
              <tr>
                <th>
                  <h3>{areaName}は生活事情</h3>
                </th>
                <td>
                  <p>{crimeInfo}</p>
                </td>
              </tr>
            )}
            {info.school?.kindergarten && (
              <tr>
                <th>
                  <h3>{areaName}の子育て事情</h3>
                </th>
                <td>
                  <p>{childInfo}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CityInfoAuto;
