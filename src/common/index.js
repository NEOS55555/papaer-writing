import React from 'react';
import HtmlToReact from 'html-to-react';
import { list2html, html2list } from './editor'
import eventBus from './eventBus'

const htmlToReactParser = new HtmlToReact.Parser(React);

export const SearchReplace = ({str='', keywords}) => htmlToReactParser.parse(str.replace(new RegExp(`(${keywords.join('|')})`, 'ig'), function (a) { return `<b class="keywrod">${a}</b>`}))

export {
	list2html,
	html2list,
	eventBus
}