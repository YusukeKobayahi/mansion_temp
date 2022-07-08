import styles from "./index.module.scss";
import { ReactNode } from "react";

import BasicBlock from "~/components/molecules/Search/BasicBlock";

type SelectBlockProps = {
  labelText: string;
  children: ReactNode;
  unitText: string;
  sectionBar?: boolean;
};

const SelectBlock: React.FC<SelectBlockProps> = ({
  labelText,
  children,
  unitText,
  sectionBar = true,
}: SelectBlockProps) => {
  return (
    <BasicBlock sectionBar={sectionBar}>
      <div className={styles.content}>
        <p className={styles.label}>{labelText}</p>
        <div>{children}</div>
        <p className={styles.unit}>{unitText}</p>
      </div>
    </BasicBlock>
  );
};

export default SelectBlock;
