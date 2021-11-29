const { gql } = require("@apollo/client");

exports.QUERY_ALL_FEEDS = gql`
query MyQuery($offset: Int = 0, $limit: Int = 50) {
  feeds(offset: $offset, limit: $limit, order_by: {created_at: desc}) {
    created_at
    description
    id
    thumbnail
    title
    views
    user {
      fname
      id
    }
    category {
      id
      name
    }
  }
}
`;

exports.QUERY_ALL_FEEDS_MOSTLY_VIEWED= gql`
query MyQuery {
  feeds(limit: 20, order_by: {views: desc}) {
    created_by
    created_at
    id
    thumbnail
    title
    description
    category {
      id
      name
    }
    views
    user {
      fname
      id
    }
  }
}

`;
