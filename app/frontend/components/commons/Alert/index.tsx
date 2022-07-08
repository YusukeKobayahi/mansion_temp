import styles from "./index.module.scss";
import classnames from "classnames";

type AlertProps = {
  text: string;
  children?: React.ReactNode;
  className?: string;
  color?: "brown" | "red";
  outline?: boolean;
};
const Alert: React.FC<AlertProps> = ({
  text,
  children,
  className,
  color = "red",
  outline = false,
}: AlertProps) => (
  <div
    className={classnames(
      styles.container,
      styles[color],
      { [styles.outline]: outline },
      className
    )}
  >
    <p>{text}</p>
    {children && <div className={styles.children}>{children}</div>}
  </div>
);

export default Alert;
