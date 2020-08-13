import 'braft-editor/dist/index.css'
import React, { createRef, Component } from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import Immutable from 'immutable'
import { Popover,  } from 'antd'
import './index.scss'
import { eventBus, setEditorImgMap, getEditorImgMap } from '@/common'
import $ from 'jquery'
import { ERROR_SPLIT } from '@/constants'
/*function getEditorState () {

}

function setEditorState() {}*/

// 使用blockRenderMap定义一个新的block类型：block-foo

/*// 定义block-foo在编辑器中的渲染组件
const FooBlockElement = (props) => {
  return <div className="foo-block-element">{props.children}</div>
}

// 定义block-foo的容器组件，用于包裹单个独立或多个连续的block-foo，这一项是可选的
const FooBlockWrapper = (props) => {
  return <div className="foo-block-wrapper">{props.children}</div>
}*/

// 声明blockRenderMap
// 此处注意：
// 1: element属性是一个未渲染的React组件，或者是一个有效的html标签字符串，如"div","aside","section"等
// 2: wrapper属性需要是一个已渲染的React组件，用于包裹单个独立或多个连续的element，这一项是可选的
/*const blockRenderMap = Immutable.Map({
  'block-foo': {
    element: FooBlockElement,
    wrapper: <FooBlockWrapper />
  }
})*/

// *******分割线******

// 使用blockRendererFn定义一个新的block类型: block-bar

// 定义block-bar在编辑器中的渲染组件
// 错误修改组件
class Error2Cor extends Component {
  render () {
    const { cor, err } = this.props
    return (
      <Popover
        content={
          <div>
            <button className="button-remove" onClick={() => this.props.removeBarBlock(false, this.props.errindex)}>
              {cor}
            </button>
            <button className="button-remove" onClick={() => this.props.removeBarBlock(true, this.props.errindex)}>
              忽略
            </button>
          </div>
        }
        // title="请选择进入的组织部门："
        trigger="click"
        // visible={this.state.visible}
        placement={'bottom'}
        // onClick={this.removeBarBlock}
        // onVisibleChange={this.handleVisibleChange}
      >
        <span className="correct-btn">{err}</span>
      </Popover>
    )
  }
}

function getErrorArr (allstr, err, cor) {
  let countdx = 0;
  if (!err || !cor) {
    return [];
  }
  function getOneTextErr (text, error, cor, arr=[]) {
    const tIdx = text.indexOf(error)
    if (tIdx !== -1) {
      let prevText = text.slice(0, tIdx)
      let nextText = text.slice(tIdx + error.length)
      // 前面
      if (prevText.indexOf(error) !== -1) {
        getOneTextErr(prevText, error, cor, arr)
      } else {
        arr.push(
          {
            text: prevText,
          }
        )
      }
      // 中间-错误
      arr.push(
        {
          text: error,
          err: error,
          index: countdx++,
          cor
        }
      )
      
      // 后面
      if (nextText.indexOf(error) !== -1) {
        getOneTextErr(nextText, error, cor, arr)
      } else {
        arr.push(
          {
            text: nextText,
          }
        )
      }
    }
    return arr;
  }
  function getBarJson (arr, error, correct) {
    let newArr = [];

    arr.forEach(it => {
      if (it.index !== undefined) {
        newArr.push(it)
      } else {
        let arr = getOneTextErr(it.text, error, correct)
        // console.log(arr)
        if (arr.length === 0) {
          newArr.push(it)
        } else {
          newArr = newArr.concat(arr)
        }
      }
    })
    return newArr
  }
  // **************
  const errArr = err.split(ERROR_SPLIT)
  const corArr = cor.split(ERROR_SPLIT)
  // console.log(blockData.get('modify'))
  const modify = errArr.map((it, idx) => ({err: it, cor: corArr[idx]}))
  let arr = [{text: allstr}];
  modify.forEach(it => {
    arr = getBarJson(arr, it.err, it.cor)
    // console.log(arr)
  })
  return arr;
}

class BarBlockComponent extends Component {
 
  // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
  removeBarBlock = (isUnstyle, errindex) => {
    /*const editorState = (getEditorState())
    const json = editorState.toRAW(true)
    let { blocks } = json
    // console.log(blocks)
    let someone = blocks.find(it => it.key ===this.props.block.key);*/
    eventBus.emit('replaceErrorData#red', this.props.block.key, isUnstyle, errindex)
    
    // setEditorState(json)
    
  }

  render () {

    const blockData = this.props.block.getData()
    const err = blockData.get('err')
    const cor = blockData.get('cor')
    // console.log(this.props.block)
    const arr = getErrorArr(blockData.get('allstr'), err, cor);
    // console.log(blockData.get('iscord'), blockData.get('ignor'))
    const iscord = JSON.parse(blockData.get('iscord') || '[]')
    const ignor = JSON.parse(blockData.get('ignor') || '[]')
    // console.log(arr)
    // cor
    return (
      <div>
        {
          arr.map((it, idx) => {
            if (it.text === it.err) {
              if (ignor.indexOf(it.index) !== -1) {
                return it.text
              } else if (iscord.indexOf(it.index) !== -1) {
                return it.cor;
              } else {
                return <Error2Cor key={idx} err={it.err} cor={it.cor} errindex={it.index} removeBarBlock={this.removeBarBlock} /> 
              }
            } else {
              return it.text
            }
          })
        }
      </div>
    )

  }

}
// 图片
class ImgBlockComponent extends React.Component {
  imgNode = createRef()
  constructor (props) {
    super(props)
    // console.log(props.block)
    const gtds = props.block.getData()
    let width = gtds.get('width');
    let height = gtds.get('height')
    // console.log(width, height)
    this.state = {
      isHover: false,
      width: width,
      height: height,
      imgWidth: width,
      imgHeight: height,
    }
  }
  componentDidMount () {
    // const gtds = this.props.block.getData()
    const img = this.imgNode.current
    img.onload = () => {
      this.setState({
        width: img.width,
        height: img.height,
      })
    }

    $(document).on('mousemove', this.rightMove)
    $(document).on('mouseup', this.rightUp)
  }

