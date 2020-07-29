import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { updateEditorData, updateChapterList, updateEditorEdit } from '@/store/actions'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import './index.scss'
/*import { DndProvider } from 'react-dnd'
import React, { Component, Fragment, useRef, useState, useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'*/
// import { sortable } from 'react-sortable';
/*function clearNull (arr) {
	let tempArr = [];
	for (let i = 0, len = arr.length; i < len; i++) {
		if (arr[i] !== undefined) {
			if (arr[i].children) {
				arr[i].children = clearNull(arr[i].children)
			}
			tempArr.push(arr[i])
		}
	}
	return tempArr
}
// const { SubMenu } = Menu;

const Item = (props) => (<li {...props}>{props.item.chapter}
				{
					props.item.children && props.item.children.length > 0 && <PaintList onSort={props.onSort} list={props.item.children} />
				}
			</li>)

const SortableItem = sortable(Item);

class PaintList extends Component {
	timmer = null;
	onSortItems = chapterList => {
		clearTimeout(this.timmer)
		this.timmer = setTimeout(() => {
			this.props.onSort(clearNull(chapterList))
		}, 500)
		
	}
	render () {
		const { list, onSort } = this.props;
		return (<ul>
			{
				list.map((it, idx) => <SortableItem
					key={it.id} 
					item={it} 
					onSort={onSort}
		      onSortItems={this.onSortItems}
		      items={list}
		      sortId={it.id}
				/>)
			}
		</ul>)
	}
}
*/

class PaintList extends Component {
	render () {
		const { list } = this.props;
		return (<ul>
			{
				list.map((it, idx) => <li key={idx}>{it.title} {it.children && it.children.length > 0 && <PaintList list={it.children} />}</li>)
			}
		</ul>)
	}
}


class Index extends Component {
	/*state = {
		isSort: false
	}*/
	handleClick = val => {
		console.log(val)
	}
	render () {
		// const { isSort } =  this.state;
		const { isSort, chapterListfForTree, updateEditorData, updateChapterList, updateEditorEdit } = this.props;
		console.log(chapterListfForTree)
		return (
			<div className="edltleft-nav">
				<p className="title">目录</p>
				<Button onClick={() => updateEditorData({ isSort: !isSort })} >{isSort ? '确定' : '排序'}</Button>
				<div style={{ height: '100%' }}>
					{
						isSort 
						?	<SortableTree
								scaffoldBlockPxWidth={15}
								rowHeight={40}
			          treeData={chapterListfForTree}
			          // onDragStateChanged={a => console.log(a)}
			          onChange={(treeData, type) => {
			          	console.log(treeData, type)
			          	updateEditorData({ chapterListfForTree: treeData })
			          	// updateChapterList(treeData)
			          	// 这个修改的时候，会默认执行编辑器的onchange，也就自行改变了数组
			          	updateEditorEdit(treeData)
			          }}
			        />
						: <PaintList list={chapterListfForTree} />

					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  const { isSort, chapterListfForTree } = state.editor
  // console.log('s')
  return {
  	isSort,
    chapterListfForTree,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateEditorData (data) {
      return dispatch(updateEditorData(data))
    },
    /*updateChapterList (data) {
      return dispatch(updateChapterList(data))
    },*/
    updateEditorEdit (data) {
      return dispatch(updateEditorEdit(data))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index)
// export default (Index);
// export default Index;