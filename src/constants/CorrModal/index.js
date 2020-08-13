import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { updateEditorData, getCorrection } from '@/store/actions'
import { getNewEditor } from '@/components/Editor/converts'
import $ from 'jquery';
import { ERROR_SPLIT } from '@/constants'

// 我尼玛 为啥不用split， 我日哦
// 获取一段文字的 bar blocks
/*function getOneTextBar (text, error, correct, inlineStyleRanges, arr=[]) {
  const tIdx = text.indexOf(error)
    if (tIdx !== -1) {
      let prevText = text.slice(0, tIdx)
      let nextText = text.slice(tIdx + error.length)
      
      if (prevText.indexOf(error) !== -1) {
        getOneTextBar(prevText, error, correct, inlineStyleRanges, arr)
      } else {
        arr.push(
          {
            data: {},
            depth: 0,
            entityRanges: [],
            inlineStyleRanges,
            text: prevText,
            // type: it.type,
          }
        )
      }
      arr.push(
        {
          data: {text: "", ben: error, cor: correct},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          text: '',
          type: 'block-bar',
        }
      )
      
      if (nextText.indexOf(error) !== -1) {
        getOneTextBar(nextText, error, correct, inlineStyleRanges, arr)
      } else {
        arr.push(
          {
            data: {},
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
            text: nextText,
            type: 'unstyled',
          }
        )
      }
    }
    return arr;
}
// 获取一个错误类型的 blocks
function getBarJson (oldJson, error, correct) {
  let newJson = [];
  oldJson.forEach(it => {
    let arr = getOneTextBar(it.text, error, correct, it.inlineStyleRanges)
    // console.log(arr)
    if (arr.length === 0) {
      newJson.push(it)
    } else {
      newJson = newJson.concat(arr)
    }
  })
  return newJson
}*/
function isTextArrInStr (str, arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (str.indexOf(arr[i]) !== -1) {
      return true
    }
  }
}
class Index extends React.Component {
  state = { visible: false, confirmLoading: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    // console.log(e);
    const { chapterListEditor, updateEditorData } = this.props
    this.setState({ confirmLoading: true })
    getCorrection({text: chapterListEditor.toText()}).then(errorArr => {
      const { blocks, entityMap } = (chapterListEditor.toRAW(true))
      // console.log(blocks)
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
      updateEditorData({ chapterListEditor: getNewEditor({blocks, entityMap}) })

      // let json = chapterListEditor.toRAW(true).blocks;
      /*const { blocks, entityMap } = (chapterListEditor.toRAW(true))
      blocks.forEach(it => {
        if (it.text.indexOf(err123) !== -1) {
          it.type = 'block-bar'
          it.data = {
            cor: cor123,
            err: err123,
            allstr: it.text
          }
          it.text = '';
        }
      })
      console.log(blocks)
      updateEditorData({
        chapterListEditor: getNewEditor({blocks, entityMap})
      })*/
      /*let arr = json;
      list.forEach(it => {
        arr = getBarJson(arr, it.error, it.correct)
      })
      
      const newEditor = getNewEditor({blocks: arr, entityMap: {}})

      // const newEditor = getNewEditor(hstr)
      
      updateEditorData({ chapterListEditor: newEditor })
      setTimeout(() => {
        const json = newEditor.toRAW(true)
        // console.log(oldJson, json)

        const nodes = $('.public-DraftEditor-content div[data-contents="true"]').children()
        json.blocks.forEach((it, index) => {
          if (it.type === 'block-bar') {
            nodes.eq(index-1).css('display', 'inline-block')
            nodes.eq(index).css('display', 'inline-block')
            nodes.eq(index+1).css('display', 'inline-block')
            // const current = $(`div[data-offset-key="${it.key}-0-0"]`)
            // current.css('display', 'inline')
          }
        })
      }, 16)*/

      message.warn('已在文中标注出错误')
      this.setState({
        visible: false,
      });
    }).finally(res => this.setState({confirmLoading: false}))
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { chapterListEditor } = this.props;
    return (
      <Fragment>
        <span style={{display: 'block'}} onClick={this.showModal}>智能纠错</span>
        <Modal
          title="文章智能纠错"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>全文{chapterListEditor.toText().length}个字</p>
          <p>预计1分钟</p>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { chapterListEditor } = state.editor
  // console.log('s')
  return {
    chapterListEditor,
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