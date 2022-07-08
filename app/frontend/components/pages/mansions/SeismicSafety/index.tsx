import Image from "next/image";
import { MsLibraryMansionsSeismicSafetyFragment } from "~/graphql/generated";
import SidelineHeading from "~/components/commons/headings/SidelineHeading";
import styles from "./index.module.scss";

export interface SeismicSafetyProps {
  data: MsLibraryMansionsSeismicSafetyFragment;
}

const SeismicSafety: React.FC<SeismicSafetyProps> = ({
  data,
}: SeismicSafetyProps) => {
  const hasSafty = Date.parse(data.constructedIn) < Date.parse("1983-06-01");

  return (
    <section className={styles.container}>
      <h3>
        <SidelineHeading>耐震性</SidelineHeading>
      </h3>
      <p className={styles.info}></p>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={hasSafty ? styles.hasSafety : ""}>
              <div className={styles.image}>
                <Image
                  src={"/ms-library/images/old-standard.svg"}
                  alt={"旧耐性基準"}
                  width={35}
                  height={36}
                />
              </div>
              旧耐性基準
            </th>
            <td>
              中規模の地震（震度５強）程度が発生した際に「建物が倒壊しないこと」を基準に定められています。
              <br />
              耐震性が気になるのであれば、耐震補強工事などを検討してみても良いでしょう。
            </td>
          </tr>
          <tr>
            <th className={!hasSafty ? styles.hasSafety : ""}>
              <div className={styles.image}>
                <Image
                  src={"/ms-library/images/new-standard.svg"}
                  alt={"新耐性基準"}
                  width={40}
                  height={36}
                />
              </div>
              新耐性基準
            </th>
            <td>
              新耐震基準では中規模の地震（震度5強程度）でほとんど損傷せず、大規模な地震震度6強～7程度の揺れでも倒壊しないような構造基準が適用されており、安心して住める基準を満たしています。
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SeismicSafety;
