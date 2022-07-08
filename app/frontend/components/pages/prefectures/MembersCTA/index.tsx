import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";
import { GoogleAnalyticsEvent } from "~/lib/types";

type MembersCTAProps = {
  position: "top" | "bottom";
  subject: string;
};

const MembersCTA: React.FC<MembersCTAProps> = ({
  position,
  subject,
}: MembersCTAProps) => {
  const clickCTA = () => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_prefectures",
      label: `msl_lp_${position}` as GoogleAnalyticsEvent["label"],
      value: 1,
    });
  };
  return (
    <section className={styles.container}>
      <p className={styles.description}>＼{subject}の未公開物件情報多数／</p>
      <button className={styles.btn} onClick={clickCTA}>
        <span>
          完全
          <br />
          無料
        </span>
        いますぐ会員登録でオファーを待つ
      </button>
    </section>
  );
};

export default MembersCTA;
