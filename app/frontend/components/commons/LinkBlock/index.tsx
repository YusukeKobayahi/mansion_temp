import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import { event } from "~/lib/gtag";
import { GoogleAnalyticsEvent } from "~/lib/types";

import styles from "./index.module.scss";

export interface LinkBlockProps {
  name: string;
  id: string;
  mansionCount: number;
  link: "cities" | "towns" | "lines" | "stations" | "schools" | "freeword";
  eventParams?: GoogleAnalyticsEvent;
  page?: string;
}

const LinkBlock: React.FC<LinkBlockProps> = ({
  name,
  id,
  mansionCount,
  link,
  eventParams,
  page,
}: LinkBlockProps) => {
  const clickLink = () => {
    if (eventParams) event(eventParams);
  };
  const clickFromPrefectures = () => {
    if (page === "prefectures") {
      sessionStorage.setItem("from", "prefectures");
    }
  };
  const href = buildLibraryPagePath(link, id);

  return (
    <>
      {mansionCount !== 0 && (
        <li key={id} className={styles.item}>
          <Link href={href} prefetch={false} passHref>
            <button
              className={styles.link}
              onClick={() => {
                clickLink();
                clickFromPrefectures();
              }}
            >
              {name}
              <span className={styles.count}>{`(${mansionCount}件)`}</span>
            </button>
          </Link>
        </li>
      )}
    </>
  );
};

export default LinkBlock;
