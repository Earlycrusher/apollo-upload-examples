import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import UPLOAD_DIRECTORY_URL from "../constants/UPLOAD_DIRECTORY_URL.mts";

export default new GraphQLObjectType({
  name: "File",
  description: "A stored file.",
  fields: () => ({
    id: {
      description: "Unique ID.",
      type: new GraphQLNonNull(GraphQLID),
      resolve: (storedFileName) => storedFileName,
    },
    name: {
      description: "File name.",
      type: new GraphQLNonNull(GraphQLString),
      resolve: (storedFileName) => storedFileName,
    },
    url: {
      description: "File URL.",
      type: new GraphQLNonNull(GraphQLString),
      resolve: (storedFileName) =>
        new URL(storedFileName, UPLOAD_DIRECTORY_URL),
    },
  }),
});
