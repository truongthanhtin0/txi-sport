import {
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  SET_ACCOUNT,
  GET_LIST_ACCOUNT_SUCCESS,
  GET_LIST_ACCOUNT_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../constants";

const initialState = {
  account: {},
  createList: {},
  getList: [],
  info: {},
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT: {
      return {
        ...state,
        account: {...action.payload},
      };
    }
    case CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        createList: {...action.payload},
      };
    }
    case CREATE_ACCOUNT_FAIL: {
      return state;
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        info: {...action.payload},
      };
    }
    case LOGIN_FAIL: {
      return state;
    }
    case GET_LIST_ACCOUNT_SUCCESS: {
      return {
        ...state,
        getList: action.payload,
      };
    }
    case GET_LIST_ACCOUNT_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}
