import Link from "next/link";
import styles from "./index.module.scss";
import { buildLibraryPagePath } from "~/lib/utils";

export interface BackLinkProps {
  jisCode: string;
}
//使用されていないので削除予定
const BackLink: React.FC<BackLinkProps> = ({ jisCode }: BackLinkProps) => (
  <section className={styles.container}>
    <Link href={buildLibraryPagePath("cities", jisCode)} prefetch={false}>
      <a className={styles.btn}>一覧に戻る</a>
    </Link>
  </section>
);

export default BackLink;
