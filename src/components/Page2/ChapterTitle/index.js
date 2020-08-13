import React, { Component } from 'react';
import { Checkbox, Button, message } from 'antd';
import { connect } from 'react-redux';
import { dispatchSuggestChapters, updateHomehData, getSuggestSubjects } from '@/store/actions'
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
		const { chapterList, updateHomehData, sbujectList } = this.props;
		// console.log(chapterList)
		return (
			<div className="chapter-title-wrapper">
				<p className="chapter-title">选择章节标题</p>
				<ul className="chapter-list">
					{
						chapterList.map((it, idx) => (
								<li key={it.id} className="chapter-item">
									<div className="chapter-name">第{idx+1}章推荐 
										<span className="refresh-btn" onClick={() => {
											const maxlen = Math.ceil(it.list.length / max)
											updateHomehData({ chapterList: chapterList.map(itm => itm.id === it.id ? {...itm, sliceIndex: it.sliceIndex+1 >= maxlen ? 0 : it.sliceIndex+1} : itm) })
											
										}} >换一批</span>

									</div>
									<ul className="show-list">
										{
											it.list.slice(it.sliceIndex * max, (it.sliceIndex + 1) * max).map(itx => (
													<li key={itx.id} className="show-item">
														<Checkbox checked={itx.checked} onChange={() => {
															let newList = chapterList.map(item => item.id === it.id ? {...item, list: it.list.map(itemx => itemx.id === itx.id ? {...itemx, checked: !itemx.checked} : itemx)} : item)
															updateHomehData({ chapterList: newList })
															clearTimeout(this.timmer)
															this.timmer = setTimeout(() => {
																const currentItem = newList.find(nlit => nlit.id === it.id);
																const checkedArr = currentItem.list.filter(it => it.checked)
																console.log(checkedArr, idx)
																if (checkedArr.length === 0) {
																	return 
																}
																getSuggestSubjects({checkedArr}).then(list => {
																	updateHomehData({sbujectList: sbujectList.map(sit => sit.id === it.id ? {...sit, list}: sit)})
																})
															}, 1000)
														}} >{itx.text}</Checkbox>
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
				<Button onClick={() => console.log(chapterList)}>获取数据</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
  const { kewords, title, chapterList, sbujectList } = state.home
  // console.log('s')
  return {
    kewords, title, chapterList, sbujectList
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