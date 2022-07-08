import Link from "next/link";
import { MsLibraryTownsLinkedSearchConditionsFragment } from "~/graphql/generated";
import styles from "./index.module.scss";
import { event } from "~/lib/gtag";

export interface LinkedSearchConditionsProps {
  pathname: string;
  data: MsLibraryTownsLinkedSearchConditionsFragment;
}

const LinkedSearchConditions: React.FC<LinkedSearchConditionsProps> = ({
  pathname,
  data,
}: LinkedSearchConditionsProps) => {
  if (!data.linkedSearchConditions || data.linkedSearchConditions.length === 0)
    return null;

  const clickCondition = () => {
    event({
      action: "msl_area_click",
      category: "msl_ichiran",
      label: "msl_towns_searchcondition",
      value: 1,
    });
  };

  const items = data.linkedSearchConditions.map((condition, i) => {
    const href = `${pathname}?${condition.key}=${condition.value}`;
    return (
      <Link key={i} href={href} prefetch={false} passHref>
        <button className={styles.btn} onClick={clickCondition}>
          {condition.name}
        </button>
      </Link>
    );
  });

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className={styles.title}>おすすめの検索条件</p>
      </div>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default LinkedSearchConditions;
