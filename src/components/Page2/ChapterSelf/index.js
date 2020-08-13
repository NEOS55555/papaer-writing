import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input } from 'antd';
import { updateHomehData } from '@/store/actions'
import './index.scss'
const { TextArea } = Input;

class Index extends Component {
	handleChange = val => {
		console.log(val)
	}
	componentDidMount () {

	}
	render () {
		return (
			<div className="self-wrapper">
				<div className="self-line">
					<span className="prev-txt">第一章</span><Input />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  // const { isSort, chapterListEditor } = state.home
  // console.log('s')
  return {
    ...state.home
    // chapterList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateHomehData (data) {
      return dispatch(updateHomehData(data))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);