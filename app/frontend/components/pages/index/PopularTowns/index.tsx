import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import { event } from "~/lib/gtag";
import townList from "./townList.json";

import styles from "./index.module.scss";

export type TownListProps = {
  name: string;
  id: string;
};

const Prefectures: React.FC = () => {
  const filteredTownList: TownListProps[] = townList.towns;

  const clickTown = () => {
    event({
      action: "msl_area_click",
      category: "msl_top",
      label: "msl_town",
      value: 1,
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>人気のエリアから探す</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {filteredTownList.map((town) => {
            return (
              <li key={town.id} className={styles.item}>
                <Link
                  href={buildLibraryPagePath("towns", town.id)}
                  prefetch={false}
                  passHref
                >
                  <button className={styles.link} onClick={clickTown}>
                    {town.name}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Prefectures;
