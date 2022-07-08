import { MsLibraryMansionsSalesCtaFragment } from "~/graphql/generated";
import { isSP } from "~/lib/utils";
import { event } from "~/lib/gtag";
import styles from "./index.module.scss";

type SalesCTAProps = {
  data: MsLibraryMansionsSalesCtaFragment;
};

const SalesCTA: React.FC<SalesCTAProps> = ({ data }: SalesCTAProps) => {
  const transitionToSalesForm = (): void => {
    event({
      action: "msl_cta_click",
      category: "msl_shosai",
      label: "msl_satei",
      value: 1,
    });
    const device = isSP() ? "sp" : "pc";

    location.href = `${
      process.env.NEXT_PUBLIC_SALES_FORM_URL
    }/lps/${device}/9_cl?${buildSalesFormParams()}`;
  };

  const buildSalesFormParams = (): string => {
    const utmParams = `utm_source=iel&utm_medium=notprovided&utm_campaign=mscta&utm_content=${location.href}`;
    const typeParams = `property-type-id=1&entry-type=mansion`;
    const streetId = data.street?.id || "";
    const blockNumber = data.blockNumber || "";
    const dataParams = `street-id=${streetId}&address=${blockNumber}&mansion-name=${data.name}`;

    return [utmParams, typeParams, dataParams].join("&");
  };

  return (
    <section className={styles.container}>
      <button className={styles.btn} onClick={transitionToSalesForm}>
        いますぐ無料査定を依頼する
      </button>
    </section>
  );
};

export default SalesCTA;
