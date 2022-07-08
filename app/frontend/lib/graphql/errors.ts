export interface GraphQLError {
  graphQLErrors?: {
    message: string;
    extensions?: {
      code: string;
    };
  }[];
}

export const isNotFoundError = (err: GraphQLError): boolean => {
  const graphQLErrors = err.graphQLErrors;
  if (graphQLErrors == null) return false;

  return graphQLErrors[0]?.extensions?.code === "NOT_FOUND";
};
