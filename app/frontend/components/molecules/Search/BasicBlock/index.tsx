import styles from "./index.module.scss";
import { ReactNode } from "react";
import classnames from "classnames";

type BasicBlockProps = {
  children: ReactNode;
  sectionBar?: boolean;
  displayFlex?: boolean;
  className?: string;
};

const BasicBlock: React.FC<BasicBlockProps> = ({
  children,
  sectionBar = true,
  displayFlex = false,
  className = "",
}: BasicBlockProps) => {
  const classes = classnames(
    {
      [styles.block]: true,
      [styles.sectionBar]: sectionBar,
      [styles.flex]: displayFlex,
    },
    className
  );
  return <div className={classes}>{children}</div>;
};

export default BasicBlock;
