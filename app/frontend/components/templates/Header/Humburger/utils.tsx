import { useState, useEffect } from "react";
import { LazyQueryResult, OperationVariables } from "@apollo/client";
import PageLoading from "~/components/commons/PageLoading";

export const handleLazyQueryErrorOrElement = (
  result: LazyQueryResult<any, OperationVariables>,
  callback: (data: any) => React.ReactNode
): React.ReactNode => {
  // 受け取ったデータの展開
  const { called, error, data, loading } = result;

  //エラーハンドリング
  if (!called) return null;
  else if (loading) return <PageLoading />;
  else if (error) {
    return <div>エラーがおきました、しばらくしてから再度お試しください</div>;
  } else return callback(data);
};

export const useIsFetchedStatus = ({
  data,
}: LazyQueryResult<any, OperationVariables>): boolean => {
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (data) setIsFetched(true);
  }, [data]);

  return isFetched;
};
