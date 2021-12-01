import client from "../../graphql/apollo-client";
import {
  QUERY_ALL_FEEDS,
  QUERY_ALL_FEEDS_MOSTLY_VIEWED,
  QUERY_CREATE_FEEDS,
  QUERY_GET_OWN_ARTICLE,
  QUERY_LOGIN,
  QUERY_REGISTER,
  QUERY_UPDATE_ARTICLE,
} from "../../graphql/apollo-query";

export const actionChangeGlobalRedux = (data) => {
  return (dispatch) => {
    return dispatch({ type: data.type, value: data.value });
  };
};

export const actionGetAllFeeds = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: QUERY_ALL_FEEDS,
        variables: { limit: data.limit, offset: data.offset },
      })
      .then((result) => {
        dispatch({ type: "CHANGE_FEEDS", value: result.data.feeds });
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const actionGetAllFeedsMostlyViewed = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    client
      .query({ query: QUERY_ALL_FEEDS_MOSTLY_VIEWED })
      .then((result) => {
        dispatch({
          type: "CHANGE_FEEDS_MOSTLY_VIEWED",
          value: result.data.feeds,
        });
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const actionLogin = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: QUERY_LOGIN,
        variables: { email: data.email, password: data.password },
      })
      .then((result) => {
        if (result.data.user.length > 0) {
          dispatch({ type: "CHANGE_LOGIN", value: true });
          dispatch({ type: "CHANGE_USER", value: result.data.user[0] });
          localStorage.setItem(
            "user-login",
            JSON.stringify(result.data.user[0])
          );

          resolve(200);
        } else {
          dispatch({ type: "CHANGE_LOGIN", value: false });
          dispatch({ type: "CHANGE_USER", value: null });
          localStorage.removeItem("user-login");
          reject(401);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CHANGE_LOGIN", value: false });
        dispatch({ type: "CHANGE_USER", value: null });
        localStorage.removeItem("user-login");
        reject(500);
      });
  });
};

export const actionRegister = (data) => (dispatch) => {
  console.log("actt");
  return new Promise((resolve, reject) => {
    client
      .mutate({
        mutation: QUERY_REGISTER,
        variables: {
          fname: data.fname,
          email: data.email,
          password: data.password,
        },
      })
      .then((result) => {
        dispatch({ type: "CHANGE_LOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: result.data.insert_user_one });
        localStorage.setItem(
          "user-login",
          JSON.stringify(result.data.insert_user_one)
        );
        resolve(200);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CHANGE_LOGIN", value: false });
        dispatch({ type: "CHANGE_USER", value: null });
        localStorage.removeItem("user-login");
        reject(500);
      });
  });
};

export const actionCreateBlog = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    client
      .mutate({
        mutation: QUERY_CREATE_FEEDS,
        variables: {
          category_id: Number(data.category_id),
          created_by: Number(data.created_by),
          thumbnail: data.thumbnail,
          title: data.title,
          description: data.description,
        },
      })
      .then((result) => {
        console.log("calling");
        dispatch({ type: "ADD_FEEDS", value: result.data.insert_feeds_one });
        resolve(200);
      })
      .catch((err) => {
        console.log(err);
        reject(500);
      });
  });
};

export const actionOwnArticle = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: QUERY_GET_OWN_ARTICLE,
        variables: {
          created_at: data.created_at,
          description: data.description,
          id: Number(data.id),
          thumbnail: data.thumbnail,
          title: data.title,
          views: Number(data.views),
        },
      })
      .then((result) => {
        dispatch({ type: "CHANGE_OWN_ARTICLE", value: result.data.feeds });
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const actionUpdateArticle = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    client
      .mutate({
        mutation: QUERY_UPDATE_ARTICLE,
        variables: {
          id: Number(data.id),
          category_id: Number(data.category_id),
          thumbnail: data.thumbnail,
          title: data.title,
          description: data.description,
        },
      })
      .then((result) => {
        dispatch({
          type: "UPDATE_FEEDS",
          value: result.data.update_feeds.returning[0],
          index: data.index,
        });
        resolve(200);
      })
      .catch((err) => {
        reject(500);
      });
  });
};
