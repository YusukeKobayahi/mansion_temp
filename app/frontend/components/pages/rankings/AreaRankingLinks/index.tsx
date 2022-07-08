import { AreaRankingLinksDataFragment } from "~/graphql/generated";
import Link from "next/link";
import styles from "./index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";

type AreaRankingLinksProps = {
  prefectures: {
    jisCode: string;
    name: string;
  }[];
  prefecture?: AreaRankingLinksDataFragment;
};
const AreaRankingLinks: React.FC<AreaRankingLinksProps> = ({
  prefectures,
  prefecture,
}: AreaRankingLinksProps) => {
  const currentJisCode = prefecture?.jisCode;
  return (
    <>
      <BoxHeading className={styles.heading}>他のランキングを見る</BoxHeading>
      <div className={styles.content}>
        <div>
          {prefectures.map(({ name, jisCode }, i) => (
            <div key={i}>
              <Link
                href={"/rankings/prefectures/[id]"}
                as={`/rankings/prefectures/${jisCode}`}
                prefetch={false}
              >
                <button className={styles.link}>{name}</button>
              </Link>
              {jisCode === currentJisCode && (
                <>
                  {prefecture?.cities.map(({ name, jisCode }, i) => (
                    <div key={i} className={"p_l_20px"}>
                      <Link
                        href={"/rankings/cities/[id]"}
                        as={`/rankings/cities/${jisCode}`}
                        prefetch={false}
                      >
                        <button className={styles.link}>{name}</button>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AreaRankingLinks;
