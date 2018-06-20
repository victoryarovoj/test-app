import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { languageSwitchItem, connectionStatus } from '../actions/test-action';
import { bindActionCreators } from 'redux';
import Tabs from './Tabs';
import Pane from './Tab';
import Ts from './Ts';
import Dropdown from './Dropdown';
import Uploader from '../containers/Uploader'
import PrivateKey from './PrivateKey'

class TestBody extends Component {
	constructor(props) {
		super(props);

		this.state={
			connected: this.props.connectionStatus
		}
	}

	_dropDownrender () {
		return (
			<a className="dropdown-toggle" id="dropDownMenuItemsLabel" data-toggle="dropdown" aria-controls="dropDownMenuItemsContent" aria-expanded="false" role="button">
				<span className="caret">
					{i18next.t("anotherOperations" : "anotherOperations")}
				</span>
			</a>
		);
	}

	render() {
		if (this.state.connected) {
			return (<div></div>);
		}
		return (
			<div>
				<div id="allTabsContainer">
				<Tabs selected={1}>
				  <Pane label="PrivateKey">
				    <PrivateKey />
				  </Pane>
				  <Pane label={i18next.t("verifyDs" : "verifyDs")}>
				    <Ts />
				  </Pane>
				  <Pane label={i18next.t("createDs" : "createDs")}>
				    <Uploader />
				  </Pane>
				  <Pane label={<select className="select" style={{textAlign: "center", textAlignLast: "center"}} onChange={this.onDropdownSelected}>
				            <option value="1">1</option>
				            <option value="2">2</option>
				            <option value="3">3</option>       
				        </select>}>
				  </Pane>
				</Tabs>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
    return {
        dafaultState: state.dafaultState,
        connection: state.connectionStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
	    languageSwitchItem,
	    connectionStatus
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestBody);