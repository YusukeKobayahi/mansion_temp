import BoxHeading from "~/components/commons/headings/BoxHeading";
import Link from "~/components/commons/Link";
import { useCurrentPath } from "~/lib/utils";
import styles from "./index.module.scss";

type Props = {
  title: string;
};

const SpecificSearchConditionLinkGroup: React.FC<Props> = ({
  title,
}: Props) => {
  const currentPath = useCurrentPath();

  const mdSet = [
    {
      text: "1LDK",
      value: "0105",
    },
    {
      text: "2LDK",
      value: "0205",
    },
  ];

  const prbSet = [
    {
      text: "1000万円以上",
      value: "10000000",
    },
    {
      text: "2000万円以上",
      value: "20000000",
    },
  ];

  return (
    <section className={styles.container}>
      <h2>
        <BoxHeading>{title}</BoxHeading>
      </h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>間取り</td>
            {mdSet.map(({ text, value }, i) => (
              <td key={i}>
                <Link
                  text={text}
                  linkProps={{ href: `${currentPath}?md=${value}` }}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>価格</td>
            {prbSet.map(({ text, value }, i) => (
              <td key={i}>
                <Link
                  text={text}
                  linkProps={{ href: `${currentPath}?prb=${value}` }}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>種類</td>
            <td>
              <Link
                text={"タワーマンション"}
                linkProps={{ href: `${currentPath}?gfb=100` }}
              />
            </td>
            <td>
              <Link
                text={"低層マンション"}
                linkProps={{ href: `${currentPath}?gft=20` }}
              />
            </td>
            <td>
              <Link
                text={"大規模マンション"}
                linkProps={{ href: `${currentPath}?utb=5` }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SpecificSearchConditionLinkGroup;
