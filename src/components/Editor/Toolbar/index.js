import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import { editorToolbarList } from '@/constants'


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
            editorToolbarList.map(it => <li key={it.key} onClick={() => this.state.onClick(it)} >{it.name}</li>)
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