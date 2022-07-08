import { SearchModalTabType } from "~/components/organisms/SearchModal";
import ButtonRect from "~/components/commons/ButtonRect";
import styles from "./index.module.scss";
import classnames from "classnames";
import { ReactSetStateType } from "~/lib/types";

type TabsProps = {
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
  className?: string;
};
const Tabs: React.FC<TabsProps> = ({ tab, setTab, className }: TabsProps) => {
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.tabContent}>
        <ButtonRect
          text="エリアから探す"
          onClick={() => setTab("City")}
          outline={tab !== "City" && tab !== "Town"}
        />
        <ButtonRect
          text="路線から探す"
          onClick={() => setTab("Line")}
          outline={tab !== "Line" && tab !== "Station"}
        />
        <ButtonRect
          text="ブランドから探す"
          onClick={() => setTab("Brand")}
          outline={tab !== "Brand"}
        />
        <ButtonRect
          text="小学校区から探す"
          onClick={() => setTab("PrimarySchool")}
          outline={tab !== "PrimarySchool"}
        />
      </div>
    </div>
  );
};

export default Tabs;
