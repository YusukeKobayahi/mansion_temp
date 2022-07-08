import styles from "./index.module.scss";

type TitleProps = {
  children: React.ReactText;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Title: React.FC<TitleProps> = ({ children, onClick }: TitleProps) => {
  return (
    <>
      <button className={styles.title} onClick={onClick}>
        <h3>{children}</h3>
      </button>
    </>
  );
};

export default Title;
