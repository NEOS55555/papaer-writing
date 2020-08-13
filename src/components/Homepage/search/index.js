import React, { Component } from 'react';
import { Input, Popover, Button } from 'antd';
import { getSuggestWords } from '@/store/actions'
import $ from 'jquery';

class Index extends Component {
	state = {
		value: '',
		searchVal: '',
		list: [],
	}
	componentDidMount () {
	}
	search = text => getSuggestWords(text).then(list => this.setState({ list }))
	onChange = e => {
		clearTimeout(this.timmer)

		const arr = e.target.value.replace('；', ';').split(';');
		const valueArr = arr.filter((it, idx) => it || arr[idx-1])
		const value = valueArr.join(';')
		this.setState({ value })
		this.props.onChange(value)
	}

	timmer = null;
	searchChange = e => {
		clearTimeout(this.timmer)
		const text = e.target.value
		this.setState({ searchVal: text })
		
		this.timmer = setTimeout(() => {
			text && this.search(text);
		}, 300)
	}
	render () {
		const { value, list, searchVal } = this.state;
		return (
			<div className="search-input-wrapper ">
				<Input placeholder="多个关键词请用半角分号隔开" className="input" value={value} onChange={this.onChange} />
				<Popover trigger="click" placement="rightTop" content={
					<div className="search-input-words-ctn">
						<Input value={searchVal} onChange={this.searchChange} />
						<ul>
							{
								list.map((txt, idx) => <li onClick={() => {
									this.setState({
										list: list.filter(it => it !== txt),
										value: value + ';' + txt
									})
									this.props.onChange(value + ';' + txt)
								}} key={idx}>{txt}</li>)
							}
						</ul>
					</div>
				}>
					<Button type="link">点击此处查询关键字</Button>
				</Popover>
				
			</div>
		)
	}
}

/*const mapStateToProps = state => {
  // const { isSort, chapterListEditor } = state.home
  // console.log('s')
  return {
    ...state.home
    // chapterList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateHomehData (data) {
      return dispatch(updateHomehData(data))
    }
  };
};*/

// export default connect(mapStateToProps, mapDispatchToProps)(Index);
export default (Index);