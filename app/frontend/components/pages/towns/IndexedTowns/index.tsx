import { MsLibraryCitiesIndexedTownsFragment } from "~/graphql/generated";

import styles from "./index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface IndexedTownsProps {
  data: MsLibraryCitiesIndexedTownsFragment;
}

const IndexedTowns: React.FC<IndexedTownsProps> = ({
  data,
}: IndexedTownsProps) => {
  if (!data.indexedTowns || data.indexedTowns.length === 0) return null;

  const items = data.indexedTowns.map((town) => {
    if (town.mansionCount > 0) {
      return (
        <LinkBlock
          key={town.id}
          name={town.name}
          id={town.id}
          mansionCount={town.mansionCount}
          link="towns"
          eventParams={{
            action: "msl_area_click",
            category: "msl_ichiran",
            label: "msl_indexed_towns",
            value: 1,
          }}
        />
      );
    }
  });

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {data.prefecture.name}
          {data.name}の人気のエリアから中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default IndexedTowns;
