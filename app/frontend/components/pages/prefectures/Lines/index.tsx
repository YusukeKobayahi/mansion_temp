import { MsLibraryPrefecturesLinesFragment } from "~/graphql/generated";
import { sumReducer } from "~/lib/utils";
import styles from "./index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface LinesProps {
  data: MsLibraryPrefecturesLinesFragment;
}

const Lines: React.FC<LinesProps> = ({ data }: LinesProps) => {
  const items = data.companies.map((company, i) => {
    // 鉄道会社の総マンション数を取得
    const companyTotalCount = company.lines
      .map((line) => line.mansionCount)
      .reduce(sumReducer);
    if (companyTotalCount == 0) return null;
    const links = company.lines.map((line) => (
      <LinkBlock
        key={line.id}
        name={line.name}
        id={line.id}
        mansionCount={line.mansionCount}
        link="lines"
        eventParams={{
          action: "msl_cta_click",
          category: "msl_prefectures",
          label: "msl_pop_bottom",
          value: 1,
        }}
        page={"prefectures"}
      />
    ));
    return (
      <div className={styles.company} key={i}>
        <p className={styles.companyName}>{company.name}</p>
        <ul className={styles.list}>{links}</ul>
      </div>
    );
  });

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>沿線を選択する</BoxHeading>
      </h2>
      {items}
    </section>
  );
};

export default Lines;
