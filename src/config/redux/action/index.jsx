import client from "../../graphql/apollo-client";
import {
  QUERY_ALL_FEEDS,
  QUERY_ALL_FEEDS_MOSTLY_VIEWED,
  QUERY_LOGIN,
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
          localStorage.setItem("user-login", JSON.stringify(result.data.user[0]))
          
          resolve(200);
        } else {
          dispatch({ type: "CHANGE_LOGIN", value: false });
          dispatch({ type: "CHANGE_USER", value: null });
          localStorage.removeItem("user-login")
          reject(401);
        }
      })
      .catch((err) => {
          console.log(err)
        dispatch({ type: "CHANGE_LOGIN", value: false });
        dispatch({ type: "CHANGE_USER", value: null });
        localStorage.removeItem("user-login")
        reject(500);
      });
  });
};
