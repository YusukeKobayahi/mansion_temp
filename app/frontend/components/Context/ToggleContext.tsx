import { createContext, useContext, useState, ReactNode } from "react";
import { ReactSetStateType } from "~/lib/types";

type ToggleContextProps = {
  toggle: boolean;
  setToggle: ReactSetStateType<boolean>;
};

export const ToggleContext = createContext({} as ToggleContextProps);

type ToggleContextPropviderProps = {
  children?: ReactNode;
};

const ToggleContextProvider: React.FC<ToggleContextPropviderProps> = ({
  children,
}: ToggleContextPropviderProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggles = (): ToggleContextProps => {
  const { toggle, setToggle } = useContext(ToggleContext);
  //toggleがBooleanなので!toggleとは書かない
  if (toggle === undefined || !setToggle) {
    throw new Error("ToggleContext has no value.");
  }
  return { toggle, setToggle };
};

export default ToggleContextProvider;
