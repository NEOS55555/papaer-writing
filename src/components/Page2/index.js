import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getGenTitles, getGenRemarks, updateHomehData } from '@/store/actions'
import { Input } from 'antd';
import ChapterTitle from './ChapterTitle'
import ChapterSubject from './ChapterSubject'
import ChapterSelf from './ChapterSelf'
import './index.scss'
// const { TextArea } = Input;

class Index extends Component {
	/*handleChange = val => {
		console.log(val)
	}*/
	render () {
		const { keywords, title } = this.props;
		return (
			<div className="chapter-plan-wrapper">
				<div className="plan-header">
					<div className="plan-item">
						<span className="prev-txt">输入的关键字</span>
						<Input className="input" value={keywords} disabled />
					</div>
					<div className="plan-item">
						<span className="prev-txt">提名</span>
						<Input className="input" value={title} disabled />
					</div>
				</div>
				<div className="plan-body">
					<div className="paln-box">
						<ChapterTitle />
					</div>
					<div className="paln-box">
						<ChapterSubject />
					</div>
					<div className="paln-box">
						<ChapterSelf />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  // const { keywords, title, summary } = state.home
  return {
    ...state.home
  };
};
/*const mapDispatchToProps = dispatch => {
  return {
    updateHomehData (data) {
      return dispatch(updateHomehData(data))
    }
  };
};*/
export default (connect(mapStateToProps)(Index));