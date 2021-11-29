const initialState = {
  isLogin: true,
  user: null,
  feeds: [],
  myFeeds: [],
  feedMostlyViewed: [],
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
