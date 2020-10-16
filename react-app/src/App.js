import React from 'react';

function App() {
  return (
    <div className="App">
      <button onClick={connect}>连接Byone钱包</button>
    </div>
  );

}

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

export default App;
