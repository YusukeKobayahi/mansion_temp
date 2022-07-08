import { useMemo, useState, useEffect } from "react";
import compact from "lodash/compact";

import { MsLibraryMansionsAccessFragment } from "~/graphql/generated";
import styles from "./index.module.scss";

export interface AccessProps {
  data: MsLibraryMansionsAccessFragment;
}

const Access: React.FC<AccessProps> = ({ data }: AccessProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const buildMapAccessSrc = useMemo(() => {
    return compact([
      "https://maps.google.co.jp/maps?output=embed&q=",
      data.prefecture.name,
      data.city.name,
      data.town.name,
      data.street?.name,
      data.blockNumber,
    ]).join("");
  }, [
    data.prefecture.name,
    data.city.name,
    data.town.name,
    data.street?.name,
    data.blockNumber,
  ]);

  useEffect(() => {
    const scrollEvent = () => {
      if (window.pageYOffset > 0) setIsVisible(true);
    };
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  return (
    <section className={styles.container}>
      {isVisible && (
        <iframe
          width="940"
          height="400"
          loading="lazy"
          src={buildMapAccessSrc}
          title="googlemap"
        ></iframe>
      )}
    </section>
  );
};

export default Access;
