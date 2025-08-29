import { gql } from "@apollo/client/core";
import { useApolloClient, useMutation } from "@apollo/client/react";

/** React component for a uploading a single file. */
export default function UploadFile() {
  const apolloClient = useApolloClient();
  const [mutate] = useMutation<
    {
      singleUpload: {
        id: string;
      };
    },
    {
      file: File;
    }
  >(mutation);

  return (
    <input
      type="file"
      required
      onChange={async ({ target: { validity, files } }) => {
        if (validity.valid && files?.[0]) {
          await mutate({
            variables: {
              file: files[0],
            },
          });

          apolloClient.resetStore();
        }
      }}
    />
  );
}

const mutation = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;
