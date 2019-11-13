import React from 'react';
import './App.css';

import MessageList from './components/MessageList'
import Loading from './components/Loading'
import BottomBar from './components/BottomBar'

function App() {
  return (
    <div className="App" style={{
      width: '100%'
    }}>
      <MessageList />
      <BottomBar />
    </div>
  );
}
export default App;
