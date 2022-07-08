import styles from "./index.module.scss";
import classnames from "classnames";

type Visility = "pcOnly" | "spOnly" | "";
type FloatCTAProps = {
  visility?: Visility;
  children: React.ReactNode;
};

const FloatCTA: React.FC<FloatCTAProps> = ({
  children,
  visility = "",
}: FloatCTAProps) => {
  return (
    <section className={classnames(styles.container, visility)}>
      <div className={styles.children}>{children}</div>
    </section>
  );
};

export default FloatCTA;
