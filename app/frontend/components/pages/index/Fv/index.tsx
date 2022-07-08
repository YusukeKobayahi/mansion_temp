import styles from "./index.module.scss";
import Prefectures from "~/components/pages/index/Fv/Prefectures";
import Railways from "~/components/pages/index/Railways";
import FreeWord from "~/components/pages/index/FreeWord";

import Breadcrumb, {
  BreadcrumbItemProps,
} from "~/components/commons/Breadcrumb";
import { ComponentProps } from "react";

export type FvProps = ComponentProps<typeof Railways> &
  ComponentProps<typeof FreeWord> &
  ComponentProps<typeof Prefectures> & {
    breadcrumbs: BreadcrumbItemProps[];
  };

const Fv: React.FC<FvProps> = ({ data, breadcrumbs, setTab }: FvProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <Breadcrumb mainClassName={styles.index} breadcrumbs={breadcrumbs} />
        <p className={styles.label}>
          <span>マンション売却をご検討の方へ</span>
        </p>
        <h1>
          物件情報やノウハウが
          <br />
          手に入る
        </h1>
        <div className={styles.searchBlock}>
          <Prefectures data={data} />
          <Railways setTab={setTab} />
          <FreeWord />
        </div>
      </div>
    </section>
  );
};

export default Fv;
