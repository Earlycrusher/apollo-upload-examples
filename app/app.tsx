import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UploadBlob from "./components/UploadBlob.js";
import UploadFile from "./components/UploadFile.js";
import UploadFileList from "./components/UploadFileList.js";
import Uploads from "./components/Uploads.js";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new UploadHttpLink({
    uri: "http://localhost:3001/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <h1>Apollo upload examples</h1>
      <section>
        <h2>
          Upload <code>FileList</code>
        </h2>
        <UploadFileList />
      </section>
      <section>
        <h2>
          Upload <code>File</code>
        </h2>
        <UploadFile />
      </section>
      <section>
        <h2>
          Upload <code>Blob</code>
        </h2>
        <UploadBlob />
      </section>
      <section>
        <h2>Uploads</h2>
        <Uploads />
      </section>
    </ApolloProvider>
  </StrictMode>,
);
