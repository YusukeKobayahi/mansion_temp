import { GetServerSideProps } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { omit } from "lodash";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import { GraphQLError, isNotFoundError } from "~/lib/graphql/errors";
import {
  CommuteStationsDocument,
  CommuteStationsQuery,
  CommuteStationsQueryVariables,
} from "~/graphql/generated";
import Menu from "~/components/pages/commute/stations/Menu";
import SortBox from "~/components/pages/commute/stations/SortBox";
import CheckBox from "~/components/commons/CheckBox";
import ButtonRadius, {
  ButtonRadiusProps,
} from "~/components/commons/ButtonRadius";

import {
  buildLibraryPagePath,
  insertSearchCondition,
  setQueryNumber,
  setQueryString,
  redirect,
} from "~/lib/utils";

import Layout from "~/components/templates/Layout";
import Item from "~/components/pages/commute/stations/Item";
import Search from "~/components/pages/commute/stations/Search";
import BaseInfo from "~/components/pages/commute/stations/BaseInfo";
import InsertCTA from "~/components/commons/CTAs/InsertCTA";
import FloatCTA from "~/components/pages/commute/stations/FloatCTA";
import Alert from "~/components/commons/Alert";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MetaText from "~/lib/metaText";

import styles from "~/pages/commute/stations/[id]/index.module.scss";
import { QueryVariables } from "~/lib/types";

export interface CommuteStationsProps {
  searchCondition: CommuteStationsQueryVariables;
  data: CommuteStationsQuery;
}

