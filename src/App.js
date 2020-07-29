import React from 'react';
import 'antd/dist/antd.css';
import 'medium-editor/dist/css/medium-editor.css'

import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import 'braft-extensions/dist/color-picker.css'
import 'braft-extensions/dist/table.css'

import './App.scss';
import Routers from '@/common/Routers'

function App() {
  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
