import { GraphQLSchema } from "graphql";

import MutationType from "./MutationType.mts";
import QueryType from "./QueryType.mts";

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
