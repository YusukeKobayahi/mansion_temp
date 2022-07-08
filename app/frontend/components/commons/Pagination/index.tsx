import Link from "next/link";
import styles from "~/components/commons/Pagination/index.module.scss";
import { QueryVariables } from "~/lib/types";
import { ModelQueryKeys } from "~/lib/property";
import { buildHrefByIsNoindex } from "~/lib/utils";
import omitBy from "lodash/omitBy";
import includes from "lodash/includes";
import { event } from "~/lib/gtag";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pathname: string;
  searchCondition: QueryVariables;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  pathname,
  searchCondition,
}) => {
  const query = omitBy(
    { ...searchCondition },
    (value, key) =>
      includes(ModelQueryKeys, key) && String(value).split(",").length === 1
  );
  const list = Array.from({ length: totalPages }, (_, i) => i + 1);
  const index = currentPage - 1;
  const pagination: number[] = [];
  const setIndex = (n: number) => {
    return n < 0 || n > totalPages - 1 ? -1 : n;
  };
  const length = 5;
  if (list && list.length > 0) {
    if (list.length < 5) pagination.push(...list);
    else {
      pagination.push(list[index]);
      for (let i = 1; pagination.length < length; i++) {
        if (list[setIndex(index - i)])
          pagination.unshift(list[setIndex(index - i)]);
        if (list[setIndex(index + i)])
          pagination.push(list[setIndex(index + i)]);
      }
    }
  }
  const clickPagination = () => {
    event({
      action: "msl_page_click",
      category: "msl_ichiran",
      label: "msl_pagination",
      value: 1,
    });
  };
  return (
    <section className={styles.container}>
      {totalPages !== 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInner}>
            {currentPage !== 1 ? (
              <span className={styles.able}>
                <Link
                  href={buildHrefByIsNoindex(
                    pathname,
                    Object.assign({}, query, { page: currentPage - 1 })
                  )}
                  prefetch={false}
                  passHref
                >
                  <button onClick={clickPagination}>
                    <b></b>
                  </button>
                </Link>
              </span>
            ) : (
              <span className={styles.disable}></span>
            )}
            {pagination.map((page: number, index) => {
              const inner =
                page === currentPage ? (
                  <span className={styles.current} key={index}>
                    {page}
                  </span>
                ) : (
                  <span className={styles.able} key={index}>
                    <Link
                      href={buildHrefByIsNoindex(
                        pathname,
                        Object.assign({}, query, { page })
                      )}
                      prefetch={false}
                      passHref
                    >
                      <button className={styles.able} onClick={clickPagination}>
                        {page}
                      </button>
                    </Link>
                  </span>
                );
              return inner;
            })}
            {currentPage !== totalPages ? (
              <span className={styles.able}>
                <Link
                  href={buildHrefByIsNoindex(
                    pathname,
                    Object.assign({}, query, { page: currentPage + 1 })
                  )}
                  passHref
                >
                  <button onClick={clickPagination}>
                    <b></b>
                  </button>
                </Link>
              </span>
            ) : (
              <span className={styles.disable}></span>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Pagination;
