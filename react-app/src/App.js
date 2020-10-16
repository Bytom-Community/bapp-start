import React from 'react';

function App() {
  return (
    
    <div className="App">
      <button onClick={activateLasers}> 
        连接钱包
      </button>
    </div>
  );
}

export default App;
document.addEventListener('chromeBytomLoaded', bytomExtension => {
  window.bytom.enable().then(accounts => {
    window.accounts = accounts
  })
});
