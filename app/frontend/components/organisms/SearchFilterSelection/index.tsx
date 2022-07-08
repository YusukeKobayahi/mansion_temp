import React, { ComponentProps } from "react";
import dynamic from "next/dynamic";
import xor from "lodash/xor";
import { event } from "~/lib/gtag";
import {
  buildSearchUrlFromHref,
  useCurrentPath,
  getQueryVariables,
  pathFormat,
} from "~/lib/utils";
import Container from "~/components/molecules/Search/Container";
import DuritionSelectBlock from "~/components/molecules/Search/DuritionSelectBlock";
import SelectBox from "~/components/commons/SelectBox";
import ItemBlock from "~/components/molecules/Search/ItemBlock";
import ButtonRect from "~/components/commons/ButtonRect";
import searchData from "~/components/molecules/Search/searchData.json";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import styles from "./index.module.scss";
const Radio = dynamic(() => import("~/components/commons/Radio"), {
  ssr: false,
});

type SearchFilterSelectionProps = Pick<
  ComponentProps<typeof Container>,
  "isOpen" | "title" | "withTitle"
>;

const SearchFilterSelection: React.FC<SearchFilterSelectionProps> = ({
  title = "こだわり検索条件",
  isOpen = true,
  withTitle = true,
}: SearchFilterSelectionProps) => {
  const {
    modelQueryParameters,
    filterQueryParameters,
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
    setPrb,
    setPrt,
    setEab,
    setEat,
    setMd,
    setTht,
    setCkt,
    setUtb,
    setGfb,
    setGft,
  } = useSearchCondition();
  const currentPath = useCurrentPath();
  const query = getQueryVariables({
    modelQueryParameters,
    filterQueryParameters,
  });
  const href = {
    pathname: pathFormat(currentPath),
    query,
  };
  const searchUrl = buildSearchUrlFromHref(href);

  const changeCondition = () => {
    event({
      action: "msl_link_click",
      category: "msl_ichiran",
      label: searchUrl,
      value: 1,
    });
  };

  // searchDataをoptionのフォーマットに変えるためだけの匿名関数
  const optionFormatter = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    return {
      text: name,
      value,
    };
  };
  const prbOptions = searchData.prb.map((option) => optionFormatter(option));
  const prtOptions = searchData.prt.map((option) => optionFormatter(option));
  const eabOptions = searchData.eab.map((option) => optionFormatter(option));
  const eatOptions = searchData.eat.map((option) => optionFormatter(option));
  const thtOptions = searchData.tht.map((option) => optionFormatter(option));
  const cktOptions = searchData.ckt.map((option) => optionFormatter(option));
  const utbData = searchData.utb[0];
  const gfbData = searchData.gfb[0];
  const gftData = searchData.gft[0];

  return (
    <Container title={title} isOpen={isOpen} withTitle={withTitle}>
      <DuritionSelectBlock
        labelText="価格"
        minSelectBox={
          <SelectBox
            options={prbOptions}
            defaultValue={prb}
            onBlur={(e) => setPrb(e.target.value)}
          />
        }
        maxSelectBox={
          <SelectBox
            options={prtOptions}
            defaultValue={prt}
            onBlur={(e) => setPrt(e.target.value)}
          />
        }
      />
      <DuritionSelectBlock
        labelText="占有面積"
        minSelectBox={
          <SelectBox
            options={eabOptions}
            defaultValue={eab}
            onBlur={(e) => setEab(e.target.value)}
          />
        }
        maxSelectBox={
          <SelectBox
            options={eatOptions}
            defaultValue={eat}
            onBlur={(e) => setEat(e.target.value)}
          />
        }
      />
      <ItemBlock title="間取り">
        <div className={styles.radios}>
          {searchData.md.map(({ value, name }, i) => (
            <Radio
              className={styles.radio}
              key={i}
              labelText={name}
              values={[value]}
              shape={"circle"}
              checked={md.includes(value)}
              onChange={(e) => setMd(xor(md, [e.target.value]))}
            />
          ))}
        </div>
      </ItemBlock>
      <ItemBlock title="駅徒歩">
        <div className="w_130px">
          <SelectBox
            options={thtOptions}
            defaultValue={tht}
            onBlur={(e) => setTht(e.target.value)}
          />
        </div>
      </ItemBlock>
      <ItemBlock title="築年数">
        <div className="w_130px">
          <SelectBox
            options={cktOptions}
            defaultValue={ckt}
            onBlur={(e) => setCkt(e.target.value)}
          />
        </div>
      </ItemBlock>
      <ItemBlock title="物件規模" className="p_l_10px">
        <Radio
          className="m_y_10px"
          labelText={utbData.name}
          values={[utbData.value]}
          shape="circle"
          checked={utb.includes(utbData.value)}
          onChange={(e) => {
            utb == "" ? setUtb(e.target.value) : setUtb("");
          }}
        />
        <Radio
          className="m_y_10px"
          labelText={gfbData.name}
          values={[gfbData.value]}
          shape="circle"
          checked={gfb.includes(gfbData.value)}
          onChange={(e) => {
            gfb == "" ? setGfb(e.target.value) : setGfb("");
          }}
        />
        <Radio
          className="m_y_10px"
          labelText={gftData.name}
          values={[gftData.value]}
          shape="circle"
          checked={gft.includes(gftData.value)}
          onChange={(e) => {
            gft == "" ? setGft(e.target.value) : setGft("");
          }}
        />
      </ItemBlock>
      <ButtonRect
        text="この条件で検索する"
        onClick={changeCondition}
        outline={true}
        linkProps={{ href }}
      />
    </Container>
  );
};

export default SearchFilterSelection;
