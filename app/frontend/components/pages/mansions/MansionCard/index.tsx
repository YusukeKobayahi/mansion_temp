import Link from "next/link";
import { event } from "~/lib/gtag";
import { LayoutSummary } from "~/lib/mansions/SalesSummaryBuilder";
import compact from "lodash/compact";
import styles from "./index.module.scss";
import { GoogleAnalyticsEvent } from "~/lib/types";

export interface MansionCardProps {
  href?: string;
  name?: string;
  address?: string;
  salesInfo?: LayoutSummary[];
  constructedDate?: string;
  access?: string;
  eventParams?: GoogleAnalyticsEvent;
}

const MansionCard: React.FC<MansionCardProps> = ({
  href,
  name,
  constructedDate,
  salesInfo,
  address,
  access,
  eventParams,
}: MansionCardProps) => {
  const clickLink = () => {
    if (eventParams) event(eventParams);
  };
  return (
    <div className={styles.container}>
      <Link href={"/mansions/[uniqueCode]"} as={href} prefetch={false} passHref>
        <button className={styles.link} onClick={clickLink}>
          <h3 className={styles.name}>
            {name}
            <br />
            <span className={styles.date}>{constructedDate}</span>
          </h3>
          <div className={styles.salesInfoArea}>
            <p>販売価格</p>
            <ul>
              {salesInfo
                ? salesInfo.map((info, i) => (
                    <li key={i} className={styles.salesInfo}>
                      {compact([info.layout, info.info]).join(" ")}
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <p className={styles.subInfo}>
            <span>{address}</span>
            <br />
            {access ? <span>{access}</span> : null}
          </p>
        </button>
      </Link>
    </div>
  );
};

export default MansionCard;
