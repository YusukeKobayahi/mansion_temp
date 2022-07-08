import styles from "./index.module.scss";
import crypto from "crypto";
import classnames from "classnames";
import intersection from "lodash/intersection";
import React, {
  ChangeEventHandler,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useCheckedValues } from "~/components/Context/CheckedValuesContext";

const useIsCheckedState = (
  useProvider: boolean,
  values: string[],
  checked: boolean
) => {
  const [isChecked, setIsChecked] = useState(checked);
  const isFirstRender = useRef(false);
  const {
    checkedValues,
    addCheckedValues,
    removeCheckedValues,
  } = useCheckedValues();

  const handleIsChecked = useCallback(
    (bool: boolean) => {
      setIsChecked(bool);
    },
    [isChecked]
  );

  const startFirstRender = () => {
    isFirstRender.current = true;
  };
  const endFirstRender = () => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;
  };

  useEffect(startFirstRender, []);

  // 引数として渡されるcheckedに変更があった場合、isCheckedを更新する
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  //チェックされた時にprovider側のStateに値を追加・削除する
  useEffect(() => {
    if (isFirstRender.current || !useProvider) return;
    else if (isChecked) addCheckedValues(values);
    else removeCheckedValues(values);
  }, [isChecked]);

  //CheckedValuesContextを通してvaluesが変更された場合は同期するために必要に応じてisCheckedの値を変更する
  useEffect(() => {
    if (isFirstRender.current || !useProvider) return;

    const includes =
      intersection(checkedValues, values).length === values.length;

    if (includes) handleIsChecked(true);
    else handleIsChecked(false);
  }, [checkedValues]);

  useEffect(endFirstRender, []);

  return { isChecked, setIsChecked: handleIsChecked };
};

const validationCheck = (values: string[]) => {
  if (!values.length)
    throw new Error("[Radio] provided argument `values` has no length.");
  values.forEach((value) => {
    if (value === "")
      throw new Error("[Radio] provided argument `values` has empty element");
  });
  return true;
};

type RadioProps = {
  labelText?: string;
  disabled?: boolean;
  checked?: boolean;
  values: string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  shape: "rectangle" | "circle";
  useProvider?: boolean;
  className?: string;
};

const Radio: React.FC<RadioProps> = ({
  labelText,
  disabled = false,
  checked = false,
  values,
  onChange,
  shape,
  useProvider = false,
  className = "",
}: RadioProps) => {
  validationCheck(values);
  const { isChecked, setIsChecked } = useIsCheckedState(
    useProvider,
    values,
    checked
  );
  const ramdomId = crypto.randomBytes(48).toString("hex");
  const radioId = `radio-${values}-${ramdomId}`;

  return (
    <div className={classnames("flex", className)}>
      <div className={styles.checkbox}>
        <input
          id={radioId}
          type="checkbox"
          disabled={disabled}
          value={values}
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(!isChecked);
            if (onChange) onChange(e);
          }}
        />
        <label
          htmlFor={radioId}
          className={classnames(
            [styles[shape]],
            isChecked ? styles.checked : styles.unchecked
          )}
        >
          <span></span>
        </label>
      </div>
      <label className={styles.label} htmlFor={radioId}>
        {labelText}
      </label>
    </div>
  );
};

export default Radio;
