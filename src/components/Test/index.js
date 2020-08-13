import 'braft-editor/dist/index.css'
import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import Immutable from 'immutable'
import { Popover } from 'antd'
import './index.scss'
const ERROR_SPLIT = ';'
const getNewEditor = hstr => BraftEditor.createEditorState(hstr, { blockImportFn, blockExportFn })

function getEditorState () {

}

function setEditorState() {}

// 使用blockRenderMap定义一个新的block类型：block-foo

// 定义block-foo在编辑器中的渲染组件
const FooBlockElement = (props) => {
  return <div className="foo-block-element">{props.children}</div>
}

// 定义block-foo的容器组件，用于包裹单个独立或多个连续的block-foo，这一项是可选的
const FooBlockWrapper = (props) => {
  return <div className="foo-block-wrapper">{props.children}</div>
}

// 声明blockRenderMap
// 此处注意：
// 1: element属性是一个未渲染的React组件，或者是一个有效的html标签字符串，如"div","aside","section"等
// 2: wrapper属性需要是一个已渲染的React组件，用于包裹单个独立或多个连续的element，这一项是可选的
const blockRenderMap = Immutable.Map({
  'block-foo': {
    element: FooBlockElement,
    wrapper: <FooBlockWrapper />
  }
})

// *******分割线******

// 使用blockRendererFn定义一个新的block类型: block-bar

// 定义block-bar在编辑器中的渲染组件
/*class BarBlockComponent extends React.Component {
	state = {
		istrans: false
	}
  // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
  removeBarBlock = (isUnstyle) => {
  	const editorState = (getEditorState())
  	const json = editorState.toRAW(true)
  	let { blocks } = json
  	let someone = blocks.find(it => it.key ===this.props.block.key);
  	if (isUnstyle) {
			someone.text = someone.data.err
  	} else {
  		someone.text = someone.data.cor
  	}
  	someone.type = 'unstyled';
  	setEditorState(json)
  	// console.log(, )
  	// this.props.block.getData().set('isok', 'okkk')
  	// console.log(this.props.block.getData())

  	// console.log(this.props.blockProps.editorState)
    // this.props.blockProps.editor.setValue(ContentUtils.removeBlock(this.props.blockProps.editorState, this.props.block))
  }

  render () {

    const blockData = this.props.block.getData()
    // console.log(this.props.block)
    const err = blockData.get('err')
    const cor = blockData.get('cor')
    const { istrans } = this.state;
		// cor
    return (
			<Popover
        content={
        	<div>
        		<button className="button-remove" onClick={() => this.removeBarBlock()}>
		          {cor}
		        </button>
		        <button className="button-remove" onClick={() => this.removeBarBlock(true)}>
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

}*/

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

function isTextArrInStr (str, arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (str.indexOf(arr[i]) !== -1) {
      return true
    }
  }
}

class BarBlockComponent extends Component {
 
  // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
  removeBarBlock = (isUnstyle, errindex) => {
    const editorState = (getEditorState())
    const json = editorState.toRAW(true)
    let { blocks } = json
    // console.log(blocks)
    let someone = blocks.find(it => it.key ===this.props.block.key);
    const iscord = JSON.parse(someone.data.iscord || '[]')
    const ignor = JSON.parse(someone.data.ignor || '[]')
    console.log(someone)
    if (isUnstyle) {  // 不纠正也就是忽略
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
    setEditorState(json)
    
  }

  render () {

    const blockData = this.props.block.getData()
    // console.log(this.props.block)
    
    // const modify = blockData.get('modify')
    const err = blockData.get('err')
    const cor = blockData.get('cor')
    // console.log(blockData.get('modify'))
    // const modify = err.map((it, idx) => ({err: it, cor: cor[idx]}))
    

    const arr = getErrorArr(blockData.get('allstr'), err, cor);
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

            /*it.text === err && iscord.indexOf(it.index) === -1 && ignor.indexOf(it.index) === -1 
            ? <Error2Cor key={idx} err={err} cor={cor} errindex={it.index} removeBarBlock={this.removeBarBlock} /> 
            : it.text*/
        }
      </div>
    )

  }

}

