import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import './index.scss'

const { Option } = Select;

class Index extends Component {
	handleChange = val => {
		console.log(val)
	}
	render () {
		return (
			<div className="self-wrapper">
				<div className="self-line">
					<span className="prev-txt">论文类型：</span>
					<Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
			      <Option value="jack">Jack</Option>
			      <Option value="lucy">Lucy</Option>
			      <Option value="disabled" disabled>
			        Disabled
			      </Option>
			      <Option value="Yiminghe">yiminghe</Option>
			    </Select>
				</div>
				<div className="self-line">
					<span className="prev-txt">学校：</span>
					<Input className="input" />
				</div>
				<div className="self-line">
					<span className="prev-txt">专业：</span>
					<Input className="input" />
				</div>
				<div className="self-line">
					<span className="prev-txt">研究领域：</span>
					<Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
			      <Option value="jack">Jack</Option>
			      <Option value="lucy">Lucy</Option>
			      <Option value="disabled" disabled>
			        Disabled
			      </Option>
			      <Option value="Yiminghe">yiminghe</Option>
			    </Select>
			    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
			      <Option value="jack">Jack</Option>
			      <Option value="lucy">Lucy</Option>
			      <Option value="disabled" disabled>
			        Disabled
			      </Option>
			      <Option value="Yiminghe">yiminghe</Option>
			    </Select>
			    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
			      <Option value="jack">Jack</Option>
			      <Option value="lucy">Lucy</Option>
			      <Option value="disabled" disabled>
			        Disabled
			      </Option>
			      <Option value="Yiminghe">yiminghe</Option>
			    </Select>
				</div>
				<div className="self-line">
					<span className="prev-txt">关键词：</span>
					<Input className="input" />
				</div>
				<div className="self-footer">
					<Button type="primary">开始写作</Button>
				</div>
			</div>
		)
	}
}

export default Index;