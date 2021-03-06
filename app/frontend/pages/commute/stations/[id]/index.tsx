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
      name: "Housii?????????",
      path: "https://ieul.jp/buy/",
    },
    {
      name: "?????????????????????????????????",
      path: buildLibraryPagePath(),
    },
    {
      name: `${station?.name}???????????????????????????`,
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
    subject: `${station.name}????????????????????????`,
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
        mainText={`${station.name}?????????????????????????????????????????????????????????????????????`}
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
                text="?????????????????????????????????"
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
              text={`???????????????${station.name}????????????????????????????????????????????????????????????????????????????????????????????????????????????`}
              outline={true}
            />
          )}
        </div>
      </section>

      <section>
        <h2>
          <BoxHeading>{station?.name}?????????????????????????????????</BoxHeading>
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
              ???
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
                ???????????????
                <br />
                ???????????????
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
                ??????????????????
                <br />
                ???????????????
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
   * ????????????????????????
   * ??????????????????????????????st?????????????????????????????????st??????????????????????????????????????????????????????
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
   * SearchCondition?????????
   * ???????????????String??????????????????????????????????????????????????????
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

    // ???????????????????????????????????????id???????????????????????????station????????????????????????
    // ?????????????????????????????????????????????????????????
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
