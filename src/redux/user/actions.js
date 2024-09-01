import { SET_USER_PROFILE } from "../actions";

export const setUserDetails = (payload) => {
  return {
    type: SET_USER_PROFILE,
    payload,
  };
};
