import { readdir } from "node:fs/promises";

import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";

import UPLOAD_DIRECTORY_URL from "../constants/UPLOAD_DIRECTORY_URL.mts";
import FileType from "./FileType.mts";

export default new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    uploads: {
      description: "All stored files.",
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FileType))),
      resolve: () => readdir(UPLOAD_DIRECTORY_URL),
    },
  }),
});
