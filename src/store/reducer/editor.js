import { UPDATE_CHAPTER_LIST, UPDATE_EDITOR_DATA, UPDATE_CHAPTER_EDITOR } from '../actions';
import { ContentUtils } from 'braft-utils'
import BraftEditor from 'braft-editor'
import { list2html } from '@/common'
let id = 0;

let chapterList = [
  { chapter: '引言',text:'<p>智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。</p>', id: id++},
  { chapter: '第一章',text:'<p>功能；功能 qengq阿萨德发沙师弟噶事对噶十多个阿萨德噶十多个。</p>', id: id++ ,
    children: [
      { chapter: '第一章-1',text:'<p>1.1</p>', id: id++ },
      { chapter: '第一章-2',text:'<p>1.2</p>', id: id++ },
      { chapter: '第一章-3',text:'<p>1.3,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
      { chapter: '第一章-4',text:'<p>1.4,智慧图书馆的发展值得期待[10]。</p>', id: id++ ,
        children: [
          { chapter: '第一章-4-1',text:'<p>1.4.1,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
          { chapter: '第一章-4-2',text:'<p>1.4.2,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
          { chapter: '第一章-4-3',text:'<p>1.4.3,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
          { chapter: '第一章-4-4',text:'<p>1.4.4,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
        ]
      },
    ]
  },
  { chapter: '第二章',text:'<p>功能；功能 qengq阿萨德发沙师弟噶事对噶十多个阿萨德噶十多个。</p>', id: id++}
]

function mm (arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    arr[i].title = arr[i].chapter
    arr[i].expanded = true
    // arr[i].
    if (arr[i].children) {
      mm(arr[i].children)
    }
  }
  return arr;
}


const initState = {
  isSort: false,
  chapterList: (chapterList),
  chapterListfForTree: mm(chapterList),
  chapterListEditor: BraftEditor.createEditorState(list2html(chapterList))
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
    case UPDATE_CHAPTER_EDITOR:
      return {
        ...state,
        chapterListEditor: ContentUtils.insertHTML(ContentUtils.clear(state.chapterListEditor), list2html(data)),
        // chapterListEditor: BraftEditor.createEditorState(list2html(data)),
      }
    
    default:
      return state
  }
};
