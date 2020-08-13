import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class Index extends Component {
	
	render () {
		const { value, onChange, options, style={} } = this.props;
		return (
			<Select value={value} style={style} onChange={onChange} placeholder="请选择">
				{
					options.map(it => <Option key={it.id} value={it.id}>{it.name}</Option>)
				}
	    </Select>
		)
	}
}


export default (Index);