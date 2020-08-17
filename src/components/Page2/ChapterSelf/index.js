import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input } from 'antd';
import { updateHomehData } from '@/store/actions'
import './index.scss'
const { TextArea } = Input;

class Index extends Component {
	render () {
		const { chapterList } = this.props;
		// console.log(chapterList[0].list.filter(itx => itx.checked))
		return (
			<div className="chapter-title-wrapper self-title-wrapper">
				<p className="chapter-title">我的文章结构</p>
				<ul className="chapter-list">
					{
						chapterList.map((it, idx) => (
								<li key={it.id} className="chapter-item">
									<div className="chapter-name">
										第{idx+1}章推荐 
										<span>{it.list.filter(itx => itx.checked).map(itm => itm.text).join(';')}</span>
									</div>
								</li>
							)
						)
					}
					
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => {
  const { chapterList } = state.home
  return {
    chapterList
    // chapterList,
  };
};


export default connect(mapStateToProps)(Index);