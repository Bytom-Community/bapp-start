import React from 'react';

function App() {
  this.handleClick = this.handleClick.bind(this);
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  return (
    
    activateLasers
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
