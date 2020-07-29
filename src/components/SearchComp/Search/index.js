import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import { SearchReplace, eventBus } from '@/common'
import './index.scss'

const { Option } = Select;
const text = '2019年都快过去一半了，大部分安卓手机厂商都已经发布上半年的旗舰了，最晚的一加也确定在下个月发布一加7系列手机了。大家关心其他厂商的新产品新技术，对锤子科技及罗永浩来说，大家最期待的已经不是他们的新手机新系统了，而是这家公司命运如何。最近罗永浩很少露面了，虽然变相否认进军电子烟市场了，但锤子科技的资产也变卖了差不多了，目前主要剩下的就是核心部分——SmartisanOS系统及锤子科技。';
class Index extends Component {
	handleChange = () => {
		eventBus.emit('insertOneDataToEditor')
	}
	render () {
		return (
			<div className="search-list-wrapper">
				<Button onClick={this.handleChange} >asdf</Button>
				<ul className="search-list">
					<li>
						<h2 className="title">罗永浩和他的锤子</h2>
						<p className="sub-text"><span>某网</span><span>2020年7月29日</span><span>大鱼号</span><span>499阅读</span></p>
						<div className="text-ctn">
							<p className="text"><SearchReplace str={text} keywords={["罗", '科技', '说']} /></p>
							<img src="http://image.uc.cn/s/wemedia/s/2019/95b2422b8dcfe331d2ecf2799e41890c.jpg" alt=""/>
						</div>
					</li>
					<li>
						<h2 className="title">罗永浩和他的锤子</h2>
						<p className="sub-text"><span>某网</span><span>2020年7月29日</span><span>大鱼号</span><span>499阅读</span></p>
						<div className="text-ctn">
							<p className="text"><SearchReplace str={text} keywords={["罗", '科技']} /></p>
							<img src="http://image.uc.cn/s/wemedia/s/2019/95b2422b8dcfe331d2ecf2799e41890c.jpg" alt=""/>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}

export default Index;