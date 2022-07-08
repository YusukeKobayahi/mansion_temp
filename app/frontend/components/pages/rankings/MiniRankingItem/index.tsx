import { MsLibraryMiniRankingMansionsFragment } from "~/graphql/generated";
import styles from "./index.module.scss";
import { buildLibraryPagePath } from "~/lib/utils";
import Link from "next/link";

type MiniRankingItemProps = MsLibraryMiniRankingMansionsFragment & {
  rank: number;
};
const MiniRankingItem: React.FC<MiniRankingItemProps> = ({
  uniqueCode,
  name,
  pageView,
  rank,
}: MiniRankingItemProps) => {
  return (
    <>
      <div className={styles.container}>
        <Link
          href={"/mansions/[uniqueCode]"}
          as={buildLibraryPagePath("mansions", uniqueCode)}
          prefetch={false}
          passHref
        >
          <button className={styles.card}>
            <h3>
              {rank}位 {name}
            </h3>
            <ul>
              <li>物件名: {name}</li>
              <li>閲覧回数: {pageView}回</li>
            </ul>
          </button>
        </Link>
      </div>
    </>
  );
};

export default MiniRankingItem;
