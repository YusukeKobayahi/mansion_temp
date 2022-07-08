import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import styles from "./index.module.scss";

type BackLinkProps = {
  name: string;
  page: string;
  id: string;
};

const BackLink: React.FC<BackLinkProps> = ({
  name,
  page,
  id,
}: BackLinkProps) => {
  return (
    <Link href={buildLibraryPagePath(page, id)} passHref>
      <button className={styles.btn}>{name}の中古マンション一覧</button>
    </Link>
  );
};

export default BackLink;
