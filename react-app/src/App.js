import React from 'react';

function App() {

  return (
    
    <div className="App">
      <button id="byone-add"> </button>
    </div>
  );
}

export default App;
document.addEventListener('chromeBytomLoaded', bytomExtension => {
  window.bytom.enable().then(accounts => {
    window.accounts = accounts
  })
});
