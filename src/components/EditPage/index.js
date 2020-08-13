import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import Editor from '@/components/Editor'
import EditLeftNav from '@/components/EditLeftNav'
import QueryComp from '@/components/QueryComp'
import GlobalComp from '@/components/GlobalComp'
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
				<QueryComp />
				<div className="editor-wrapper">
					<EditLeftNav />
					<Editor />
					<GlobalComp />
				</div>
			</div>
		)
	}
}




export default Index;