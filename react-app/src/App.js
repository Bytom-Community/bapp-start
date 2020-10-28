import React, { useState } from 'react';


function App() {

  const [toAddress,setAddress] = useState('');
  const [amount,setAmount] = useState('');
  const [password,setPassword] = useState('');
  const [total,setTotalword] = useState('');
  const [program,setProgramword] = useState('');

  function handleAddressInput(event) {
    setAddress(event.target.value);
  }

  function handleAmountInput(event) {
    setAmount(event.target.value);
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  function handleTotalInput(event) {
    setTotalword(event.target.value);
  }

  function handleProgramInput(event) {
    setProgramword(event.target.value);
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
       "from": window.bytom.default_account.address,
       "amount":amount,
       "asset":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    }

    //console.log(window.bytom.default_account.accountId);

    return window.bytom.sendTransaction(params).then(function (resp) {
        alert(resp[0].transactionHash)
      }).catch(function (err){
       alert(err)
      })
    
    };

    const sendContract = async () => {
      var params = {
        input:[
         {"amount":total,"asset":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","type":"spend_wallet"}
         ],
       output:[
         {"amount":total,"asset":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","controlProgram":program,"type":"control_program"}
         ],
        gas: '0.00400000'
       }

      return window.bytom.sendAdvancedTransaction(params).then(function (resp) {
        alert(resp.transactionHash)
      }).catch(function (err){
        alert(err)
      })
    },

    const unlockContract = async () => {
      var params = {
        input:[
         {"amount":total,"asset":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","type":"spend_wallet"}
         ],
       output:[
         {"amount":total,"asset":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","controlProgram":program,"type":"control_program"}
         ]  ,
        gas: '0.00400000',
        args:[
            { 
            "type":"String",
            "rawData":{ 
               "value":sha3_256(password),
              }
            }
          ]
       }
      return window.bytom.sendAdvancedTransaction(params).then(function (resp) {
        alert(resp.transactionHash)
      }).catch(function (err){
        alert(err)
      })
    },

  return (
    
    <div className="App">
      <button onClick={connect}>连接Byone钱包</button>
      <button onClick={disconnect}>断开Byone钱包</button>
      <p>输入接收地址</p>
      <input onChange={handleAddressInput}></input>
      <p>输入发送数量</p>
      <input onChange={handleAmountInput}></input>
      <button onClick={sendTX}>发送交易</button>
      
      <p>输入存入数量</p>
      <input onChange={handleTotalInput}></input>
      <p>输入合约程序</p>
      <input onChange={handleProgramInput}></input>

      <button onClick={sendContract}>存入合约</button>
      <p>输入口令</p>
      <input onChange={handlePasswordInput}></input>
      <button onClick={unlockContract}>解锁合约资产</button>
    </div>
  );
}


export default App;

//document.addEventListener('chromeBytomLoaded', bytomExtension => {
//  window.bytom.enable().then(accounts => {
//    window.accounts = accounts
//  })
//});
