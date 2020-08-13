import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Button, Select, Input, message } from 'antd';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Table from 'braft-extensions/dist/table'
import rangy from 'rangy'
import $ from 'jquery'

import { updateEditorData } from '@/store/actions'
import { toggleWrapperByKey, dispatchSearchList, dispatchIntelList, dispatchGenPaper } from '@/store/actions'
// import { editorToolbarList } from '@/constants'
import { json2list, eventBus, getBase64 } from '@/common'

import Toolbar from './Toolbar'
import GlobalBar from './GlobalBar'

import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'

import { getNewEditor, blockRendererFn, blockImportFn, blockExportFn, getErrorArr } from './converts'

// import { convertRawToEditorState } from 'braft-convert'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-php'
import './index.scss'

// **************
const options = {
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2'],  // 指定该模块对哪些BraftEditor无效
  theme: 'light', // 指定取色器样式主题，支持dark和light两种样式
}
// 通过opitons.
const codeOptions = {
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Java',
      syntax: 'java',
    }, {
      name: 'PHP',
      syntax: 'php'
    }
  ]
}
const tableOptions = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
}
BraftEditor.use(Table(tableOptions))
BraftEditor.use(ColorPicker(options))
BraftEditor.use(CodeHighlighter(codeOptions))

// const controls = ['bold', 'blockquote', 'italic', '']
const excludeControls = ['emoji', 'font-size', 'line-height', /*'headings',*/ 'hr', 'media', 'letter-spacing']

class Index extends Component {
	
	toolbar = createRef(null);
  editorInstance = createRef(null)
	selectedRang = null;
  currentSelect = null;
  // <p class="split">---</p>  // 分割线
  insertData = (text) => {
    if (!text || typeof text !== 'string') {
      message.error('请选择要插入的内容！')
      return
    }
    // 因为有个拖拽功能，所以数据不可能这么写，应该是
    if (!this.currentSelect || !this.currentSelect.collapsed) {      // 这里可以往最后面添加
      message.error('请选择要插入的位置！')
      return;
    }

    this.props.updateEditorData({
      chapterListEditor: ContentUtils.insertHTML(this.props.chapterListEditor, `<p>${text}</p>`)
    })
  }
  replaceData = (text) => {
    if (!text || typeof text !== 'string') {
      message.error('请选择要替换的内容！')
      return
    }
    // 因为有个拖拽功能，所以数据不可能这么写，应该是
    if (!this.currentSelect) {      // 这里可以往最后面添加
      message.error('请选择要替换的范围！')
      return;
    }

    this.props.updateEditorData({
      chapterListEditor: ContentUtils.insertHTML(this.props.chapterListEditor, `<p>${text}</p>`)
    })
    /*this.setState({
      editorState: ContentUtils.insertHTML(this.state.editorState, '<p><p>我是插入的</p><p>我是插入的2</p>', this.currentSelect)
    })*/
    this.currentSelect = null;
  }
  // 替换错误数据
  replaceErrorData = (key, isUnstyle, errindex) => {
    const editorState = this.props.chapterListEditor;
    const json = editorState.toRAW(true)
    let { blocks } = json

    let someone = blocks.find(it => it.key === key);

    const iscord = JSON.parse(someone.data.iscord || '[]')
    const ignor = JSON.parse(someone.data.ignor || '[]')
    // console.log(someone)
    if (isUnstyle) {  // 不纠正，也就是忽略
      ignor.push(errindex)
      someone.data.ignor = JSON.stringify(ignor)
    } else {
      iscord.push(errindex)
      someone.data.iscord = JSON.stringify(iscord)
    }
    const arr = getErrorArr(someone.data.allstr, someone.data.err, someone.data.cor)
    const isAllClear = ignor.concat(iscord).length === arr.filter(it => it.index !== undefined).length
    if (isAllClear) {
      someone.type = 'unstyled';
      someone.text = arr.map((it, idx) => {
        if (it.text === it.err) {
          if (ignor.indexOf(it.index) !== -1) {
            return it.text
          } else if (iscord.indexOf(it.index) !== -1) {
            return it.cor;
          }
        } else {
          return it.text
        }
      }).join('')
    }
    // setEditorState(json)
    // someone.type = 'unstyled';
    this.props.updateEditorData({ chapterListEditor: getNewEditor(json) })
  }
  // 删除图片
  removeImgBlock = (key) => {
    const editorState = this.props.chapterListEditor;
    const json = editorState.toRAW(true)
    let { blocks } = json

    // 这种写法是有bug的，如何错误的不是中间的怎么办
    // let someone = blocks.find(it => it.key === key);
    const index = blocks.findIndex(it => it.key === key);
    blocks.splice(index, 1)
    // someone.type = 'unstyled';
    this.props.updateEditorData({ chapterListEditor: getNewEditor(json) })
  }

