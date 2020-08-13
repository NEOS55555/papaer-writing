import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEditorData, toggleGlobalWrapperByKey } from '@/store/actions'
import { globalBar } from '@/constants'


class Index extends Component {

  onClick = data => {
    const { chapterListEditor, toggleGlobalWrapperByKey } = this.props;
    const wholeText = chapterListEditor.toText()
    const { key } = data;
    if (key === globalBar[0].key) {
      return;
    }
    toggleGlobalWrapperByKey(key)
    console.log(data)
  }
  render () {
    return (
      <div className="globalbar">
        <ul>
          {
            globalBar.map(it => <li key={it.key} onClick={() => this.onClick(it)} >{it.Component ? <it.Component /> : it.name}</li>)
          }
        </ul>
      </div>
    )
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
    toggleGlobalWrapperByKey (data) {
      return dispatch(toggleGlobalWrapperByKey(data))
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);