import { ReactNode } from "react";
import styles from "./index.module.scss";

type SidelineHeadingProps = {
  children: ReactNode;
};

const SidelineHeading: React.FC<SidelineHeadingProps> = ({ children }) => {
  return (
    <div className={styles.heading}>
      <span className={styles.inner}>{children}</span>
    </div>
  );
};

export default SidelineHeading;
