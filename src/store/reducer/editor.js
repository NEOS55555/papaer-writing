import { UPDATE_CHAPTER_LIST, UPDATE_EDITOR_DATA, UPDATE_CHAPTER_EDITOR_BY_LIST, UPDATE_CHAPTER_EDITOR_BY_HTML } from '../actions';
import { ContentUtils } from 'braft-utils'
import { list2html } from '@/common'
// import BraftEditor from 'braft-editor'
import { getNewEditor } from '@/components/Editor/converts'

const initState = {
  isSort: false,
  // chapterList: (chapterList),
  chapterListfForTree: [],
  chapterListEditor: getNewEditor()
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_EDITOR_DATA:
      return {
        ...state,
        ...data,
      }
    case UPDATE_CHAPTER_LIST:
      return {
        ...state,
        chapterList: data,
      }
    case UPDATE_CHAPTER_EDITOR_BY_LIST:
      return {
        ...state,
        // chapterListEditor: ContentUtils.insertHTML(ContentUtils.clear(state.chapterListEditor), list2html(data)),
        chapterListEditor: getNewEditor(list2html(data)),
      }
    case UPDATE_CHAPTER_EDITOR_BY_HTML:
      return {
        ...state,
        chapterListEditor: ContentUtils.insertHTML(ContentUtils.clear(state.chapterListEditor), data),
        // chapterListEditor: BraftEditor.createEditorState(list2html(data)),
      }
    
    default:
      return state
  }
};
