import { useState, useEffect } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import Item from "~/components/templates/Header/Humburger/Item";
import { useToggles } from "~/components/Context/ToggleContext";

type AccordionItem = {
  text: React.ReactNode;
  children: React.ReactNode;
  underline?: "solid" | "dashed" | "none";
  fontSize?: "sm" | "md";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const useIsOpenState = () => {
  const { toggle } = useToggles();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [toggle]);

  return { isOpen, setIsOpen };
};

const AccordionItem: React.FC<AccordionItem> = ({
  children,
  text,
  underline = "none",
  fontSize = "md",
  onClick,
}: AccordionItem) => {
  const { isOpen, setIsOpen } = useIsOpenState();
  const customStyles = classnames([styles[`underline-${underline}`]]);

  return (
    <div className={styles.container}>
      <button
        className={classnames(
          styles.title,
          isOpen ? styles.open : styles.close
        )}
        onClick={(e) => {
          if (onClick) onClick(e);
          setIsOpen(!isOpen);
        }}
      >
        <Item
          arrow={false}
          type={"normal"}
          underline={underline}
          text={text}
          fontSize={fontSize}
          bgColor={"transparent"}
        ></Item>
        <div className={styles.togglerSection}>
          <div className={classnames(styles.toggler, customStyles)}>
            <span className={isOpen ? styles.open : styles.close}></span>
          </div>
        </div>
      </button>
      <div
        className={classnames(
          styles.accordion,
          isOpen ? "visible" : "invisible"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
