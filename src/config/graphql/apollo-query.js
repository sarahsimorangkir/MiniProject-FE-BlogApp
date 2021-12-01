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

exports.QUERY_LOGIN = gql`
query MyQuery($email: String = "", $password: String = "") {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    id
    fname
    email
    password
    role
  }
}
`;

exports.QUERY_REGISTER = gql `
mutation MyMutation($email: String = "", $fname: String = "", $password: String = "") {
  insert_user_one(object: {email: $email, fname: $fname, password: $password, role: 1}) {
    id
    email
    password
    fname
  }
}
`;

exports.QUERY_CREATE_FEEDS = gql `
mutation MyMutation($category_id: Int = 2, $created_by: Int = 2, $description: String = "", $thumbnail: String = "", $title: String = "") {
  insert_feeds_one(object: {category_id: $category_id, created_by: $created_by, description: $description, thumbnail: $thumbnail, title: $title}){
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

exports.QUERY_GET_OWN_ARTICLE = gql `
query MyQuery($id: Int) {
  feeds(where: {created_by: {_eq: $id}}) {
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

exports.QUERY_UPDATE_ARTICLE =gql `
mutation MyMutation($id: Int , $category_id: Int , $description: String = "", $thumbnail: String = "", $title: String = "") {
  update_feeds(where: {id: {_eq: $id}}, _set: {category_id: $category_id, description: $description, thumbnail: $thumbnail, title: $title}) {
    returning {
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
}

`;
