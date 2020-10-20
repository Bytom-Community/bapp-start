import React, { useState } from 'react';


function App() {

  const [toAddress,setAddress] = useState('');
  const [amount,setAmount] = useState('');

  function handleAddressInput(event) {
    setAddress(event.target.value);
  }


  function handleAmountInput(event) {
    setAmount(event.target.value);
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

  const sendTX = async () => {

    var params = {
       "to":toAddress,
       "from": window.bytom.default_account.accountId,
       "amount":amount,
       "asset":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    }

    console.log(window.bytom.default_account.accountId);

    return window.bytom.sendTransaction(params).then(function (resp) {
        alert(resp[0].transactionHash)
      }).catch(function (err){
        alert(err)
      })
    
    };

  return (
    
    <div className="App">
      <button onClick={connect}>连接Byone钱包</button>
      <button onClick={disconnect}>断开Byone钱包</button>
      <p>输入接收地址</p>
      <input onChange={handleAddressInput}></input>
      <p>输入发送数量</p>
      <input onChange={handleAmountInput}></input>
      <button onClick={sendTX}>发送交易</button>
    </div>
  );
}


export default App;

//document.addEventListener('chromeBytomLoaded', bytomExtension => {
//  window.bytom.enable().then(accounts => {
//    window.accounts = accounts
//  })
//});
