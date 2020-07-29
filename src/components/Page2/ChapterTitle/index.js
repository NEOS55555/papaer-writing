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
			<div className="chapter-title-wrapper">
				<p className="chapter-title">选择章节标题</p>
				<ul className="chapter-list">
					<li className="chapter-item">
						<p className="chapter-name">第一张 推荐</p>
						<ul className="show-list">
							<li className="show-item">研究背景1</li>
							<li className="show-item">研究背景2</li>
							<li className="show-item">研究背景3</li>
							<li className="show-item">研究背景4</li>
						</ul>
					</li>
					<li className="chapter-item">
						<p className="chapter-name">第一张 推荐</p>
						<ul className="show-list">
							<li className="show-item">研究背景1</li>
							<li className="show-item">研究背景2</li>
							<li className="show-item">研究背景3</li>
							<li className="show-item">研究背景4</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default Index;