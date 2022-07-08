import { ReactNode } from "react";
import styles from "./index.module.scss";

type UnderlineHeadingProps = {
  children: ReactNode;
};

const UnderlineHeading: React.FC<UnderlineHeadingProps> = ({ children }) => {
  return (
    <div className={styles.heading}>
      <span>{children}</span>
    </div>
  );
};

export default UnderlineHeading;
