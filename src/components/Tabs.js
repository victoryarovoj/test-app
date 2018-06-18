import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Tabs extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected: 0
    }
}
  displayName: 'Tabs'
  getDefaultProps() {
    return {
      selected: 0
    };
  }
  getInitialState() {
    return {
      selected: this.props.selected
    };
  }
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }
  propTypes: {
    selected: PropTypes.number,
    children: PropTypes.array
  }
  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index} role="presentation">
          <a href="#" data-toggle="tab" role="tab" 
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels" className="nav nav-tabs" role="tablist">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }
  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }
  render() {
    return (
      <div className="tab-content">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}

export default Tabs