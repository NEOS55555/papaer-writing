import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Spin } from 'antd';
import { SearchReplace, eventBus } from '@/common'
import './index.scss'

class Index extends Component {
	render () {
		const { searchList, isSearching } = this.props;
		return (
			<div className="search-list-wrapper">
				<Spin spinning={isSearching}></Spin>
				<ul className="search-list">
					{
						searchList.map(it => (
							<li key={it.id}>
								<h2 className="title">{it.title}</h2>
								<p className="sub-text"><span>某网</span><span>2020年7月29日</span><span>大鱼号</span><span>499阅读</span></p>
								<div className="text-ctn">
									<p className="text"><SearchReplace str={it.content} keywords={["罗", '科技', '说']} /></p>
									{it.img && <img src={it.img} alt=""/>}
								</div>
								<div className="link-wrapper"><a>科技</a><a>老罗</a></div>
								<div className="oper">
									<Button type="link">全文</Button>
									<Button type="link" onClick={() => eventBus.emit('insertOneDataToEditor', it.content)} >引用精华</Button>
								</div>
							</li>
						))
					}
					
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => {
  const { searchList, isSearching } = state.search
  // console.log('s')
  return {
    searchList, isSearching
  };
};


export default connect(mapStateToProps)(Index);