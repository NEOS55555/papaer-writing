import React, { Component } from 'react';
import './index.scss'
import Search from './Search'

class Index extends Component {
	handleChange = val => {
		console.log(val)
	}
	render () {
		return (
			<div className="search-content">
				<Search />
			</div>
		)
	}
}

export default Index;