import Router from "next/router";
import { useEffect, useState } from "react";
import { omitBy } from "lodash";
import {
  setInitialStateNumber,
  buildLibraryPagePath,
  yenFormat,
} from "~/lib/utils";
import {
  CommuteStationsQuery,
  CommuteStationsQueryVariables,
} from "~/graphql/generated";
import ButtonRect from "~/components/commons/ButtonRect";
import ButtonRadius, {
  ButtonRadiusProps,
} from "~/components/commons/ButtonRadius";
import SelectBox from "~/components/commons/SelectBox";
import BasicBlock from "~/components/molecules/Search/BasicBlock";
import SelectBlock from "~/components/molecules/Search/SelectBlock";
import DuritionSelectBlock from "~/components/molecules/Search/DuritionSelectBlock";
import Container from "~/components/molecules/Search/Container";

import styles from "./index.module.scss";

type SearchProps = {
  station: CommuteStationsQuery["station"];
  minimize?: boolean;
  searchCondition: CommuteStationsQueryVariables;
  buttonRadius: Pick<ButtonRadiusProps, "onClick" | "disabled">;
};

const Search: React.FC<SearchProps> = ({
  station,
  minimize = false,
  searchCondition,
  buttonRadius,
}: SearchProps) => {
  const [mnt, setMnt] = useState(setInitialStateNumber(searchCondition.mnt));
  const [trt, setTrt] = useState(setInitialStateNumber(searchCondition.trt));
  const [apb, setApb] = useState(setInitialStateNumber(searchCondition.apb));
  const [apt, setApt] = useState(setInitialStateNumber(searchCondition.apt));
  const [limit] = useState(setInitialStateNumber(searchCondition.limit));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchCondition]);

  const getNumArray = (start: number, end: number, step: number): number[] => {
    const array: number[] = [];
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
    return array;
  };
  const minutesTopOptions = getNumArray(5, 60, 5).map((val) => {
    return {
      value: String(val),
      text: String(val),
    };
  });
  minutesTopOptions.unshift({ value: "", text: "指定なし" });

  const trasferTimeTopOptions = getNumArray(1, 5, 1).map((val) => {
    return {
      value: String(val),
      text: String(val),
    };
  });
  trasferTimeTopOptions.unshift({ value: "", text: "指定なし" });

  const marketPriceOptions = getNumArray(1000000, 5000000, 1000000).map(
    (val) => {
      return {
        value: String(val),
        text: yenFormat(val),
      };
    }
  );
  const apbOptions = [{ text: "下限なし", value: "" }, ...marketPriceOptions];
  const aptOptions = [...marketPriceOptions, { text: "上限なし", value: "" }];

  const { orap, ortt, ormn } = searchCondition;
  const search = () => {
    const query = omitBy(
      {
        orap,
        ortt,
        ormn,
        mnt,
        trt,
        apb,
        apt,
        limit,
      },
      (value) => !value || value === ""
    );
    const href = {
      pathname: buildLibraryPagePath("commute", "stations", searchCondition.st),
      query,
    };
    Router.push(href);
  };

  return (
    <>
      <Container minimize={minimize} isOpen={isOpen} setIsOpen={setIsOpen}>
        <SelectBlock
          labelText={`${station?.name}駅までの時間`}
          unitText={"分圏内"}
        >
          <SelectBox
            options={minutesTopOptions}
            defaultValue={mnt}
            onBlur={(e) => setMnt(e.target.value)}
          />
        </SelectBlock>
        <SelectBlock labelText={"乗り換え回数"} unitText={"回以内"}>
          <SelectBox
            options={trasferTimeTopOptions}
            defaultValue={trt}
            onBlur={(e) => setTrt(e.target.value)}
          />
        </SelectBlock>
        <DuritionSelectBlock
          labelText={"平均相場(㎡)"}
          minSelectBox={
            <SelectBox
              options={apbOptions}
              defaultValue={apb}
              onBlur={(e) => setApb(e.target.value)}
            />
          }
          maxSelectBox={
            <SelectBox
              options={aptOptions}
              defaultValue={apt}
              onBlur={(e) => setApt(e.target.value)}
            />
          }
        />
        {/* sectionBarとBlockの非表示をレスポンシブ時に変更するための記述 */}
        <div className="spOnly">
          <BasicBlock sectionBar={false}>
            <ButtonRect text={"検索する"} outline={true} onClick={search} />
          </BasicBlock>
        </div>
        <div className="pcOnly">
          <BasicBlock>
            <ButtonRect text={"検索する"} outline={true} onClick={search} />
          </BasicBlock>
          <BasicBlock sectionBar={false}>
            <div className={styles.aboveLabel}>
              <p>駅を選択してください</p>
            </div>
            <ButtonRadius
              outline={true}
              text={"選択した駅の物件を見る"}
              disabled={buttonRadius.disabled}
              onClick={buttonRadius.onClick}
            />
          </BasicBlock>
        </div>
      </Container>
    </>
  );
};

export default Search;
