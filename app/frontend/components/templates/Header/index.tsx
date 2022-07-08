import Link from "next/link";
import Image from "next/image";
import { buildLibraryPagePath } from "~/lib/utils";
import classnames from "classnames";
import Form from "~/components/templates/Header/Form";
import Humburger from "~/components/templates/Header/Humburger";
import styles from "./index.module.scss";
import ToggleContextProvider from "~/components/Context/ToggleContext";

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={classnames(styles.humburger, "spOnly")}>
        <ToggleContextProvider>
          <Humburger />
        </ToggleContextProvider>
      </div>
      <div className={styles.logoContainer}>
        <Link href={"/"} as={buildLibraryPagePath()} prefetch={false}>
          <a className={styles.link}>
            <Image
              className={styles.logo}
              src={"/ms-library/images/commons/logo.png"}
              alt={"housii"}
              width={95}
              height={26}
              loading={"eager"}
            />
          </a>
        </Link>
      </div>
      <div className="pcOnly">
        <Form />
      </div>
    </div>
  </header>
);

export default Header;
