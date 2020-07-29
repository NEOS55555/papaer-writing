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
					<span className="prev-txt">第一章</span><Input />
				</div>
			</div>
		)
	}
}

export default Index;