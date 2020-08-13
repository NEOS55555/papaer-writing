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
		const a = `[1]图书馆[J].小学科学,2020(4):34-35.
				[2]朱颖.数字时代高校图书馆定位[J].内蒙古科技与经济,2020(1):140-140.
				[3]涂志芳.图书馆转型的话语构建[J].图书馆论坛,2020,40(3):30-38.
				[4]蒋秀丽.图书馆生态文明建设之我见[J].山东农业工程学院学报,2020,37(1):181-186.
				[5]王超.民国时期的图书馆展览[J].图书馆论坛,2020,40(3):84-91.
				[6]汪静.国外图书馆人才政策探究[J].图书馆建设,2020(1):145-151.
				[7]叶卉.基层公共图书馆管理思考[J].管理观察,2020(2):88-90.
				[8]陈传夫,李秋实.开放社会与图书馆发展[J].中国图书馆学报,2020,46(1):16-37.
				[9]任利静.图书馆文化创意产品探究[J].智库时代,2020(11):291-292.
				[10]欧阳爱辉,闫玉冰.英国主要图书馆法述评[J].高校图书馆工作,2020,40(1):38-41.
				[11]刘春晖.图书馆经济价值评估分析[J].中国市场,2020(5):103-104.
				[12]田甜.图书馆知识管理创新研究[J].办公室业务,2020(3):169-169.
				[13]虞俊杰.常州地铁图书馆建设研究[J].江苏科技信息,2020,37(3):5-7.
				[14]蒋永福.中国古代图书馆学的特征[J].图书馆论坛,2020,40(2):26-35.
				[15]靳萍,谷秀洁.图书馆敏捷项目管理研究综述[J].高校图书馆工作,2020,40(2):13-16.
				[16]郑之敏.浅析少儿图书馆活动积分制度[J].发明与创新:职业教育,2020(2):165-166.
				[17]郑锦怀.李芳馥图书馆生涯考辨[J].图书馆论坛,2020,40(3):92-100.
				[18]吴元业.下一代图书馆服务平台CLSP[J].图书馆论坛,2020,40(1):126-131.`;
		this.setState({ isSearching: true })
		ajaxfn(a).then(content => this.setState({ content })).finally(er => this.setState({ isSearching: false }))
	}
	render () {
		const { content, isSearching } = this.state;
		return (
			<div className="summary-wrapper">
				<p className="title">参考文献</p>
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