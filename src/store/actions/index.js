import axios from 'axios';
// import url from '@/common/api'
// import cookie from 'react-cookies';
import { list2html } from '@/common'
import { getNewEditor } from '@/components/Editor/converts'
import { message } from 'antd';

// 编辑器
const UPDATE_CHAPTER_LIST = 'UPDATE_CHAPTER_LIST'

const UPDATE_EDITOR_DATA = 'UPDATE_EDITOR_DATA'
const UPDATE_CHAPTER_EDITOR_BY_LIST = 'UPDATE_CHAPTER_EDITOR_BY_LIST'
const UPDATE_CHAPTER_EDITOR_BY_HTML = 'UPDATE_CHAPTER_EDITOR_BY_HTML'

// 编辑器搜索
const UPDATE_SEARCH_DATA = 'UPDATE_SEARCH_DATA'
const SHOW_SEARCH_WRAPPER_BY_KEY = 'SHOW_SEARCH_WRAPPER_BY_KEY'
const SHOW_GLOBAL_WRAPPER_BY_KEY = 'SHOW_GLOBAL_WRAPPER_BY_KEY'

// 首页
const UPDATE_HOME_DATA = 'UPDATE_HOME_DATA'


export const updateChapterList = data => ({type: UPDATE_CHAPTER_LIST, data})
const updateEditorData = data => ({type: UPDATE_EDITOR_DATA, data})
export const updateEditorEditByList = data => ({type: UPDATE_CHAPTER_EDITOR_BY_LIST, data})
export const updateEditorEditByHTML = data => ({type: UPDATE_CHAPTER_EDITOR_BY_HTML, data})

const updateSearchData = data => ({type: UPDATE_SEARCH_DATA, data})
const updateHomehData = data => ({type: UPDATE_HOME_DATA, data})

export const toggleWrapperByKey = data => ({type: SHOW_SEARCH_WRAPPER_BY_KEY, data})
export const toggleGlobalWrapperByKey = data => ({type: SHOW_GLOBAL_WRAPPER_BY_KEY, data})

// ************************************
let id = 0;
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
      content: Math.random() + keywrod + '2019年都快过去一半了，大部分安卓手机厂商都已经发布上半年的旗舰了，最晚的一加也确定在下个月发布一加7系列手机了。大家关心其他厂商的新产品新技术，对锤子科技及罗永浩来说，大家最期待的已经不是他们的新手机新系统了，而是这家公司命运如何。最近罗永浩很少露面了，虽然变相否认进军电子烟市场了，但锤子科技的资产也变卖了差不多了，目前主要剩下的就是核心部分——SmartisanOS系统及锤子科技。',
    })
	}
	return arr;
}
function getRandIntel ({keywrod}) {
	let arr = [];
	for (let i = 0, len = rand(5, 10); i < len; i++) {
		arr.push({
			id: Math.random(),
      content: keywrod + Math.random() + '2019年都快过去一半了，大部分安卓手机厂商都已经发布上半年的旗舰了，最晚的一加也确定在下个月发布一加7系列手机了。大家关心其他厂商的新产品新技术，对锤子科技及罗永浩来说，大家最期待的已经不是他们的新手机新系统了，而是这家公司命运如何。最近罗永浩很少露面了，虽然变相否认进军电子烟市场了，但锤子科技的资产也变卖了差不多了，目前主要剩下的就是核心部分——SmartisanOS系统及锤子科技。',
    })
	}
	return arr;
}
function getRandResearchSelects (params={}) {
	let arr = [];
	for (let i = 0, len = rand(5, 10); i < len; i++) {
		arr.push({
			id: Math.random(),
			name: '下拉'+i
    })
	}
	return arr;
}
function getRandSuggestChapters () {
	let arr = [];
	for (let i = 0, len = rand(5, 10); i < len; i++) {
		arr.push({
			id: id++, 
			list: (() => {
				let arr = [];
				for (let i = 0, len = rand(10, 20); i < len; i++) {
					arr.push({id: id++, text: '标题推荐'+rand(5, 1000)})
				}
				return arr
			})()
		})
	}
	return arr;
}

function getRandSuggestSubjects () {
	let arr = [];
	for (let i = 0, len = rand(5, 8); i < len; i++) {
		arr.push({id: id++, word: '主题推荐'+rand(5, 1000), score: rand(1, 10)})
	}
	return arr;
}

function ajaxfn (data) {
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			resolve(data)
		}, 500)
	})
}
// ************************************
// 首页
// 获取研究领域下拉
export const getResearchSelects = (params) => ajaxfn(getRandResearchSelects(params))
// 获取关键词搜索
// SuggestWords
export const getSuggestWords = params => ajaxfn(['你阿斯蒂芬啊', '完了呢提', '完了呢提我饿', '佛猎头', rand(1000, 100000)])

