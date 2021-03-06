import { useEffect, useMemo, useState } from "react";
import { event } from "~/lib/gtag";
import compact from "lodash/compact";
import find from "lodash/find";
import { PageCategory, QueryVariables, ReactSetStateType } from "~/lib/types";
import searchData from "~/components/molecules/Search/searchData.json";
import Container from "~/components/molecules/Search/Container";
import ButtonRect from "~/components/commons/ButtonRect";
import BasicBlock from "~/components/molecules/Search/BasicBlock";
import ItemBlock from "~/components/molecules/Search/ItemBlock";
import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import styles from "./index.module.scss";
import { useToggles } from "~/components/Context/ToggleContext";
import { SearchModalTabType } from "~/components/organisms/SearchModal";

export type PrefectureInfoProps = {
  name: string;
  jisCode: string;
};

type SearchConditionProps = {
  page: PageCategory;
  currentMainSearchCondition: string[];
  searchCondition: QueryVariables;
  prefectureInfo?: PrefectureInfoProps;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const SearchCondition: React.FC<SearchConditionProps> = ({
  page,
  currentMainSearchCondition,
  searchCondition,
  prefectureInfo,
  setTab,
}: SearchConditionProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const {
    tw,
    ct,
    ln,
    st,
    prb,
    prt,
    eab,
    eat,
    md,
    tht,
    ckt,
    utb,
    gfb,
    gft,
  } = searchCondition;

  let currentCount = 0;
  const [isOpen, setIsOpen] = useState(false);
  const threshold = 2;
  const updateCount = () => {
    currentCount++;
    if (currentCount > threshold && isOpen) return styles.noview;
  };
  useEffect(() => {
    currentCount > threshold ? setIsOpen(true) : setIsOpen(false);
  }, [searchCondition, currentCount]);

  const changeArea = () => {
    event({
      action: "msl_area_click",
      category: "msl_ichiran",
      label: "msl_area_change",
      value: 1,
    });
  };
  const titleByPage = useMemo(() => {
    if (page === "freeword") return "???????????????";
    else if (["cities", "towns"].includes(page)) return "?????????";
    else if (page === "schools") return "????????????";
    else if (page === "brands") return "???????????????????????????";
    else return "??????/???";
  }, [page]);
  const areaTextByPage = useMemo(() => {
    if (["cities", "towns"].includes(page)) return "???????????????";
    else return "??????????????????";
  }, [page]);
  const railwaysTextByPage = useMemo(() => {
    if (["lines", "stations"].includes(page)) return "?????????";
    else return "?????????";
  }, [page]);
  const townsTextByPage = useMemo(() => {
    if (["cities", "towns"].includes(page)) return "?????????";
    else return "?????????";
  }, [page]);

  return (
    <Container title={"??????????????????"}>
      <ItemBlock title={titleByPage}>
        {prefectureInfo && (
          <Link
            href={buildLibraryPagePath("prefectures", prefectureInfo.jisCode)}
            prefetch={false}
          >
            <a className={styles.prefecture}>{prefectureInfo.name}</a>
          </Link>
        )}
        <p>
          {currentMainSearchCondition.map((el, i) => (
            <span key={i}>{el}</span>
          ))}
        </p>
      </ItemBlock>
      {(prb || prt) && (
        <ItemBlock title="??????" className={updateCount()}>
          <p>
            {compact([
              find(searchData.prb, ["value", `${prb}`])?.name,
              find(searchData.prt, ["value", `${prt}`])?.name,
            ]).join(" ~ ")}
          </p>
        </ItemBlock>
      )}
      {(eab || eat) && (
        <ItemBlock title="????????????" className={updateCount()}>
          <p>
            {compact([
              find(searchData.eab, ["value", `${eab}`])?.name,
              find(searchData.eat, ["value", `${eat}`])?.name,
            ]).join(" ~ ")}
          </p>
        </ItemBlock>
      )}
      {md && (
        <ItemBlock title="?????????" className={updateCount()}>
          <p>
            {String(md)
              .split(",")
              .map((s) => find(searchData.md, ["value", `${s}`])?.name)
              .join("???")}
          </p>
        </ItemBlock>
      )}
      {tht && (
        <ItemBlock title="?????????" className={updateCount()}>
          <p>
            {find(searchData.tht, ["value", `${tht}`])?.name.replace(
              "?????????",
              ""
            )}
          </p>
        </ItemBlock>
      )}
      {ckt && (
        <ItemBlock title="?????????" className={updateCount()}>
          <p>
            {find(searchData.ckt, ["value", `${ckt}`])?.name.replace(
              "?????????",
              ""
            )}
          </p>
        </ItemBlock>
      )}
      {(utb || gfb || gft) && (
        <ItemBlock title="????????????" className={updateCount()}>
          {utb && <p>{searchData.utb[0].name}</p>}
          {gfb && <p>{searchData.gfb[0].name}</p>}
          {gft && <p>{searchData.gft[0].name}</p>}
        </ItemBlock>
      )}
      {isOpen && (
        <ButtonRect
          text="??????????????????????????????"
          outline={true}
          onClick={() => setIsOpen(false)}
          outerClassName="m_y_15px"
        />
      )}
      <BasicBlock sectionBar={false} className={styles.verticalGap}>
        <ButtonRect
          text={areaTextByPage}
          outline={true}
          onClick={() => {
            setIsSearchModalOpen(true);
            setTab("City");
            changeArea();
          }}
        />
        {((ct && ct.split(",").length > 0) ||
          (tw && tw.split(",").length > 0)) && (
          <ButtonRect
            text={`??????${townsTextByPage}`}
            outline={true}
            onClick={() => {
              setIsSearchModalOpen(true);
              setTab("Town");
              changeArea();
            }}
          />
        )}
        <ButtonRect
          text={`??????${railwaysTextByPage}`}
          outline={true}
          onClick={() => {
            setIsSearchModalOpen(true);
            setTab("Line");
            changeArea();
          }}
        />
        {((st && st.split(",").length > 0) ||
          (ln && ln.split(",").length > 0)) && (
          <ButtonRect
            text={`???${railwaysTextByPage}`}
            outline={true}
            onClick={() => {
              setIsSearchModalOpen(true);
              setTab("Station");
              changeArea();
            }}
          />
        )}
        {page === "schools" && (
          <ButtonRect
            text={`?????????????????????`}
            outline={true}
            onClick={() => {
              setIsSearchModalOpen(true);
              setTab("PrimarySchool");
              changeArea();
            }}
          />
        )}
      </BasicBlock>
    </Container>
  );
};

export default SearchCondition;
