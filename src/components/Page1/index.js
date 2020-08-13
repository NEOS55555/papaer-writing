import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { getGenTitles, getGenRemarks, updateHomehData } from '@/store/actions'
import { withRouter } from "react-router";
import './index.scss'
const { TextArea } = Input;

class Index extends Component {
	state = {
		titleIndex: 0,
		titleList: [],
		recommendIndex: 0,
		recommendList: [],

		titleValue: '',
		recommendValue: '',
	}
	handleChange = val => {
		console.log(val)
	}
	componentDidMount () {
		const { keywords } = this.props;
		getGenTitles({keywords}).then(titleList => this.setState({ titleList }))
		getGenRemarks({keywords}).then(recommendList => this.setState({ recommendList }))
		// console.log(this.props)
	}

	titleNext = () => {
		this.setState((prevState) => {
			let { titleIndex, titleList } = prevState
			titleIndex = titleIndex+1 >= titleList.length ? 0 : titleIndex+1
			return {
				titleIndex
			}
		})
	}
	recommendNext = () => {
		this.setState((prevState) => {
			let { recommendIndex, recommendList } = prevState
			recommendIndex = recommendIndex+1 >= recommendList.length ? 0 : recommendIndex+1
			return {
				recommendIndex
			}
		})
	}

	titleSure = () => {
		const { titleIndex, titleList } = this.state;
		this.props.updateHomehData({ title: titleList[titleIndex] })
	}
	recommendSure = () => {
		const { recommendIndex, recommendList } = this.state;
		this.props.updateHomehData({ summary: recommendList[recommendIndex] })
	}
	titleChange = e => this.props.updateHomehData({ title: e.target.value })
	recommendChange = e => this.props.updateHomehData({ summary: e.target.value })
	startWrite = () => {
		// console.log(this.props)
		this.props.history.push('/page2')
	}
	render () {
		const { keywords, title, summary } = this.props;
		const { titleIndex, titleList, recommendIndex, recommendList } = this.state;
		return (
			<div className="self-wrapper">
				<div className="self-line">
					<span className="prev-txt">输入的关键字</span>
					<Input value={keywords} disabled />
				</div>
				<div className="self-line">
					<span className="prev-txt">我的提名</span>
					<Input value={title} placeholder="可以选择推荐提名进行修改" onChange={this.titleChange} />
				</div>
				<div className="self-line">
					<span className="prev-txt">我的摘要</span>
					<TextArea value={summary} placeholder="可以选择推荐摘要进行修改" onChange={this.recommendChange} />
				</div>
				<div className="ai-recommend">
					<div className="ai-h1">AI推荐</div>
					<div className="ai-top">
						<span className="ant-btn link" onClick={this.titleNext} >换一批</span>
						<Button onClick={this.titleSure} >采纳</Button>
						<div className="ai-title">{titleList[titleIndex]}</div> 
					</div>
					<div className="ai-content">
						<span className="ant-btn link" onClick={this.recommendNext} >换一批</span>
						<Button onClick={this.recommendSure} >采纳</Button>
						<div className="text">{recommendList[recommendIndex]}</div>
					</div>
				</div>
				<div className="self-footer">
					<Button type="primary" onClick={this.startWrite}>下一步</Button>
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => {
  const { keywords, title, summary } = state.home
  // console.log('s')
  return {
    keywords, title, summary
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateHomehData (data) {
      return dispatch(updateHomehData(data))
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
