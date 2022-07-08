import styles from "./index.module.scss";
import BasicBlock from "~/components/molecules/Search//BasicBlock";

/**
 * import SelectBox from "~/components/commons/SelectBox"
 *
 * - minSelectBox
 * - maxSelectBox
 *
 * これらの引数をReactNodeとしているが、本当はSelectBoxコンポーネントのみを受け取るような型定義にしたかった。
 * 現状その方法がわからないため分かり次第改善したい。
 * - SelectBoxを渡した時typeエラーが出ないこと。
 * - divタグやSelectBox以外のコンポーネントを渡したときにtypeエラーが出ること。
 */
type DuritionSelectBlockProps = {
  labelText: string;
  sectionBar?: boolean;
  minSelectBox: React.ReactNode;
  maxSelectBox: React.ReactNode;
};

const DuritionSelectBlock: React.FC<DuritionSelectBlockProps> = ({
  labelText,
  sectionBar = true,
  minSelectBox,
  maxSelectBox,
}: DuritionSelectBlockProps) => {
  return (
    <BasicBlock sectionBar={sectionBar}>
      <div className={styles.label}>
        <p>{labelText}</p>
      </div>
      <div className={styles.inputs}>
        {minSelectBox}
        <span> ~ </span>
        {maxSelectBox}
      </div>
    </BasicBlock>
  );
};

export default DuritionSelectBlock;
