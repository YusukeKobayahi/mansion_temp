import Link from "next/link";
import styles from "~/components/commons/Breadcrumb/index.module.scss";

export type BreadcrumbItemProps = {
  name: string;
  path: string;
  asLink?: string;
};

type BreadcrumbProps = {
  breadcrumbs: BreadcrumbItemProps[];
  mainClassName?: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbs,
  mainClassName = "",
}: BreadcrumbProps) => {
  const items = breadcrumbs.map((b, i) => {
    if (b.name !== "" && b.path !== "") {
      return (
        <li key={i} className={styles.item}>
          {breadcrumbs.length - 1 === i ? (
            <span>{b.name}</span>
          ) : (
            <Link
              href={b.path}
              as={b.asLink ? b.asLink : b.path}
              prefetch={false}
            >
              <a>{b.name}</a>
            </Link>
          )}
        </li>
      );
    }
  });

  return (
    <nav className={mainClassName}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <a href="/">イエウールトップ</a>
        </li>
        {items}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
