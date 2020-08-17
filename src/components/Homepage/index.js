import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import { Select } from '@/common/components'
import { updateHomehData, getResearchSelects } from '@/store/actions'
import { paperTypeOptions } from '@/constants'
import KeySearch from './search'
import './index.scss'


class Index extends Component {

	research1Change = researchFieldId1 => {
		const { updateHomehData } = this.props;
		updateHomehData({ researchFieldId1 })
		getResearchSelects({id: researchFieldId1}).then(researchFieldOpts2 => updateHomehData({ researchFieldOpts2, researchFieldId2: -1, researchFieldOpts3: [], researchFieldId3: -1 }))
	}
	research2Change = researchFieldId2 => {
		const { updateHomehData } = this.props;
		updateHomehData({ researchFieldId2 })
		getResearchSelects({id: researchFieldId2}).then(researchFieldOpts3 => updateHomehData({ researchFieldOpts3, researchFieldId3: -1 }))
	}
	research3Change = researchFieldId3 => {
		const { updateHomehData } = this.props;
		updateHomehData({ researchFieldId3 })
	}

	startWrite = () => {
		// console.log(this.props)
		this.props.history.push('/titlerec')
	}

	componentDidMount () {
		const { updateHomehData } = this.props;
		getResearchSelects().then(researchFieldOpts1 => updateHomehData({ researchFieldOpts1 }))
	}
	paperTypeChange = paperTypeId => this.props.updateHomehData({ paperTypeId })
	render () {
		const { researchFieldOpts1, researchFieldOpts2, researchFieldOpts3 } = this.props;
		const { paperTypeId, school, major, researchFieldId1, researchFieldId2, researchFieldId3, keywords } = this.props;
		const { updateHomehData } = this.props;
		return (
			<div className="self-wrapper">
				<div className="self-line">
					<span className="prev-txt">论文类型：</span>
					<Select 
						value={paperTypeId} 
						style={{ width: 120 }} 
						onChange={this.paperTypeChange}
						options={paperTypeOptions} 
					/>
				</div>
				<div className="self-line">
					<span className="prev-txt">学校：</span>
					<Input value={school} className="input" onChange={e => updateHomehData({ school: e.target.value })} />
				</div>
				<div className="self-line">
					<span className="prev-txt">专业：</span>
					<Input value={major} className="input" onChange={e => updateHomehData({ major: e.target.value })} />
				</div>
				<div className="self-line">
					<span className="prev-txt">研究领域：</span>
					<Select 
						value={this.researchFieldId1} 
						style={{ width: 120 }} 
						onChange={this.research1Change}
						options={researchFieldOpts1} 
					/>
			    <Select 
						value={this.researchFieldId2} 
						style={{ width: 120 }} 
						onChange={this.research2Change}
						options={researchFieldOpts2} 
					/>
			    <Select 
						value={this.researchFieldId3} 
						style={{ width: 120 }} 
						onChange={this.research3Change}
						options={researchFieldOpts3} 
					/>
				</div>
				<div className="self-line">
					<span className="prev-txt">关键词：</span>
					<KeySearch onChange={keywords => updateHomehData({ keywords })} className="input" />
				</div>
				<div className="self-footer">
					<Button type="primary" onClick={this.startWrite}>开始写作</Button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));