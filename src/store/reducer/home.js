import { UPDATE_HOME_DATA } from '../actions';
const initState = {
  paperTypeId: 0,  // 论文类型
  school: '',  //学校
  major: '',   // 专业
  researchFieldId1: -1,  //研究领域
  researchFieldId2: -1,  //研究领域
  researchFieldId3: -1,  //研究领域
  researchFieldOpts1: [],
  researchFieldOpts2: [],
  researchFieldOpts3: [],
  keywords: '', 

  // page1
  // 提名
  title: '',
  // 摘要
  summary: '',
  
  // page2
  // 标题列表
  chapterList: [],
  // 主题列表
  sbujectList: [],
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_HOME_DATA:
      return {
        ...state,
        ...data
      }
    default:
      return state
  }
};