  componentWillUnmount () {
    $(document).off('mousemove', this.rightMove)
    $(document).off('mouseup', this.rightUp)
  }

  onMouseOver = () => {
    this.setState({
      isHover: true
    })
  }
  onMouseOut = () => {
    this.setState({
      isHover: false
    })
  }
  
  isMove = false;

  rightClientX = 0;
  rightClientY = 0;
  width = 0;
  height = 0;
  rightDown = e => {
    let { width, height } = this.state;
    // console.log(e)
    this.rightClientX = e.clientX
    this.rightClientY = e.clientY
    this.width = width;
    this.height = height
    this.isMove = true;
  }
  rightMove = e => {
    if (!this.isMove) {
      return;
    }
    // console.log(e)
    const { clientX, clientY } = e;
    let { width, height } = this
    width += clientX - this.rightClientX
    height += clientY - this.rightClientY
    this.setState({
      width,
      height
    })
  }
  rightUp = e => {
    // console.log('s')
    this.isMove = false;
    const { width, height } = this.state
    this.setState({
      imgWidth: width,
      imgHeight: height
    })
    setEditorImgMap(this.props.block.key, width, height)
  }

  removeImgBlock = () => {
    eventBus.emit('removeImgBlock#rib', this.props.block.key)
  }

  render () {
    // console.log(this.props.block.getData())
    const { isHover, width, height, imgWidth, imgHeight } = this.state;
    return (
      <div>
        <div className="block-img-ctn"  >
          <img width={imgWidth} height={imgHeight} ref={this.imgNode} src={this.props.block.getData().get('src')} alt=""/>
          <div className="img-size-icon left"></div>
          <div className="img-size-icon right" onMouseDown={this.rightDown}></div>
          <div style={{width, height}} className="img-pre-csize"></div>
          <div className="bf-media-toolbar">
            <a onClick={this.removeImgBlock}><span></span></a>
          </div>
        </div>
      </div>
    )
  }
}

// 声明blockRendererFn
export const blockRendererFn = (block, { editor, editorState }) => {
	// console.log(block.getType())
  if (block.getType() === 'block-bar') {

    return {
      component: BarBlockComponent,
      editable: false, // 此处的editable并不代表组件内容实际可编辑，强烈建议设置为false
      props: { editor, editorState } // 此处传入的内容可以在组件中通过this.props.blockProps获取到
    }

  } else if (block.getType() === 'block-img') {
    return {
      component: ImgBlockComponent,
      editable: false, // 此处的editable并不代表组件内容实际可编辑，强烈建议设置为false
      props: { editor, editorState } // 此处传入的内容可以在组件中通过this.props.blockProps获取到
    }
  }

  // 不满足block.getType() === 'block-bar'的情况时请勿return任何内容以免造成其他类型的block显示异常

}

// *******分割线******

// 自定义block输入转换器，用于将符合规则的html内容转换成相应的block，通常与blockExportFn中定义的输出转换规则相对应
const blockImportFn = (nodeName, node) => {

	// console.log(node)
  /*if (nodeName === 'div' && node.classList.contains('my-block-foo')) {

    const dataA = node.dataset.a

    return {
      type: 'block-foo',
      data: {
        dataA: dataA
      }
    }

  }*/

  if (nodeName === 'div' && node.classList.contains('my-block-bar')) {

    const { err, cor, allstr, ignor, iscord } = node.dataset;
    // console.log(err, cor)
    return {
      type: 'block-bar',
      data: {
        text: '',
        err,
        cor,
        allstr,
        ignor,
        iscord,
      }
    }

  }
  if (nodeName === 'div' && node.classList.contains('my-block-img')) {

    // const text = node.querySelector('span').innerText
    // console.log(node.dataset)
    // const dataB = node.dataset.ben
    // const dataB = node.dataset.cor
    const { src, width='auto', height='auto' } = node.dataset;
    // console.log(width, height)
    return {
      type: 'block-img',
      data: {
        text: '',
        src,
        width,
        height
      }
    }

  }

}

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
const blockExportFn = (contentState, block) => {
	// console.log(block)
  /*if (block.type === 'block-foo') {

    const { dataA } = block.data

    return {
      start: `<div class="my-block-foo" data-a="${dataA}">`,
      end: '</div>'
    }

  }*/

  if (block.type === 'block-bar') {

    const { err, cor, allstr, iscord=[], ignor=[] } = block.data
    // console.log(typeof iscord, typeof ignor)
    return {
      start: `<div class="my-block-bar" data-err="${err}" data-cor="${cor}" data-allstr="${allstr}" data-iscord="${iscord}" data-ignor="${ignor}" >`,
      end: '</div>'
    }

  }
  if (block.type === 'block-img') {
    // console.log(contentState, block)
    const { src } = block.data
    const { width, height } = getEditorImgMap(block.key);
    // console.log(isok)
    return {
      start: `<div class="my-block-img" data-src="${src}" data-width="${width}" data-height="${height}" >`,
      end: '</div>'
    }

  }

}

export const getNewEditor = hstr => BraftEditor.createEditorState(hstr, { blockImportFn, blockExportFn })

export {
  blockImportFn, blockExportFn, getErrorArr
}
