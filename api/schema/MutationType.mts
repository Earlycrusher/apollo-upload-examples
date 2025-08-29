import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import type { FileUpload } from "graphql-upload/processRequest.mjs";

import storeUpload from "../storeUpload.mts";
import FileType from "./FileType.mts";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    singleUpload: {
      description: "Stores a single file.",
      type: new GraphQLNonNull(FileType),
      args: {
        file: {
          description: "File to store.",
          type: new GraphQLNonNull(GraphQLUpload),
        },
      },
      resolve: (_source, { file }) => storeUpload(file),
    },
    multipleUpload: {
      description: "Stores multiple files.",
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FileType))),
      args: {
        files: {
          description: "Files to store.",
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(GraphQLUpload)),
          ),
        },
      },
      async resolve(_source, { files }: { files: Array<Promise<FileUpload>> }) {
        const storedFileNames: Array<string> = [];

        // Ensure an error storing one upload doesn’t prevent storing the rest.
        for (const result of await Promise.allSettled(files.map(storeUpload)))
          if ("value" in result) storedFileNames.push(result.value);
          // Realistically you would do more than just log an error.
          else console.error(`Failed to store upload: ${result.reason}`);

        return storedFileNames;
      },
    },
  }),
});