	componentDidMount () {
    eventBus.on('insertDataToEditor', this.insertData)
    eventBus.on('replaceDataToEditor', this.replaceData)
    eventBus.on('replaceErrorData#red', this.replaceErrorData)
    eventBus.on('removeImgBlock#rib', this.removeImgBlock)
    Toolbar.setClick(this.barClick)
    this.props.dispatchGenPaper();
    // console.log(rangy)
	}
  
	exportRewriteContent = () => {
		 var rect = {}
      , t = rangy.getSelection();
    try {
       
        var e = t.getRangeAt(0).nativeRange
          , n = e.getBoundingClientRect();
        rect = e.getBoundingClientRect();
       /* var o = document.querySelector('.public-DraftEditor-content')
          , r = document.getElementById("public-DraftEditor-content");
        // rect.leftAddOn = this.lo(r, "padding-left") + this.lo(r, "margin-left");
        var c = o.getBoundingClientRect()
          , l = o.querySelector('div').scrollTop;
        rect.absolute = {
            top: n.top - c.top + l,
            left: n.left - c.left,
            width: n.width,
            height: n.height
        }*/
    } catch (t) {
        console.log("获取toolbar位置失败");
        console.error(t)
    }
    if (t.toString() && t.focusNode && (3 === t.focusNode.nodeType || "P" === t.focusNode.tagName)) {
    	this.rangechange(t, rect)
    } else {
    	document.querySelector('#toolbar').classList.add('hide')
    }
	}

	rangechange = (t, domrect) => {
    const scrollTop = document.querySelector('.bf-content').scrollTop
    const topBarHeight = document.querySelector('.bf-controlbar').offsetHeight
    const ctnWidth = $('.DraftEditor-root')[0].offsetWidth

		const node = document.querySelector('#toolbar')
		node.classList.remove('hide')
		const barWidth = node.offsetWidth;
		const barHeight = node.offsetHeight
    const leftMar = $('.edltleft-nav')[0].offsetWidth
    const leftctnWidth = $('.query-content')[0]?.offsetWidth || 0
    // 180 左右间距
		let l = domrect.left - leftMar - leftctnWidth, w = domrect.width;
		// console.log(barWidth, w, l)
		if (w > barWidth) {
			l += (w - barWidth) / 2
		} else {
			l -= (barWidth - w) / 2
		}
    if (l < 0) {
      l = 0;
    } else if (l > ctnWidth - barWidth) {
      l = ctnWidth - barWidth
    }
		node.style.left = l + 'px';
		node.style.top = domrect.top - barHeight - 12 + scrollTop - topBarHeight + 'px';
		this.selectedRang = t;
		// console.log(t)
	}
  componentWillUnmount () {
    $(document).off('mouseup.editortip')
    $('.public-DraftEditor-content').off('mouseup.editortip')
    eventBus.off('insertDataToEditor')
    eventBus.off('replaceDataToEditor')
  }
  // isShowBar = true;
	renderEditorTip = editorInstance => {
    this.editorInstance = editorInstance
    // convertRawToEditorState
    editorInstance.containerNode.querySelector('.bf-content').appendChild(Toolbar.parentNode)
    $(document).on('mouseup.editortip', (e) => {
      if ($(e.target).parents('.editor-container').length > 0) {
        return;
      }
      document.querySelector('#toolbar').classList.add('hide')
    })
    
		$('.public-DraftEditor-content').on('mouseup.editortip', (e) => {
			// e.stopPropagation()
      // this.isShowBar = true;
      const sect = rangy.getSelection();
      // console.log(sect)
      // console.log(rangy.getSelection())
      this.currentSelect = sect.getRangeAt(0)
      // console.log(this.currentSelect)
			this.exportRewriteContent()
		})
    
	}

