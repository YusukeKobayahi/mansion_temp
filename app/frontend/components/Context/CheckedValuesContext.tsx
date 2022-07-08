import { createContext, useContext, useState, ReactNode } from "react";
import { union, difference } from "lodash";
import { ReactSetStateType } from "~/lib/types";

type CheckedValuesContextProps = {
  checkedValues: string[];
  setCheckedValues: ReactSetStateType<string[]>;
};

export const CheckedValuesContext = createContext(
  {} as CheckedValuesContextProps
);

type CheckedValuesContextPropviderProps = {
  children?: ReactNode;
};

const CheckedValuesContextProvider: React.FC<CheckedValuesContextPropviderProps> = ({
  children,
}: CheckedValuesContextPropviderProps) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  return (
    <CheckedValuesContext.Provider value={{ checkedValues, setCheckedValues }}>
      {children}
    </CheckedValuesContext.Provider>
  );
};

export const useCheckedValues = (): CheckedValuesContextProps & {
  addCheckedValues: (value: string[]) => void;
  removeCheckedValues: (value: string[]) => void;
} => {
  const { checkedValues, setCheckedValues } = useContext(CheckedValuesContext);
  if (!checkedValues || !setCheckedValues) {
    new Error("CheckdValuesContext has no value.");
  }
  const addCheckedValues = (value: string[]) => {
    setCheckedValues(union(checkedValues, value));
  };
  const removeCheckedValues = (value: string[]) => {
    setCheckedValues(difference(checkedValues, value));
  };

  return {
    checkedValues,
    setCheckedValues,
    addCheckedValues,
    removeCheckedValues,
  };
};

export default CheckedValuesContextProvider;
