import React, { Component, Fragment } from 'react';
import './index.scss'
import { connect } from 'react-redux';
import Search from './Search'

class Index extends Component {
	render () {
		const {  isShowWrapper } = this.props;
		const { search, material, thinking, anthology, verse, translate } = isShowWrapper;
		return (
			<Fragment>
				{
					(search || material || thinking || anthology || verse || translate)
					&& <div className="query-content">
						{search && <Search />}
					</div>
				}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
  const { isShowWrapper } = state.search
  return {
    isShowWrapper
  };
};

export default connect(mapStateToProps)(Index);