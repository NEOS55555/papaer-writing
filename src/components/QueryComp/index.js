import React, { Component, Fragment } from 'react';
import './index.scss'
import { connect } from 'react-redux';
import Search from './Search'
import IntelRewrite from './IntelRewrite'
import { toggleWrapperByKey } from '@/store/actions'
import { CloseOutlined } from '@ant-design/icons';

class Index extends Component {
	render () {
		const {  isShowWrapper, toggleWrapperByKey } = this.props;
		const { search, rewrite } = isShowWrapper;
		return (
			<Fragment>
				{
					(search || rewrite)
					&& <Fragment>
						<div className="query-content query-search-ctn">
							<div className="query-top"><CloseOutlined onClick={() => toggleWrapperByKey()} className="close" /></div>
							{search && <Search />}
							{rewrite && <IntelRewrite />}
						</div>
					</Fragment>
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
const mapDispatchToProps = dispatch => {
  return {
    toggleWrapperByKey (data) {
      return dispatch(toggleWrapperByKey(data))
    },
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);