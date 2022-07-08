import styles from "./index.module.scss";
import UnderlineHeading from "~/components/commons/headings/UnderlineHeading";
import classnames from "classnames";
export interface BaseInfoProps {
  mainText: string;
  areaText: string;
  isNoindex: boolean;
  totalCount: number;
}

const BaseInfo: React.FC<BaseInfoProps> = ({
  mainText,
  areaText,
  isNoindex,
  totalCount,
}: BaseInfoProps) => {
  const explanation =
    totalCount == 0
      ? "条件にあう物件がありません。条件を変更して再度検索してください。"
      : `Housiiでは、「${
          isNoindex ? mainText + "のあなたの条件にあった」" : mainText + "」の"
        }中古マンションについて紹介しています。`;
  return (
    <div>
      <h1 className={styles.title}>
        <UnderlineHeading>
          <p className={"pcOnly"}>
            {isNoindex ? mainText + "のあなたの条件にあった" : mainText + "の"}
            中古マンション一覧
          </p>
          <p className={"spOnly"}>{areaText}の中古マンション一覧</p>
        </UnderlineHeading>
      </h1>
      <p className={classnames(styles.info, "pcOnly")}>{explanation}</p>
    </div>
  );
};

export default BaseInfo;
