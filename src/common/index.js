import BraftEditor from 'braft-editor'
/*import { SPLIT_LINE, getSplitChildLine } from '@/constants'

function html2split (str='', cur) {
	if (!str) {
		return
	}
	let a = str.match(/<[^>]+\>/g) || []
	let start1 = str.indexOf(a[0])
	let start2 = str.indexOf(a[1])
	const title = str.slice(start1 + a[0].length, start2)
	return {
		chapter: title,
		text: str.slice(start2 + a[0].length+1),
		title 	// 用于树形结构
	}
}

function html2list (str, h=1) {
	var arr = str.split(getSplitChildLine(h)).map(it => ({chtml: it}))
	for (let i = 0, len = arr.length; i < len; i++) {
		let it = arr[i].chtml.split(SPLIT_LINE)
		if (it.length > 1) {
			arr[i].children = html2list(it.slice(1).join(SPLIT_LINE), h+1)
			arr[i] = {...arr[i], ...html2split(it[0])}
			delete arr[i].chtml
			// arr[i].chtml = html2split(it[0]);
		} else {
			arr[i] = {...arr[i], ...html2split(arr[i].chtml)}
			delete arr[i].chtml
		}
	}
	return arr;
}*/

const headerType = ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six', 'header-seven']
function transText (blocks) {
	return BraftEditor.createEditorState({blocks, entityMap: {}}).toHTML()

}
function transTitle (arr, h) {
	let blocks = [];
	for (let i = 0, len = arr.length; i < len; i++) {
		if (headerType.indexOf(arr[i].type) !== -1) {
			return transText(blocks)
		}
		blocks.push(arr[i])
	}
	return transText(blocks)
}

function json2List (arr, h=0) {
	let indexArr = [], tempArr= [];
	// 偶数个吗我曹
	for (let i = 0, len = arr.length; i < len; i++) {
		let it = arr[i]
		let obj = {};
		if (it.type === headerType[h]) {
			indexArr.push(i)
		}
	}
	// h == 0 &&console.log(indexArr)
	let len = indexArr.length
	if (len === 0) {
		return tempArr
	}
	for (let i = 0; i < len - 1; i++) {
		let m = indexArr[i], n = m + 1
		const title = arr[m].text
		let obj = {
			title,
			chapter: title,
			text: transTitle(arr.slice(n, indexArr[i+1])),
			expanded: true
		}
		if (indexArr[i + 1] - m > 2 ) {
			obj.children = json2List(arr.slice(n+1, indexArr[i+1]), h+1)
		}
		tempArr.push(obj)
	}
	if (indexArr[len-1] < arr.length - 2) {		// 有子节点
		let mar = arr.slice(indexArr[len-1]+1)
		const title = arr[indexArr[len-1]].text
		tempArr.push({
			title,
			chapter: title,
			text: transTitle(mar),
			children: json2List(arr.slice(indexArr[len-1]+1), h+1),
			expanded: true
		})
	} else {
		const title = arr[indexArr[len-1]].text
		tempArr.push({
			title,
			chapter: title,
			text: transTitle([arr[indexArr[len-1]+1]]),
			expanded: true
		})
	}

	return tempArr
}

function list2html (arr, h=1) {
  var str=''
  for (let i = 0, len = arr.length; i < len; i++) {
    let it = arr[i]
    str += `<h${h}>${it.chapter}</h${h}>${it.text}`
    if (it.children) {
      str += list2html(it.children, h+1)
    }
  }
  return str
}

const html2list = json2List

export {
	list2html,
	html2list,
}