import { gql } from "@apollo/client/core";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { useState } from "react";

/** React component for a uploading a blob. */
export default function UploadBlob() {
  const apolloClient = useApolloClient();
  const [mutate, { loading }] = useMutation<
    {
      singleUpload: {
        id: string;
      };
    },
    {
      file: Blob;
    }
  >(mutation);

  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        await mutate({
          variables: {
            file:
              // Tip: To avoid the upload default file name `blob`, replace the
              // `Blob` approach with `File`:
              // new File(
              //   [value],
              //   // Custom file name.
              //   "text.txt",
              //   {
              //     type: "text/plain",
              //   },
              // ),
              new Blob([value], {
                type: "text/plain",
              }),
          },
        });

        apolloClient.resetStore();
      }}
    >
      <fieldset>
        <legend>File content</legend>
        <textarea
          placeholder="File content"
          required
          value={value}
          onChange={({ target: { value } }) => {
            setValue(value);
          }}
        />
      </fieldset>
      <button type="submit" disabled={loading}>
        {loading ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}

const mutation = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;
