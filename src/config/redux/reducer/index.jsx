const initialState = {
  isLogin: localStorage.getItem("user-login") ? true : false,
  user: localStorage.getItem("user-login")
    ? JSON.parse(localStorage.getItem("user-login"))
    : null,
  feeds: [],
  myFeeds: [],
  feedMostlyViewed: [],
  ownArticle: [],
};

const listAction = [
  // change login
  {
    type: "CHANGE_LOGIN",
    name: "isLogin",
    action: null,
  },
  //change feeds mostly viewed
  {
    type: "CHANGE_FEEDS_MOSTLY_VIEWED",
    name: "feedMostlyViewed",
    action: null,
  },
  // change blog
  {
    type: "CHANGE_FEEDS",
    name: "feeds",
    action: null,
  },

  // change myblogs
  {
    type: "CHANGE_MYFEEDS",
    name: "myFeeds",
    action: null,
  },
  // change user
  {
    type: "CHANGE_USER",
    name: "user",
    action: (state, actions) => {
      state.user = actions.value;
      return {
        ...state,
      };
    },
  },

  // change register
  {
    type: "CHANGE_REGISTER",
    name: "insert_user_one",
    action: (state, actions) => {
      state.insert_user_one = actions.value;
      return {
        ...state,
      };
    },
  },
  //Add Feeds

  {
    type: "ADD_FEEDS",
    name: "feeds",
    action: (state, actions) => {
      state.feeds.push(actions.value);
      return {
        ...state,
      };
    },
  },
  //Change Own Article
  {
    type: "CHANGE_OWN_ARTICLE",
    name: "ownArticle",
    action: null,
  },
  //Update Feeds
  {
    type: "UPDATE_FEEDS",
    name: "ownArticle",
    action: (state, actions) => {
      let temp = [...state.ownArticle];
      temp[actions.index] = actions.value;
      state.ownArticle = temp;
      return {
        ...state,
      };
    },
  },
];

const reducer = (state = initialState, actions) => {
  let found = listAction.find((item) => {
    return item.type === actions.type;
  });
  if (found !== null && found !== undefined) {
    if (found.action !== null) {
      return {
        ...found.action(state, actions),
      };
    }
    state[found.name] = actions.value;
    return {
      ...state,
    };
  }
  return state;
};

export default reducer;
