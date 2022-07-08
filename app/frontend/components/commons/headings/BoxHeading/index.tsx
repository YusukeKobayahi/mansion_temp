import { ReactNode } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

type BoxHeadingProps = {
  children: ReactNode;
  className?: string;
};

const BoxHeading: React.FC<BoxHeadingProps> = ({ children, className }) => {
  return (
    <div className={classnames(styles.heading, className)}>{children}</div>
  );
};

export default BoxHeading;
