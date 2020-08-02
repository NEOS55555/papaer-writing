import { UPDATE_SEARCH_DATA, SHOW_SEARCH_WRAPPER_BY_KEY } from '../actions';
import { editorToolbarList } from '@/constants'

const searchInit = {}
editorToolbarList.slice(0, editorToolbarList.length - 2).forEach(it => searchInit[it.key] = false)
function transkey (key) {
  return {
    ...searchInit,
    [key]:  true
  }
}

const initState = {
  searchList: [],  // 搜索列表
  intelList: [],    // 智能改写列表 {text, type}
  isSearching: false,
  isShowWrapper: {
    ...searchInit   
  }
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_SEARCH_DATA:
      return {
        ...state,
        ...data
      }
    case SHOW_SEARCH_WRAPPER_BY_KEY:

      return {
        ...state,
        isShowWrapper: {
          ...transkey(data)
        }
      }
    
    default:
      return state
  }
};
