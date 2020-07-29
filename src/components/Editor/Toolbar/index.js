import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';

const list = [
  {
    key: 'material',
    name: '找素材'
  },
  {
    key: 'thinking',
    name: '找思路'
  },
  {
    key: 'anthology',
    name: '找文集'
  },
  {
    key: 'verse',
    name: '找金句'
  },
  {
    key: 'translate',
    name: '改写/英译中'
  },
  {
    key: 'collect',
    name: '收藏'
  }
]

class Toolbar extends Component {
  toolbar = createRef()
  constructor (props) {
    super(props);
    this.parentNode = props.parentNode
    this.state = {
      onClick: () => {}
    }
  }

  setClick = (onClick) => {
    this.setState({
      onClick
    })
  }
  render () {
    return (
      <div ref={this.toolbar} className="hide" id="toolbar">
        <ul>
          {
            list.map(it => <li key={it.key} onClick={() => this.state.onClick(it)} >{it.name}</li>)
          }
        </ul>
      </div>
    )
  }
}

let div = document.createElement('div');
let props = {
   parentNode: div
};
 
let bar = ReactDOM.render(React.createElement(
    Toolbar,
    props
),div);
 
export default bar;
// export default Toolbar