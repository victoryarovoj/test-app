import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next'


class Dropdown extends Component {

	render () {
		return (
			<a className="dropdown-toggle" id="dropDownMenuItemsLabel" data-toggle="dropdown" aria-controls="dropDownMenuItemsContent" aria-expanded="false" role="button">
				<span className="caret">
					{i18next.t("anotherOperations" : "anotherOperations")}
				</span>
			</a>
		);
	}
}

export default connect()(Dropdown);