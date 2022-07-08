import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import { event } from "~/lib/gtag";
import schoolList from "./schoolList.json";
import styles from "./index.module.scss";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import { useToggles } from "~/components/Context/ToggleContext";
import { ReactSetStateType } from "~/lib/types";

type SchoolsProps = {
  setTab: ReactSetStateType<SearchModalTabType>;
};

type SchoolsListProps = {
  name: string;
  schoolId: string;
};

const Schools: React.FC<SchoolsProps> = ({ setTab }: SchoolsProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const filteredSchoolList: SchoolsListProps[] = schoolList.towns;

  const clickSchool = () => {
    event({
      action: "msl_area_click",
      category: "msl_top",
      label: "msl_school",
      value: 1,
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>人気の小学校区から探す</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {filteredSchoolList.map((school) => {
            return (
              <li key={school.schoolId} className={styles.item}>
                <Link
                  href={buildLibraryPagePath("schools", school.schoolId)}
                  prefetch={false}
                  passHref
                >
                  <button className={styles.link} onClick={clickSchool}>
                    {school.name}区
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => {
          clickSchool;
          setTab("PrimarySchool");
          setIsSearchModalOpen(true);
        }}
        className={styles.trigger}
      >
        その他地域の小学校
      </button>
    </section>
  );
};

export default Schools;
