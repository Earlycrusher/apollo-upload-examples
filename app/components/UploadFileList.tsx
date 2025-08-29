import { gql } from "@apollo/client/core";
import { useApolloClient, useMutation } from "@apollo/client/react";

/** React component for a uploading a file list. */
export default function UploadFileList() {
  const apolloClient = useApolloClient();
  const [mutate, { loading }] = useMutation<
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
      disabled={loading}
      onChange={async ({ target: { validity, files } }) => {
        if (validity.valid && files?.length) {
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
