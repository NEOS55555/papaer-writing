import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { updateEditorData, qualityControl } from '@/store/actions'
import { getNewEditor } from '@/components/Editor/converts'
import { getKeywordsIndex } from '@/common'


// getKeywordsIndex(hstr, '图书')

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
    qualityControl({text: chapterListEditor.toText()}).then(list => {
      const json = chapterListEditor.toRAW(true).blocks;
      json.forEach(it => {
        // COLOR-FF0000
        list.forEach(lit => {
          let idxArr = getKeywordsIndex(it.text, lit.check);
          it.inlineStyleRanges = it.inlineStyleRanges.concat(idxArr.map(strIndex => ({offset: strIndex, length: lit.check.length, style: 'COLOR-FF0000'})))
        })
        
        
      })
      console.log(json)
      // const hstr = chapterListEditor.toHTML().replace(new RegExp(`(${list.map(it => it.check).join('|')})`, 'ig'), function (a) { return `<span style="color: rgb(255, 0, 0);">${a}</span>`})
      updateEditorData({ chapterListEditor: getNewEditor({blocks: json, entityMap: {}}) })
      message.warn('已在文中标注出，敏感词汇')
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
    return (
      <Fragment>
        <span style={{display: 'block'}} onClick={this.showModal}>质量控制</span>
        <Modal
          title="文章质量控制"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>将对内容涉黄、涉黑、政治敏感等检查</p>
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
    updateEditorData (list) {
      return dispatch(updateEditorData(list))
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);