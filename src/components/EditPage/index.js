import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import Editor from '@/components/Editor'
import EditLeftNav from '@/components/EditLeftNav'
import SearchComp from '@/components/SearchComp'
// import {  } from '@/store/actions'
import './index.scss'

const { Option } = Select;

class Index extends Component {
	handleChange = val => {
		console.log(val)
	}
	render () {
		return (
			<div className="editpage-wrapper">
				<EditLeftNav />
				<div className="editor-wrapper">
					<SearchComp />
					<Editor />
				</div>
			</div>
		)
	}
}




export default Index;