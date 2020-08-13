import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Spin, Input, message } from 'antd';
// import { eventBus } from '@/common'
import { ajaxfn } from '@/store/actions'
import cover from './cover.png'

let id = 0;
function getRandData (val) {
	let arr = [];
	for (let i = 0; i < 10; i++) {
		arr.push({
			id: id++,
			name: val+Math.floor(Math.random() * 100)
		})
	}
	return arr;
}

function getNeedList (arr=[]) {
	for (let i = 0, len = arr.length; i < len; i++) {
		delete arr[i].title
		delete arr[i].expanded

		getNeedList(arr[i].children)
	}
}

class Index extends Component {
	state = {
		list: [],
		isSearching: false,
		selectedId: null,
	}

	componentDidMount () {
		this.onSearch()
	}

	onSearch = (val='') => {
		this.setState({ isSearching: true })
		ajaxfn(getRandData(val)).then(list => this.setState({ list })).finally(er => this.setState({ isSearching: false }))
	}

	exportClick = () => {
		const { selectedId } = this.state;
		const { chapterListfForTree } = this.props
		if (selectedId === null) {
			return message.error('请选择一个模板！')
		}
		let list = JSON.parse(JSON.stringify(chapterListfForTree))
		getNeedList(list)

		console.log(list)
	}

	render () {
		const { list, isSearching, selectedId } = this.state;
		return (
			<div className="exporttype-wrapper">
				<p className="title">格式模板</p>
				<div className="list-wrapper">
					<Input.Search onSearch={this.onSearch} />
					<Spin spinning={isSearching}>
						<ul className="list">
							{
								list.map(it => <li 
										key={it.id} 
										className={it.id === selectedId ? 'active' : ''} 
										onClick={() => this.setState({ selectedId: it.id })} 
									>
										<span>{it.name}</span>
									</li>
								)
							}
						</ul>
						<div>
							<Button type="link" onClick={this.exportClick} >导出word文档</Button>
						</div>
					</Spin>
				</div>
			</div>
		)
	}
}



const mapStateToProps = state => {
  const { chapterListfForTree } = state.editor
  return {
    chapterListfForTree
  };
};

export default connect(mapStateToProps)(Index);