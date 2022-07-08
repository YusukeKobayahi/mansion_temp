import styles from "./index.module.scss";
import UnderlineHeading from "~/components/commons/headings/UnderlineHeading";

type BaseInfoProps = {
  mainText: string;
};

const BaseInfo: React.FC<BaseInfoProps> = ({ mainText }: BaseInfoProps) => {
  return (
    <div>
      <h1 className={styles.title}>
        <UnderlineHeading>
          <p>{mainText}</p>
        </UnderlineHeading>
      </h1>
    </div>
  );
};

export default BaseInfo;
