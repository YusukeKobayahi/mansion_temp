import { ReactNode } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

type SideBarHeadingProps = {
  children: ReactNode;
  className?: string;
};

const SideBarHeading: React.FC<SideBarHeadingProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames(styles.heading, className)}>
      <p className={styles.inner}>{children}</p>
    </div>
  );
};

export default SideBarHeading;
