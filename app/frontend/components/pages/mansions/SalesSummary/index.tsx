import { useDeepCompareMemo } from "use-deep-compare";
import SalesSummaryBuilder from "~/lib/mansions/SalesSummaryBuilder";
import styles from "./index.module.scss";
import { MsLibraryMansionsSalesSummaryFragment } from "~/graphql/generated";
import SidelineHeading from "~/components/commons/headings/SidelineHeading";

export interface SalesSummaryProps {
  data: MsLibraryMansionsSalesSummaryFragment;
}

const SalesSummary: React.FC<SalesSummaryProps> = ({
  data,
}: SalesSummaryProps) => {
  const builder = useDeepCompareMemo(
    () => new SalesSummaryBuilder(data.salesHistorySummaries),
    [data.salesHistorySummaries]
  );

  const layoutSummaries = useDeepCompareMemo(() => {
    return builder.buildLayoutSummaries();
  }, [data.salesHistorySummaries]);

  return (
    <div className={styles.container}>
      <h3>
        <SidelineHeading>{data.name}の相場価格</SidelineHeading>
      </h3>
      <div className={styles.content}>
        <section className={styles.summaryArea}>
          <h3 className={styles.summaryArea__title}>参考中古価格</h3>
          <ul className={styles.summaryArea__list}>
            {layoutSummaries.map((s, i) => (
              <li className={styles.summaryArea__item} key={i}>
                <span className={styles.summaryArea__emphasisText}>
                  {s.layout}
                </span>
                {` / ${s.info}`}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SalesSummary;
