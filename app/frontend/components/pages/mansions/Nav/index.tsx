import styles from "./index.module.scss";
import classnames from "classnames";
import { MemoryRouter } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Nav: React.FC = () => {
  return (
    <section className={classnames(styles.container, "pcOnly")}>
      <div className={styles.inner}>
        <MemoryRouter>
          <HashLink smooth to="#used" className={styles.btn}>
            中古販売価格
          </HashLink>
        </MemoryRouter>
        <MemoryRouter>
          <HashLink smooth to="#info" className={styles.btn}>
            物件の情報
          </HashLink>
        </MemoryRouter>
        <MemoryRouter>
          <HashLink smooth to="#price" className={styles.btn}>
            相場価格
          </HashLink>
        </MemoryRouter>
        <MemoryRouter>
          <HashLink smooth to="#local" className={styles.btn}>
            数字で見る地域情報
          </HashLink>
        </MemoryRouter>
        <MemoryRouter>
          <HashLink smooth to="#detail" className={styles.btn}>
            物件概要
          </HashLink>
        </MemoryRouter>
      </div>
    </section>
  );
};

export default Nav;
