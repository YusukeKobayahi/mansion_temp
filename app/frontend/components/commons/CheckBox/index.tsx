import { ChangeEventHandler } from "react";

import styles from "~/components/commons/CheckBox/index.module.scss";

type CheckBoxProps = {
  disabled?: boolean;
  checked: boolean;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  disabled = false,
  value,
  onChange,
}: CheckBoxProps) => {
  const checkboxId = `checkbox-${value}`;
  return (
    <div className={styles.checkbox}>
      <input
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={checkboxId} className={checked ? styles.checked : ""}>
        {"✔︎"}
      </label>
    </div>
  );
};

export default CheckBox;
