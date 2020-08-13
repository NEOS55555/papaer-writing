import QcModal from './QcModal'
import CorrModal from './CorrModal'
// 每个章节之间的分段
/*export const SPLIT_LINE = '<p class="editor-chapter-split-q864756"></p>';
export const getSplitChildLine = i => '<p class="editor-child-split-q2556872'+i+'"></p>';*/

export const editorToolbarList = [
  {
    key: 'search',
    name: '搜索'
  },
  /*{
    key: 'material',
    name: '找素材'
  },
  {
    key: 'anthology',
    name: '找文集'
  },*/
  {
    key: 'rewrite',
    name: '智能改写'
  },
  {
    key: 'collect',
    name: '收藏'
  }
]

export const globalBar = [
  {
    key: 'qc',
    Component: QcModal
    // name: '质量控制'
  },
  {
    key: 'correct',
    Component: CorrModal
    // name: '智能纠错'
  },
  {
    key: 'summary',
    name: '文本摘要'
  },
  {
    key: 'reference',
    name: '参考文献'
  },
  {
    key: 'exporttype',
    name: '导出格式'
  }
]


export const paperTypeOptions = [
  {id: 0, name: '本科论文'},
  {id: 1, name: '硕士论文'},
  {id: 2, name: '期刊论文'},
]
// 错误分割线
export const ERROR_SPLIT = ';'
