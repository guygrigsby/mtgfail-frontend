import { combineReducers } from "redux";
import { ADD_BLOB, SET_VISIBILITY_FILTER, VisibilityFilters } from "./actions";
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function cardStore(state = [], action) {
  switch (action.type) {
    case ADD_BLOB:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];

    default:
      return state;
  }
}

const store = combineReducers({
  visibilityFilter,
  cardStore
});

export default store;
