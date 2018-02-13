import React from 'react';
import ReactDOM from 'react-dom';

import LitIpsum from '../dist/index';
import './LitIpsumDemo.css';

class LitIpsumDemo extends React.Component {
  render() {
    return <LitIpsum paragraphs={4} book='evaline' style={{fontFamily: 'Arial'}}/>;
  }
}

ReactDOM.render(<LitIpsumDemo/>, document.querySelector('#root'));
