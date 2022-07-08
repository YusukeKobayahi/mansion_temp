import Link from "next/link";
import Image from "next/image";
import { MsLibraryIndexPrefectureFragment } from "~/graphql/generated";
import { buildLibraryPagePath } from "~/lib/utils";
import compact from "lodash/compact";
import { event } from "~/lib/gtag";

import styles from "./index.module.scss";

export interface PrefecturesProps {
  data: MsLibraryIndexPrefectureFragment[];
}

const Prefectures: React.FC<PrefecturesProps> = ({
  data,
}: PrefecturesProps) => {
  const sortedIds = ["13", "14", "11", "12", "27", "28", "23", "40"];

  const sortedPrefectures: MsLibraryIndexPrefectureFragment[] = compact(
    sortedIds.map((id) => data.find((pref) => pref.id === id))
  );

  const imgClassMapping: Record<string, string> = {
    "11": "saitama",
    "12": "chiba",
    "13": "tokyo",
    "14": "kanagawa",
    "23": "aichi",
    "27": "osaka",
    "28": "hyogo",
    "40": "fukuoka",
  };

  const clickPref = () => {
    event({
      action: "msl_area_click",
      category: "msl_top",
      label: "msl_pref",
      value: 1,
    });
  };

  return (
    <section className={styles.container} id="prefectures">
      <h2 className={styles.title}>エリアから探す</h2>
      <ul className={styles.list}>
        {sortedPrefectures.map((pref) => {
          const imgSrc = `/ms-library/images/thum_${
            imgClassMapping[pref.id]
          }.jpg`;
          return (
            <li key={pref.id} className={styles.item}>
              <div className={styles.image}>
                <Image
                  src={imgSrc}
                  alt={pref.name}
                  width={235}
                  height={259}
                  loading={"eager"}
                />
              </div>
              <Link
                href={"/prefectures/[jisCode]"}
                as={buildLibraryPagePath("prefectures", pref.jisCode)}
                prefetch={false}
                passHref
              >
                <button className={styles.link} onClick={clickPref}>
                  {pref.name}
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Prefectures;
