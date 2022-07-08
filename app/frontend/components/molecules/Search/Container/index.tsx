import Image from "next/image";
import classnames from "classnames";
import styles from "./index.module.scss";
import { ReactSetStateType } from "~/lib/types";
import ConditionalWrapper from "~/components/commons/ConditionalWrapper";
import Minimizer from "~/components/molecules/Search/Minimizer";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  minimize?: boolean;
  isOpen?: boolean;
  withTitle?: boolean;
  setIsOpen?: ReactSetStateType<boolean>;
};

const Container: React.FC<ContainerProps> = ({
  title = "絞り込み条件",
  minimize = false,
  children,
  isOpen = false,
  withTitle = true,
  setIsOpen = () => {
    return;
  },
}: ContainerProps) => {
  const togglerClasses = classnames({
    [styles.invisible]: minimize,
    [styles.toggler]: true,
  });
  const bodyClasses = classnames({
    [styles.body]: true,
    [styles.visible]: isOpen || minimize,
  });
  return (
    <ConditionalWrapper
      condition={minimize}
      wrapper={(children) => (
        <Minimizer setIsOpen={setIsOpen} isOpen={isOpen}>
          {children}
        </Minimizer>
      )}
    >
      <section>
        <div className={styles.container}>
          {withTitle && (
            <>
              <div className={"pcOnly"}>
                <div className={styles.title}>
                  <p>{title}</p>
                </div>
              </div>
              <div className={"spOnly"}>
                <button
                  className={styles.title}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Image
                    src={"/ms-library/images/option.svg"}
                    alt={"option"}
                    width={20}
                    height={20}
                  />
                  <p>{title}</p>
                  <div className={togglerClasses}>
                    <span
                      className={isOpen ? styles.open : styles.close}
                    ></span>
                  </div>
                </button>
              </div>
            </>
          )}
          <div className={bodyClasses}>{children}</div>
        </div>
      </section>
    </ConditionalWrapper>
  );
};

export default Container;
