import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Tabs extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    }
}
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
    children: PropTypes.array,
    children: PropTypes.element
  }
  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'nav-link active' : 'nav-link');
      return (
        <li key={index} className="nav-item">
          <a href={null}
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="nav nav-tabs">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }
  _renderContent() {
    return (
      <div>
        {this.props.children[this.state.selected]}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}

export default Tabs