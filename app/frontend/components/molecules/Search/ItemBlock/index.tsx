import styles from "./index.module.scss";
import { ComponentProps } from "react";
import BasicBlock from "~/components/molecules/Search/BasicBlock";

type ItemBlockProps = ComponentProps<typeof BasicBlock> & {
  title: string;
  children: React.ReactNode;
};

const ItemBlock: React.FC<ItemBlockProps> = ({
  className,
  children,
  sectionBar = true,
  title,
}: ItemBlockProps) => {
  return (
    <BasicBlock sectionBar={sectionBar} className={className}>
      <div className={styles.label}>
        <p>{title}</p>
      </div>
      <div className={styles.content}>{children}</div>
    </BasicBlock>
  );
};

export default ItemBlock;
