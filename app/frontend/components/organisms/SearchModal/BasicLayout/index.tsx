import styles from "./index.module.scss";
import { useToggles } from "~/components/Context/ToggleContext";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import SideBarHeading from "~/components/commons/headings/SideBarHeading";

type BasicLayourProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

const BasicLayout: React.FC<BasicLayourProps> = ({
  title,
  children,
}: BasicLayourProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  return (
    <div>
      <button
        className={styles.mask}
        onClick={() => setIsSearchModalOpen(false)}
      ></button>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <BoxHeading className="pcOnly">{title}</BoxHeading>
          <SideBarHeading className="spOnly">{title}</SideBarHeading>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
