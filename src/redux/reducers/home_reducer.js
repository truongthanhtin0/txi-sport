import {GET_HOME_SUCCESS, GET_HOME_FAIL, SET_COLLECTION} from "../constants";

const initialState = {
  homeData: {},
  collection: {},
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOME_SUCCESS: {
      return {
        ...state,
        homeData: {...action.payload},
      };
    }
    case GET_HOME_FAIL: {
      return state;
    }
    case SET_COLLECTION: {
      return {
        ...state,
        collection: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
