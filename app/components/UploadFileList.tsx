import { gql } from "@apollo/client/core";
import { useApolloClient, useMutation } from "@apollo/client/react";

/** React component for a uploading a file list. */
export default function UploadFileList() {
  const apolloClient = useApolloClient();
  const [mutate] = useMutation<
    {
      multipleUpload: Array<{
        id: string;
      }>;
    },
    {
      files: FileList;
    }
  >(mutation);

  return (
    <input
      type="file"
      multiple
      required
      onChange={async ({ target: { validity, files } }) => {
        if (validity.valid && files?.[0]) {
          await mutate({
            variables: {
              files,
            },
          });

          apolloClient.resetStore();
        }
      }}
    />
  );
}

const mutation = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
    }
  }
`;
