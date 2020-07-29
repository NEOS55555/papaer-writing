import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Button, Select, Input } from 'antd';
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Table from 'braft-extensions/dist/table'
import rangy from 'rangy'
import $ from 'jquery'

import { updateEditorData } from '@/store/actions'
import { html2list } from '@/common'

import Toolbar from './Toolbar/index.js'
import { ContentUtils } from 'braft-utils'
// import { convertRawToEditorState } from 'braft-convert'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-php'
import './index.scss'

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
const excludeControls = ['emoji', 'font-size', 'line-height', /*'headings',*/ 'hr', /*'media',*/ 'letter-spacing']

class Index extends Component {
	
	toolbar = createRef(null);
	selectedRang = null;
  // <p class="split">---</p>  // 分割线
  insertOneData = () => {

    // 因为有个拖拽功能，所以数据不可能这么写，应该是
    if (!this.currentSelect) {      // 这里可以往最后面添加
      return;
    }

    this.props.updateEditorData({
      chapterListEditor: ContentUtils.insertHTML(this.props.chapterListEditor, '<p><p>我是插入的</p><p>我是插入的2</p>', this.currentSelect)
    })
    /*this.setState({
      editorState: ContentUtils.insertHTML(this.state.editorState, '<p><p>我是插入的</p><p>我是插入的2</p>', this.currentSelect)
    })*/
    this.currentSelect = null;
    
  }
	componentDidMount () {
    Toolbar.setClick(this.barClick)
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
		let l = domrect.left - leftMar, w = domrect.width;
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
  }
  // isShowBar = true;
	renderEditorTip = ctnNode => {
    // convertRawToEditorState
    ctnNode.containerNode.querySelector('.bf-content').appendChild(Toolbar.parentNode)
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
    document.querySelector('#toolbar').classList.remove('hide')
		const range = this.selectedRang.getRangeAt(0);
		this.selectedRang.removeAllRanges()
		this.selectedRang.addRange(range)


    // console.log(this.selectedRang)
    console.log(data, this.selectedRang.toString())
    
	}
  editorTimer = null;
  editorChange = chapterListEditor => {
    const { isSort, updateEditorData } = this.props;
    clearTimeout(this.editorTimer);
    if (isSort) {
      return
    }
    this.editorTimer = setTimeout(() => {
      const chapterList = html2list(chapterListEditor.toRAW(true).blocks)
      console.log(chapterList)
      updateEditorData({ chapterListEditor, chapterList, chapterListfForTree: chapterList })
    }, 300)
    // this.props.updateEditorData({ chapterListEditor, chapterList })
    // this.setState({ editorState })
    const sect = window.getSelection();
    if (sect.focusNode) {
      this.currentSelect = window.getSelection().getRangeAt(0)
    }
  }
	render () {
    // const { editorState } = this.state;
    const { chapterListEditor, isSort } = this.props;
		return (
			<div className="editor-container" >
				{/*<Toolbar className="hide" ref={this.toolbar} onClick={this.barClick} />
				<div id="toolbar" ref={this.toolbar} >asdfasadgsd</div>*/}
				<BraftEditor 
          disabled={isSort}
					excludeControls={excludeControls}
					ref={this.renderEditorTip} 
					value={chapterListEditor} 
          onChange={this.editorChange}
				/>
        <Button onClick={this.insertOneData}>插入一条数据</Button>
        <Button onClick={() => {
          console.log(chapterListEditor.toHTML(), chapterListEditor.toRAW(true))
          console.log(this.props.chapterList)
          // console.log(BraftEditor.createEditorState(chapterListEditor.toRAW(true)).toHTML())

        }}>获取数据</Button>
			</div>
		)
	}
}
const mapStateToProps = state => {
  const { isSort, chapterListEditor, chapterList } = state.editor
  // console.log('s')
  return {
    isSort,
    chapterListEditor,
    chapterList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateEditorData (data) {
      return dispatch(updateEditorData(data))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);