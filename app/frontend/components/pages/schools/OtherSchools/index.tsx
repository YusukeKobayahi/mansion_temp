import { MsLibraryPrimarySchoolOtherSchoolsFragment } from "~/graphql/generated";

import styles from "~/components/pages/cities/OtherCities/index.module.scss";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import LinkBlock from "~/components/commons/LinkBlock";
import { sumReducer } from "~/lib/utils";

export interface OtherSchoolsProps {
  data: MsLibraryPrimarySchoolOtherSchoolsFragment;
  schoolName: string;
}

const OtherSchools: React.FC<OtherSchoolsProps> = ({
  data,
  schoolName,
}: OtherSchoolsProps) => {
  if (
    !data.city ||
    !data.city.primarySchools ||
    data.city.primarySchools.length === 0
  )
    return null;
  const schoolsCount =
    data.city.primarySchools.map((school) => school.mansionCount).length > 0
      ? data.city.primarySchools.map((school) => school.mansionCount)
      : [0];
  const schoolsTotalCount = schoolsCount.reduce(sumReducer);
  const items = data.city.primarySchools.map((school) => (
    <LinkBlock
      key={school.schoolId}
      name={school.name + "区"}
      id={school.schoolId}
      mansionCount={school.mansionCount}
      link="schools"
      eventParams={{
        action: "msl_area_click",
        category: "msl_ichiran",
        label: "msl_syuhen",
        value: 1,
      }}
    />
  ));
  return schoolsTotalCount !== 0 ? (
    <section className={styles.container}>
      <h2>
        <BoxHeading>
          {schoolName}区周辺の小学校区から中古マンションを探す
        </BoxHeading>
      </h2>
      <ul className={styles.list}>{items}</ul>
    </section>
  ) : null;
};

export default OtherSchools;