	barClick = data => {
    const { toggleWrapperByKey, dispatchSearchList, dispatchIntelList } = this.props;

    document.querySelector('#toolbar').classList.remove('hide')
		const range = this.selectedRang.getRangeAt(0);
		this.selectedRang.removeAllRanges()
		this.selectedRang.addRange(range)
    const { key } = data;
    const keywrod = this.selectedRang.toString()
    switch (key) {
      case 'search': dispatchSearchList({ keywrod });break;
      case 'rewrite': dispatchIntelList({ keywrod });break;
      default: break;
    }
    toggleWrapperByKey(key);
    // console.log(this.selectedRang)
    // console.log(data, this.selectedRang.toString())
    
	}
  editorTimer = null;
  editorChange = chapterListEditor => {
    const { isSort, updateEditorData } = this.props;
    clearTimeout(this.editorTimer);
    if (isSort) {
      return
    }
    this.editorTimer = setTimeout(() => {
      console.log('ccccc')
      // console.log(chapterListEditor.toRAW(true).blocks)
      // chapterListfForTree 这一个数据就可以做完所有的事情了
      const chapterListfForTree = json2list(chapterListEditor.toRAW(true).blocks)
      updateEditorData({ chapterListEditor, /*chapterList: chapterListfForTree,*/ chapterListfForTree })
    }, 300)
    // 这里可以连续插入，所以看是否有必要这么写
    /*const sect = window.getSelection();
    if (sect.focusNode) {
      this.currentSelect = sect.getRangeAt(0)
    }*/
  }
  insertImg = (imgbase) => {
    // console.log('sss')
    // const { chapterListEditor, updateEditorData } = this.props;
    
    const imgHstr = `<p class="img-block-show">imgbase-split</p>`
    this.props.updateEditorData({
      chapterListEditor: ContentUtils.insertHTML(this.props.chapterListEditor, `<p>${imgHstr}</p>`)
    })
    setTimeout(() => {
      let html = this.props.chapterListEditor.toHTML();
      console.log(html)
      // const reg = new RegExp(`(${getImgBlockShow(html).map(it => `<p class="img-block-show">${it}</p>`).join('|')})`, 'ig')
      html = html.replace(imgHstr, `<div class="my-block-img" data-src="${imgbase}"></div>`)

      this.props.updateEditorData({
        chapterListEditor: getNewEditor(html)
      })
    }, 16)
    /*// 使用ContentUtils.insertMedias来插入媒体到editorState
    const editorState = ContentUtils.insertMedias(this.state.editorState, [
      {
        type: 'IMAGE',
        url: 'https://margox.cn/wp-content/uploads/2017/05/IMG_4995-480x267.jpg'
      }
    ])

    // 更新插入媒体后的editorState
    this.setState({ editorState })*/

  }
	render () {
    // const { editorState } = this.state;
    const { chapterListEditor, isSort } = this.props;
    const extendControls = [
      
      {
        key: 'my-component',
        type: 'component',
        component: <UploadImg onFileChange={imgbase => this.insertImg(imgbase)} />
      }
    ]
		return (
			<div className="editor-container" >
        <div className="editor-ctn">
  				<BraftEditor 
            disabled={isSort}
            className="xz-editor"
            contentClassName="xz-editor-content"
  					excludeControls={excludeControls}
            extendControls={extendControls}
  					ref={this.renderEditorTip} 
  					value={chapterListEditor} 
            onChange={this.editorChange}
            blockRendererFn={blockRendererFn}
            converts={{ blockImportFn, blockExportFn }}
            // ref={this.editorInstance}
  				/>
          <GlobalBar />
          <div className="test">
            <Button onClick={() => {
              console.log(chapterListEditor.toHTML(), chapterListEditor.toRAW(true))
              console.log(json2list(chapterListEditor.toRAW(true).blocks))
              // console.log(BraftEditor.createEditorState(chapterListEditor.toRAW(true)).toHTML())

            }}>获取数据</Button>
            <Button onClick={() => {
              // this.replaceData('<p>我呢同情你问他</p>')
              /*const rang = window.getSelection().getRangeAt(0)
              const { startContainer, endContainer } = rang;
              $(startContainer).parents('[data-block]')*/
              /*this.setState({
                chapterListEditor: ContentUtils.insertText(chapterListEditor, 'adasfsg', this.currentSelect)
              })*/
              console.log(this.editorInstance)
              console.log(this.currentSelect)
            }} >替换数据</Button>
          </div>
        </div>
			</div>
		)
	}
}
const mapStateToProps = state => {
  const { isSort, chapterListEditor } = state.editor
  // console.log('s')
  return {
    isSort,
    chapterListEditor,
    // chapterList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateEditorData (data) {
      return dispatch(updateEditorData(data))
    },
    dispatchSearchList (params) {
      return dispatch(dispatchSearchList(params))
    },
    dispatchIntelList (params) {
      return dispatch(dispatchIntelList(params))
    },
    dispatchGenPaper (params) {
      return dispatch(dispatchGenPaper(params))
    },
    toggleWrapperByKey (params) {
      return dispatch(toggleWrapperByKey(params))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);


class UploadImg extends Component {
  fileInput = createRef();
  fileChange = e => {
    const [file] = e.target.files;
    if (!file) {
      return
    }
    if (file.type.indexOf('image') === -1) {
      return message.error('请选择图片!')
    }
    getBase64(file).then(res => {
      this.props.onFileChange(res)
      this.fileInput.current.setAttribute('type', 'text');
      this.fileInput.current.setAttribute('type', 'file');
    })
  }
  render () {
    return (
      <Fragment>
        <label className="control-item button" htmlFor="imgfile" style={{display: 'flex', alignItems: 'center'}} >插入图片</label>
        <input ref={this.fileInput} onChange={this.fileChange} type="file" id="imgfile" style={{display: 'none'}} />
      </Fragment>
    )
  }
}