import React from 'react';
import HtmlToReact from 'html-to-react';
import { list2html, html2list, json2list, getKeywordsIndex } from './editor'
import eventBus from './eventBus'

const htmlToReactParser = new HtmlToReact.Parser(React);

export const SearchReplace = ({str='', keywords=[]}) => htmlToReactParser.parse(str.replace(new RegExp(`(${keywords.join('|')})`, 'ig'), function (a) { return `<b class="keywrod">${a}</b>`}))

// 编辑器的 图片 宽高存放
// {id: {width, height}}
const editorImgMap = {}

const setEditorImgMap = (key, width, height) => editorImgMap[key] = {width, height}
const getEditorImgMap = key => (editorImgMap[key] || {width: 'auto', height: 'auto'})

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (!file) {
		return resolve(null)
    }
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export {
	list2html,
	html2list,
	json2list,
	getKeywordsIndex,
	eventBus,
	setEditorImgMap,
	getEditorImgMap,
}





