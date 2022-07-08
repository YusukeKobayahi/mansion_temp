import classnames from "classnames";
import styles from "./index.module.scss";

type MenuProps = {
  checkbox: React.ReactNode;
  buttonRadius: React.ReactNode;
  sortBox: React.ReactNode;
  hitCount: number;
};
const Menu: React.FC<MenuProps> = ({
  buttonRadius,
  sortBox,
  checkbox,
  hitCount,
}: MenuProps) => {
  return (
    <>
      <div className={classnames(styles.layout, "pcOnly")}>
        <div className={styles.checkbox}>
          <div>
            <p>全て選択</p>
          </div>
          {checkbox}
        </div>
        <div className={styles.menu}>
          {buttonRadius}
          <div className={styles.justifyRight}>
            <p>並び替え</p>
          </div>
          {sortBox}
          <div>
            <p>
              該当
              <span className={styles.fontSizeLg}>{hitCount}</span>件
            </p>
          </div>
        </div>
      </div>

      <div className="spOnly">
        <div className={styles.menu}>
          <div>
            <p>
              該当
              <span className={styles.fontSizeLg}>{hitCount}</span>件
            </p>
          </div>
          <div className={classnames(styles.justifyRight, styles.fontSizeSm)}>
            <p>並び替え</p>
          </div>
          {sortBox}
        </div>
      </div>
    </>
  );
};

export default Menu;
