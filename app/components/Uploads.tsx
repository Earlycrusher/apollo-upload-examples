import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";

/** React component for displaying uploads. */
export default function Uploads() {
  const { data: { uploads = [] } = {} } = useQuery<{
    uploads: Array<{
      id: string;
      url: string;
    }>;
  }>(uploadsQuery);

  return (
    <ul>
      {uploads.map(({ id, url }) => (
        <li key={id}>{url}</li>
      ))}
    </ul>
  );
}

const uploadsQuery = gql`
  query uploads {
    uploads {
      id
      url
    }
  }
`;