// page1
// 获取提名 GenTitles
export const getGenTitles = params => ajaxfn(['提名你阿斯蒂芬啊', '提名完了呢提', '提名完了呢提我饿', '提名佛猎头', '提名'+rand(1000, 100000)])
// 获取摘要 GenRemarks
export const getGenRemarks = params => ajaxfn(['你摘要摘要摘要摘要摘要阿斯蒂芬啊', '完了呢摘要摘要摘要摘要提', '完了摘要摘要摘要摘要呢提我饿', '佛猎摘要摘要摘要摘要头', '摘要摘要摘要摘要'+rand(1000, 100000)])

// page2
// 获取章节标题
// SuggestChapters
// export const getSuggestChapters = params => ajaxfn(getRandSuggestChapters())
export const dispatchSuggestChapters = params => dispatch => ajaxfn(getRandSuggestChapters()).then(chapterList => {
	// console.log(chapterList)
	dispatch(updateHomehData({ chapterList: chapterList.map(it => ({...it, sliceIndex: 0})), sbujectList: chapterList.map(it => ({id: it.id, sliceIndex: 0, list: []})) }))
})

// 编辑器
// 获取论文
// GenPaper 
function mm (arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    arr[i].title = arr[i].chapter
    arr[i].expanded = true
    // arr[i].
    if (arr[i].children) {
      mm(arr[i].children)
    }
  }
  return arr;
}

const imgsrc = 'http://image.uc.cn/s/wemedia/s/2019/95b2422b8dcfe331d2ecf2799e41890c.jpg';

export const dispatchGenPaper = params => dispatch => ajaxfn([
  { chapter: '引言',text:'<p>智慧图书馆集现代先进<div class="my-block-img" data-src="'+imgsrc+'" data-width="433" data-height="220" alt=""></div>的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。智慧图书馆集现代先进的信息科学技术、绿色环保意识以及图书馆理论于一身,智慧图书馆的发展值得期待[10]。</p>', id: id++},
  { chapter: '第一章',text:'<p><div class="my-block-bar" data-allstr="功能；功能我饿日错误机器玩法斯康错误杜尼发生错误地那"  data-err="错误;啊啊" data-cor="asdg;锤子"></div></p>', id: id++ ,
    children: [
      { chapter: '第一章-1',text:'<p>1.1</p>', id: id++ },
      { chapter: '第一章-2',text:'<p>1.2</p>', id: id++ },
      { chapter: '第一章-3',text:'<p>1.3,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
      { chapter: '第一章-4',text:'<p>1.4,智慧图书馆的发展值得期待[10]。</p>', id: id++ ,
        children: [
          { chapter: '第一章-4-1',text:'<p>1.4.1,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
          { chapter: '第一章-4-2',text:'<p>1.4.2,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
          { chapter: '第一章-4-3',text:'<p>1.4.3,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
          { chapter: '第一章-4-4',text:'<p>1.4.4,智慧图书馆的发展值得期待[10]。</p>', id: id++ },
        ]
      },
    ]
  },
  { chapter: '第二章',text:'<p>功能；功能 qengq阿萨德发沙师弟噶事对噶十多个阿萨德噶十多个。</p>', id: id++}
]).then(list => {
	dispatch(updateEditorData({ chapterListfForTree: mm(list), chapterListEditor: getNewEditor(list2html(list)) }))
})

// 获取章节主题
// SuggestSubjects
export const getSuggestSubjects = params => ajaxfn(getRandSuggestSubjects())

// 搜索
// Search
export const dispatchSearchList = (params) => dispatch => {
	dispatch(updateSearchData({ isSearching: true }))
	return ajaxfn(getRandContent(params)).then(res => {
		dispatch(updateSearchData({ searchList: res, isSearching: false }))
		// dispatch(toggleWrapperByKey(wrapperkey))
	})
}

// 智能改写
// Paraphrase
export const dispatchIntelList = (params) => dispatch => {
	dispatch(updateSearchData({ isSearching: true }))
	return ajaxfn(getRandIntel(params)).then(res => {
		console.log(res)
		dispatch(updateSearchData({ intelList: res, isSearching: false }))
		// dispatch(toggleWrapperByKey(wrapperkey))
	})
}

// QualityControl
export const qualityControl = params => ajaxfn([{check: '手机'}, {check: '科技'}, {check: '图书'}])

// 智能纠错--Correction
export const getCorrection = params => ajaxfn([{error: '图书馆的发展值得期待', correct: '值得期待图书馆的发展233'}])
// 参考文献
export const getReference = params => ajaxfn(['[1]图书馆[J].小学科学,2020(4):34-35.', '[2]朱颖.数字时代高校图书馆定位[J].内蒙古科技与经济,2020(1):140-140.'])


export {
  UPDATE_CHAPTER_LIST,
  UPDATE_EDITOR_DATA,
  UPDATE_CHAPTER_EDITOR_BY_LIST,
  UPDATE_CHAPTER_EDITOR_BY_HTML,
  UPDATE_SEARCH_DATA,

  SHOW_SEARCH_WRAPPER_BY_KEY,
  SHOW_GLOBAL_WRAPPER_BY_KEY,

  UPDATE_HOME_DATA,

	updateHomehData,
	updateEditorData,
  ajaxfn,
}
