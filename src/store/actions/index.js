import axios from 'axios';
// import url from '@/common/api'
// import cookie from 'react-cookies';
import { message } from 'antd';

const UPDATE_CHAPTER_LIST = 'UPDATE_CHAPTER_LIST'

const UPDATE_EDITOR_DATA = 'UPDATE_EDITOR_DATA'
const UPDATE_CHAPTER_EDITOR = 'UPDATE_CHAPTER_EDITOR'

const UPDATE_SEARCH_DATA = 'UPDATE_SEARCH_DATA'

export const updateChapterList = data => ({type: UPDATE_CHAPTER_LIST, data})
export const updateEditorData = data => ({type: UPDATE_EDITOR_DATA, data})
export const updateEditorEdit = data => ({type: UPDATE_CHAPTER_EDITOR, data})

const updateSearchData = data => ({type: UPDATE_SEARCH_DATA, data})

// ************************************
function rand (a, b) {
	return Math.floor(Math.random() * (b - a) + a);
}
function getRandContent ({keywrod}) {
	let arr = [];
	for (let i = 0, len = rand(5, 10); i < len; i++) {
		arr.push({
			id: Math.random(),
      title: '罗永浩'+keywrod+'和他的锤子1'+Math.random(),
      img: 'http://image.uc.cn/s/wemedia/s/2019/95b2422b8dcfe331d2ecf2799e41890c.jpg',
      content: keywrod + Math.random() + '2019年都快过去一半了，大部分安卓手机厂商都已经发布上半年的旗舰了，最晚的一加也确定在下个月发布一加7系列手机了。大家关心其他厂商的新产品新技术，对锤子科技及罗永浩来说，大家最期待的已经不是他们的新手机新系统了，而是这家公司命运如何。最近罗永浩很少露面了，虽然变相否认进军电子烟市场了，但锤子科技的资产也变卖了差不多了，目前主要剩下的就是核心部分——SmartisanOS系统及锤子科技。',
    })
	}
	return arr;
}

export const dispatchSearchList = params => dispatch => {
	dispatch(updateSearchData({ isSearching: true }))
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			resolve(getRandContent(params))
		}, 500)
	}).then(res => {
		dispatch(updateSearchData({ searchList: res, isSearching: false }))
	})
}

export {
  UPDATE_CHAPTER_LIST,
  UPDATE_EDITOR_DATA,
  UPDATE_CHAPTER_EDITOR,
  UPDATE_SEARCH_DATA,
}
