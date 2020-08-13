import React, { Component, Fragment } from 'react';
import './index.scss'
import { connect } from 'react-redux';
import Summary from './Summary'
import Reference from './Reference'
import ExportType from './ExportType'
import { toggleGlobalWrapperByKey } from '@/store/actions'
import { CloseOutlined } from '@ant-design/icons';

class Index extends Component {
	render () {
		const {  isShowGlobalWrapper, toggleGlobalWrapperByKey } = this.props;
		const { summary, reference, exporttype } = isShowGlobalWrapper;
		return (
			<Fragment>
				{
					(summary || reference || exporttype)
					&& <div className="query-content global-query">
						<div className="query-top"><CloseOutlined onClick={() => toggleGlobalWrapperByKey()} className="close" /></div>
						{summary && <Summary />}
						{reference && <Reference />}
						{exporttype && <ExportType />}
					</div>
				}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
  const { isShowGlobalWrapper } = state.search
  return {
    isShowGlobalWrapper
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleGlobalWrapperByKey (data) {
      return dispatch(toggleGlobalWrapperByKey(data))
    },
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);