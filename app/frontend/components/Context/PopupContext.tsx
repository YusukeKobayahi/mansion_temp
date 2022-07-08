import { createContext, useState, ReactNode } from "react";
import { ReactSetStateType } from "~/lib/types";

type BreadcrumbItemContext = {
  isAlradyPopup: boolean;
  setIsAlradyPopup: ReactSetStateType<boolean>;
};

export const PopupContext = createContext({} as BreadcrumbItemContext);

type PopupProps = {
  children?: ReactNode;
};

const PopupContextProvider: React.FC<PopupProps> = ({
  children,
}: PopupProps) => {
  const [isAlradyPopup, setIsAlradyPopup] = useState(false);
  return (
    <PopupContext.Provider value={{ isAlradyPopup, setIsAlradyPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
