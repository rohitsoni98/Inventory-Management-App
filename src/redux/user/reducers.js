import { SET_USER_PROFILE } from "../actions";

const INIT_STATE = { user: { isUser: false } };

const reducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_PROFILE:
      return payload;
    default:
      return { ...state };
  }
};

export default reducer;
