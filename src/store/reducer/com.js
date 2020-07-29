// import { SET_USER_NAME, UPDATE_COM_DATA, SET_REPLY_NUM } from '../actions';
const initState = {
  // ip: '',
};

export default (state = initState, {type, data}) => {
  switch (type) {
    /*case UPDATE_COM_DATA:
      return {
        ...state,
        ...data
      }
    case SET_USER_NAME: 
      return {
        ...state,
        user_name: data
      }
    case SET_REPLY_NUM: 
      return {
        ...state,
        check_reply_num: data
      }*/
    default:
      return state
  }
};
