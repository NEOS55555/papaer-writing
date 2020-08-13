import React, { Component } from 'react';
import { Checkbox, Button, message } from 'antd';
import { connect } from 'react-redux';
import { dispatchSuggestChapters, updateHomehData } from '@/store/actions'
import './index.scss'

const max = 5;
class Index extends Component {
	handleChange = val => {
		console.log(val)
	}
	timmer = null;
	componentDidMount () {
		this.props.dispatchSuggestChapters()
		// getSuggestChapters().then(chapterList => this.props.updateHomehData({ chapterList }))
	}

	render () {
		const { sbujectList, updateHomehData } = this.props;
		console.log(sbujectList)
		return (
			<div className="chapter-title-wrapper">
				<p className="chapter-title">选择章节主题</p>
				<ul className="chapter-list">
					{
						sbujectList.map((it, idx) => (
								<li key={it.id} className="chapter-item">
									<div className="chapter-name">第{idx+1}章推荐 
										<span className="refresh-btn" onClick={() => {
											const maxlen = Math.ceil(it.list.length / max)
											updateHomehData({ sbujectList: sbujectList.map(itm => itm.id === it.id ? {...itm, sliceIndex: it.sliceIndex+1 >= maxlen ? 0 : it.sliceIndex+1} : itm) })
											
										}} >换一批</span>

									</div>
									<ul className="show-list">
										{
											it.list.slice(it.sliceIndex * max, (it.sliceIndex + 1) * max).map(itx => (
													<li key={itx.id} className="show-item">
														<Checkbox checked={itx.checked} onChange={() => {
															let newList = sbujectList.map(item => item.id === it.id ? {...item, list: it.list.map(itemx => itemx.id === itx.id ? {...itemx, checked: !itemx.checked} : itemx)} : item)
															updateHomehData({ sbujectList: newList })
															clearTimeout(this.timmer)
															this.timmer = setTimeout(() => {
																const currentItem = newList.find(nlit => nlit.id === it.id);
																const checkedArr = currentItem.list.filter(it => it.checked)
																console.log(checkedArr, it.id)
																if (checkedArr.length === 0) {
																	return 
																}
															}, 1000)
														}} >{itx.word}，分数{itx.score}</Checkbox>
													</li>
												)
											)
										}
									</ul>
								</li>
							)
						)
					}
					
				</ul>
				<Button onClick={() => console.log(sbujectList)}>获取数据</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
  const { kewords, title, sbujectList } = state.home
  // console.log('s')
  return {
    kewords, title, sbujectList
    // chapterList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatchSuggestChapters (data) {
      return dispatch(dispatchSuggestChapters(data))
    },
    updateHomehData (data) {
      return dispatch(updateHomehData(data))
    }
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(Index));