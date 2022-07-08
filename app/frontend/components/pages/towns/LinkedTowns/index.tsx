import { MsLibraryTownsLinkedTownsFragment } from "~/graphql/generated";

import styles from "~/components/pages/towns/IndexedTowns/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";

export interface LinkedTownsProps {
  data: MsLibraryTownsLinkedTownsFragment;
}

const LinkedTowns: React.FC<LinkedTownsProps> = ({
  data,
}: LinkedTownsProps) => {
  if (!data.linkedTowns || data.linkedTowns.length === 0) return null;

  const items = data.linkedTowns.map((town) => {
    return (
      <LinkBlock
        key={town.id}
        name={town.name}
        id={town.id}
        link="towns"
        mansionCount={town.mansionCount}
        eventParams={{
          action: "msl_area_click",
          category: "msl_ichiran",
          label: "msl_linked_towns",
          value: 1,
        }}
      />
    );
  });

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {data.city.prefecture.name}
          {data.city.name}
          {data.name}
          の近隣のエリアから中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  );
};

export default LinkedTowns;
