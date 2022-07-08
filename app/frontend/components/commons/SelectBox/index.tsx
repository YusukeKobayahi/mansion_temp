import styles from "~/components/commons/SelectBox/index.module.scss";
import classnames from "classnames";

type SelectBoxProps = {
  defaultValue: string;
  options: {
    value: string;
    text: string;
  }[];
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onChange?: React.FocusEventHandler<HTMLSelectElement>;
  className?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  defaultValue,
  onBlur,
  onChange,
  className = "",
}: SelectBoxProps) => {
  const optionsNode = options.map((option, i) => {
    const { value, text } = option;
    return (
      <option key={i} value={value}>
        {text}
      </option>
    );
  });
  return (
    <div className={classnames(styles.selectBox, className)}>
      <select onBlur={onBlur} onChange={onChange} defaultValue={defaultValue}>
        {optionsNode}
      </select>
    </div>
  );
};

export default SelectBox;