const CommuteStations: React.FC<CommuteStationsProps> = ({
  searchCondition,
  data,
}) => {
  const [stArray, setStArray] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const station = data.station;
  const stationLines = station.sameStations.map(({ line }) => line);
  const stationToStations = data.station.stationToStations || [];
  const currentPath = buildLibraryPagePath(
    "commute",
    "stations",
    searchCondition.st
  );
  const breadcrumbs = [
    {
      name: "Housiiトップ",
      path: "https://ieul.jp/buy/",
    },
    {
      name: "マンションライブラリー",
      path: buildLibraryPagePath(),
    },
    {
      name: `${station?.name}駅へ通勤しやすい駅`,
      path: "commute/stations/[id]",
      asLink: currentPath,
    },
  ];

  const stationIdsArray = stationToStations
    .filter(({ endStation }) => Boolean(endStation))
    .map(({ endStation }) => String(endStation?.id));
  const handleCheckedAll = () => {
    const newStArray = !checkedAll ? stationIdsArray : [];
    setStArray(newStArray);
    setCheckedAll(!checkedAll);
  };

  const stationsSearch = (ids?: string[]) => {
    const array = ids ? ids : stArray;
    const path = buildLibraryPagePath("stations", array[0]);
    const query = { st: array.join(",") };
    Router.push(
      array.length !== 1
        ? {
            pathname: path,
            query: query,
          }
        : path
    );
  };

  const AllStationSearchButton: Pick<
    ButtonRadiusProps,
    "onClick" | "disabled"
  > = {
    disabled: false,
    onClick: () => {
      handleCheckedAll();
      stationsSearch(stationIdsArray);
    },
  };
  const selectedStationSearchButton: Pick<
    ButtonRadiusProps,
    "onClick" | "disabled"
  > = {
    disabled: stArray.length === 0,
    onClick: () => stationsSearch(),
  };

  const metaText = new MetaText({
    subject: `${station.name}の通勤・通学圏内`,
    conditions: searchCondition as QueryVariables,
  });

  const isNoindex = false;
  return (
    <Layout
      title={metaText.getBasicTitle()}
      description={metaText.getBasicDescription()}
      breadcrumbs={breadcrumbs}
      pages={"commute"}
      isNoindex={isNoindex}
    >
      <Search
        station={station}
        minimize={true}
        searchCondition={searchCondition}
        buttonRadius={selectedStationSearchButton}
      />
      <BaseInfo
        mainText={`${station.name}駅の通勤・通学圏内のおすすめの駅から物件を探す`}
      />
      <section className={styles.content}>
        <div className={styles.searchSection}>
          <Search
            station={station}
            searchCondition={searchCondition}
            buttonRadius={selectedStationSearchButton}
          />
        </div>
        <div>
          <Menu
            checkbox={
              <CheckBox
                value={"checkedAll"}
                checked={checkedAll}
                onChange={handleCheckedAll}
              />
            }
            buttonRadius={
              <ButtonRadius
                outline={true}
                size="sm"
                text="物件情報をまとめてみる"
                {...selectedStationSearchButton}
              />
            }
            sortBox={
              <SortBox
                currentPath={currentPath}
                searchCondition={searchCondition}
              />
            }
            hitCount={stationToStations.length}
          />
          {stationToStations.length ? (
            stationToStations.map((stationToStation, i) => (
              <div key={i}>
                <Item
                  data={stationToStation}
                  st={stArray}
                  setSt={setStArray}
                  fromStation={data.station}
                />
                {i !== 0 && (i + 1) % 3 === 0 && <InsertCTA />}
              </div>
            ))
          ) : (
            <Alert
              text={`条件に合う${station.name}駅の通勤・通学圏内の駅がありません。条件を変更して再度検索してください。`}
              outline={true}
            />
          )}
        </div>
      </section>

      <section>
        <h2>
          <BoxHeading>{station?.name}駅に乗り換えている路線</BoxHeading>
        </h2>
        <div className={styles.stationInfoBody}>
          {stationLines.map((line, i) => (
            <span key={i}>
              <span className={styles.linkText}>
                <Link
                  href={buildLibraryPagePath("lines", line.id)}
                  prefetch={false}
                >
                  {line.name}
                </Link>
              </span>
              、
            </span>
          ))}
        </div>
      </section>

      <FloatCTA visility="spOnly">
        <div className={styles.ctaRadiusButton}>
          <ButtonRadius
            outline={true}
            color={"dark"}
            size="sm"
            text={
              <span>
                全ての駅の
                <br />
                物件を見る
              </span>
            }
            {...AllStationSearchButton}
          />
        </div>
        <div className={styles.ctaRadiusButton}>
          <ButtonRadius
            outline={true}
            size="sm"
            text={
              <span>
                選択した駅の
                <br />
                物件を見る
              </span>
            }
            {...selectedStationSearchButton}
          />
        </div>
      </FloatCTA>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  if (!params || !params.id)
    return {
      notFound: true,
    };

  const id = params.id as string;
  /**
   * クエリのチェック
   * クエリパラメータ内のstの値が一つだけの場合はstなしのクエリとパスにリダイレクトする
   */
  const stArray = typeof query.st === "string" ? query.st.split(",") : [];
  if (stArray.length === 1) {
    const newQuery = omit(query, ["st", "paths", "id"]);
    const newQueryString = Object.entries(newQuery)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const path = buildLibraryPagePath("commute", "stations", id);
    const newPath = `${path}?${newQueryString}`;
    return redirect(newQueryString === "" ? path : newPath);
  }

  /**
   * SearchConditionの作成
   * クエリ内はStringの値しかないため適切に型の変換を行う
   */
  const searchQuery = query ? omit(query, ["paths"]) : {};
  const searchCondition: QueryVariables = {
    st: id,
  };

  const stringKeys: (keyof QueryVariables)[] = ["st", "orap", "ortt", "ormn"];
  const numberKeys: (keyof QueryVariables)[] = [
    "mnt",
    "trt",
    "apb",
    "apt",
    "limit",
  ];

  stringKeys.forEach((el) => {
    insertSearchCondition(el, setQueryString(searchQuery[el]), searchCondition);
  });
  numberKeys.forEach((el) => {
    insertSearchCondition(el, setQueryNumber(searchQuery[el]), searchCondition);
  });

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: CommuteStationsDocument,
      variables: searchCondition,
    });

    // 同じ駅だが路線が違うことでidが違うのに同じ駅なstationが複数存在する。
    // 優先度の高い駅にリダイレクトする処理。
    const station = (data as CommuteStationsQuery).station;
    const priorityId = station.topPriorityStation.id;
    if (station.id !== priorityId) {
      const location = buildLibraryPagePath("commute", "stations", priorityId);
      return redirect(location);
    }

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        data,
        searchCondition,
      },
    };
  } catch (err) {
    if (!isNotFoundError(err as GraphQLError)) throw err;
    return {
      notFound: true,
    };
  }
};

export default CommuteStations;
