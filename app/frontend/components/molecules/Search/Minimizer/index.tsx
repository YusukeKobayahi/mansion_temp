import classnames from "classnames";
import Image from "next/image";
import styles from "./index.module.scss";
import { ReactSetStateType } from "~/lib/types";

type MinimizerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: ReactSetStateType<boolean>;
};

const Minimizer: React.FC<MinimizerProps> = ({
  children,
  isOpen,
  setIsOpen,
}: MinimizerProps) => {
  const togglerClasses = classnames({
    [styles.toggler]: true,
    [styles.invisible]: isOpen,
    spOnly: !isOpen,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={isOpen ? styles.visible : styles.invisible}>
          <div className={styles.mask}>
            <div className={styles.searchSection}>{children}</div>
            <div className={styles.closeSection}>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>
          </div>
        </div>
      </div>
      <button className={togglerClasses} onClick={() => setIsOpen(true)}>
        <Image
          src={"/ms-library/images/option.svg"}
          alt={"option"}
          width={20}
          height={20}
        />
      </button>
    </>
  );
};

export default Minimizer;
