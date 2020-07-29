import React, { Component } from 'react';
import { Input } from 'antd';
import './index.scss'
const { TextArea } = Input;

class Index extends Component {
	handleChange = val => {
		console.log(val)
	}
	render () {
		return (
			<div className="self-wrapper">
				<div className="self-line">
					<span className="prev-txt">输入的关键字</span>
					<Input />
				</div>
				<div className="self-line">
					<span className="prev-txt">我的提名</span>
					<Input />
				</div>
				<div className="self-line">
					<span className="prev-txt">我的摘要</span>
					<TextArea />
				</div>
			</div>
		)
	}
}

export default Index;