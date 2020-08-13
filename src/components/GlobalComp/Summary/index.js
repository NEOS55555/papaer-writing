import React, { Component } from 'react';
import { Button, Spin } from 'antd';
import { eventBus } from '@/common'
import { ajaxfn } from '@/store/actions'

class Index extends Component {
	state = {
		content: '',
		isSearching: false,
	}
	componentDidMount () {
		const a = '123456。显示“抱歉，受限于当地法律法规，该栏目无法为您提供服务”。曾经作为日本最大的华人交流论坛，现在只能访问主页的新闻和论坛的部分版块。在当年论坛盛行的时代，小春网还是为很多DIY申请日本留学的同学提供了很多有用的信息，但是到了2018年，知乎、微信公众号、日本大学在国内的办事处以及各类中介已经提供了海量的日本留学资讯。单纯从留学来看的话，小春网提供的';
		this.setState({ isSearching: true })
		ajaxfn(a).then(content => this.setState({ content })).finally(er => this.setState({ isSearching: false }))
	}
	render () {
		const { content, isSearching } = this.state;
		return (
			<div className="summary-wrapper">
				<p className="title">智能摘要</p>
				<Spin spinning={isSearching}>
					<div className="content">
						{content}
					</div>
					<div>
						<Button type="link" onClick={() => eventBus.emit('insertDataToEditor', content)} >采用</Button>
					</div>
				</Spin>
			</div>
		)
	}
}




export default (Index);