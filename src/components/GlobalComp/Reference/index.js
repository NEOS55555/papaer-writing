import React, { Component } from 'react';
import { Button, Spin } from 'antd';
import { eventBus } from '@/common'
import { getReference } from '@/store/actions'

class Index extends Component {
	state = {
		content: [],
		isSearching: false,
	}
	componentDidMount () {
		this.setState({ isSearching: true })
		getReference().then(content => {
			// console.log(content)
			this.setState({ content })
		}).finally(er => this.setState({ isSearching: false }))
	}
	render () {
		const { content, isSearching } = this.state;
		return (
			<div className="summary-wrapper">
				<p className="title">参考文献</p>
				<Spin spinning={isSearching}>
					<div className="content">
						{
							content.map((it, idx) => <p key={idx}>{it}</p>)
						}
					</div>
					<div>
						<Button type="link" onClick={() => eventBus.emit('insertDataToEditor', content.map(it => `<p>${it}</p>`).join(''))} >采用</Button>
					</div>
				</Spin>
			</div>
		)
	}
}




export default (Index);