import React from 'react';

function App() {
  return (
    
    <div className="App">
      <button onClick={connect}>连接Byone钱包</button>
      <button onClick={disconnect}>断开Byone钱包</button>
    </div>
  );

}

//连接钱包
const connect = async () => {
  if (window.bytom) {
    try {
      const res = await window.bytom.enable();
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject('byone not available');
  }
};

//断开钱包
const disconnect = async () => {
  if (window.bytom) {
    try {
      const res = await window.bytom.disable();
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject('byone not available');
  }
};

export default App;

//document.addEventListener('chromeBytomLoaded', bytomExtension => {
//  window.bytom.enable().then(accounts => {
//    window.accounts = accounts
//  })
//});