// 声明blockRendererFn
const blockRendererFn = (block, { editor, editorState }) => {
	// console.log(block.getType())
  if (block.getType() === 'block-bar') {

    return {
      component: BarBlockComponent,
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

    // const text = node.querySelector('span').innerText
    // console.log(node.dataset)
    // const dataB = node.dataset.err
    // const dataB = node.dataset.cor
    const { err, cor, allstr, ignor='[]', iscord='[]' } = node.dataset;

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

}

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
const blockExportFn = (contentState, block) => {
	// console.log(contentState)
  /*if (block.type === 'block-foo') {

    const { dataA } = block.data

    return {
      start: `<div class="my-block-foo" data-a="${dataA}">`,
      end: '</div>'
    }

  }*/

  if (block.type === 'block-bar') {

    const { err, cor, allstr, iscord, ignor } = block.data
		// console.log(isok)
    return {
      start: `<p class="my-block-bar" data-err="${err}" data-cor="${cor}" data-allstr="${allstr}" data-iscord="${iscord}" data-ignor="${ignor}" >`,
      end: '</p>'
    }

  }

}
// <div class="my-block-bar" data-allstr="我饿日错误机器玩法斯康错误杜尼发生错误地那"  data-err="错误" data-cor="asdg"></div>
// <p>我饿日错误<strong>机器玩法</strong>斯康错误杜尼发生错误地那我饿日错误<strong>机器玩法</strong>斯康错误杜尼发生错误地那</p>
// data-modify="[{"err": "错误", cor: "我哦哦"}, {"err": "abc", "cor": "欧威"}]"
// const err123 = '错误', cor123 = '“这才是正确的”'
const errorArr = [{error: '我', correct: '对的啊'}]
// 定义一段html，请留意其内容与上文定义的输入/输出转换器的关联性
const initialContent = `<p>asdfasdfasdfasdf</p>
<p>我不知道你在说什么啊， 真的啊</p>
<p><div class="my-block-bar" data-allstr="我饿日错误机abc器玩法斯康错误杜abc尼发生错误地那" data-err="错误;abc" data-cor="我哦哦;欧威"></div></p>
<p></p>`

export default class BasicDemo extends React.Component {

  state = {
    // 注意： 使用createEditorState时，需要将上文定义的blockImportFn和blockExportFn作为第二个对象参数的成员传入
    editorState: getNewEditor(initialContent),
  	outputHTML: getNewEditor(initialContent).toHTML()
  }

  componentDidMount () {
  	getEditorState = () => {
  		return this.state.editorState
  	}
  	setEditorState = (html) => {
  		// console.log(html)
  		this.setState({ editorState: BraftEditor.createEditorState(html, { blockImportFn, blockExportFn }) })
  	}
  }

  handleChange = (editorState) => {
  	// console.log(editorState)
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  render () {

    const { editorState, outputHTML } = this.state

    // 在组件中传入上文定义的blockRenderMap、blockRendererFn
    // 并将blockImportFn和blockExportFn传入组件的converts属性
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            // blockRenderMap={blockRenderMap}
            blockRendererFn={blockRendererFn}
            converts={{ blockImportFn, blockExportFn }}
          />
        </div>
        <h5>输出内容</h5>
        <button
          onClick={() => {
            const { blocks, entityMap } = (editorState.toRAW(true))
            console.log(blocks)
            const errArr = [], corArr = [];
            errorArr.forEach(it => {
              errArr.push(it.error)
              corArr.push(it.correct)
            })

            blocks.forEach(it => {
              if (isTextArrInStr(it.text, errArr)) {
                it.type = 'block-bar'
                it.data = {
                  cor: corArr.join(ERROR_SPLIT),
                  err: errArr.join(ERROR_SPLIT),
                  allstr: it.text
                }
                it.text = '';
              }
            })
            console.log(blocks)
            this.setState({
              editorState: getNewEditor({blocks, entityMap})
            })
          }}
        >查错</button>
        {<button onClick={() => this.setState({ 
        	editorState: BraftEditor.createEditorState(editorState.toHTML(), { blockImportFn, blockExportFn })
        })}>插入一个按钮</button>}
        <button onClick={() => {
          console.log(editorState.toHTML())
          console.log(editorState.toRAW(true))
        }}>获取数据</button>
        {/*<button onClick={() => this.setState({ editorState: ContentUtils.insertHTML(editorState, '<div class="my-block-bar" data-b="1234567"><span>ABCDEFG</span></div>') })}>插入一个按钮</button>*/}
        <div className="output-content">{outputHTML}</div>
      </div>
    )

  }

}