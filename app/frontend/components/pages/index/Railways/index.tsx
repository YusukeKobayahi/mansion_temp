import styles from "./index.module.scss";
import { event } from "~/lib/gtag";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import { useToggles } from "~/components/Context/ToggleContext";
import { ReactSetStateType } from "~/lib/types";

type RailwaysProps = {
  setTab: ReactSetStateType<SearchModalTabType>;
};
const Railways: React.FC<RailwaysProps> = ({ setTab }: RailwaysProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const clickRosen = () => {
    event({
      action: "msl_area_click",
      category: "msl_top",
      label: "msl_rosen",
      value: 1,
    });
  };
  return (
    <section className={styles.container}>
      <p className={styles.title}>駅・路線から探す</p>
      <div className={styles.main}>
        <button
          onClick={() => {
            clickRosen;
            setTab("Line");
            setIsSearchModalOpen(true);
          }}
          className={styles.trigger}
        >
          駅・沿線から探す
        </button>
      </div>
    </section>
  );
};

export default Railways;
