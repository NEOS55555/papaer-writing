import { UPDATE_SEARCH_DATA } from '../actions';
const initState = {
  searchList: [],
  isSearching: false,
  isShowWrapper: false,
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_SEARCH_DATA:
      return {
        ...state,
        ...data
      }
    
    default:
      return state
  }
};
