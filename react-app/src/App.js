import React from 'react';

function App() {

  return (
    
    <div className="App">
      <button onClick={connect}>连接Byone钱包</button>
      <button onClick={disconnect}>断开Byone钱包</button>
      <button onClick={sendTX}>发送交易</button>
      <button onClick={signTx}>交易签名</button>
      <button onClick={signMsg}>消息上链</button>
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

const sendTX = async () => {
  var toAddress = 'tm1qyc70mukpuldjz4wsguc5unmwx9qcz9fzl9kccn'
  if(window.bytom.chain ==='bytom'&& window.bytom.net ==='mainnet'){
    toAddress = 'bm1qwkg65ev7vvp6ks8l20hut4l3wwm9p4zyrmvhxn'
  }else if(window.bytom.chain ==='vapor'&& window.bytom.net ==='mainnet'){
    toAddress = 'vp1qwkg65ev7vvp6ks8l20hut4l3wwm9p4zyg6u2r9'
}
          
var params = {
  to: toAddress,
  from: window.bytom.defaultAccount.address,
  amount:'0.200000000',
  asset: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
}

window.bytom.sendTransaction(params).then(function (resp) {
   // alert(resp[0].transactionHash)
  }).catch(function (err){
  //  alert(err)
  })
};

const signTx = async (data) => {
  var data = {
    "raw_transaction":"070100010160015e45b96d445fa2694914600a36b062527d5d7863ea263cdd622734035a4896f377ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa895b1c03f0101160014bddc10a882dd255b8d4a5fcf6032b11d5ef6c9b5220120ae3087a21b22e8d0290fdb330b9523ff3c3fa2813338fcd9321101578a45b89402013f003dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80c3bbc20601160014d195c2fa553dec7dbf0248711fb96046fcf7d66100013f003dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa89dddfd3801160014bddc10a882dd255b8d4a5fcf6032b11d5ef6c9b500",
  "signing_instructions":[
    {"derivation_path":["2c000000","99000000","01000000","00000000","01000000"],
    "sign_data":["787620f0e9e471b064de5921f9765f2bfb18f765cddd8d7cfe40911def7735e6"]}]
 }
  try {
    const res = await window.bytom.signTransaction(data);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signMsg = async (data) => {
  var data = {
    address:window.bytom.defaultAccount.address,
    message:'Hello World'
  }
  try {
    const res = await window.bytom.signMessage(data);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default App;

//document.addEventListener('chromeBytomLoaded', bytomExtension => {
//  window.bytom.enable().then(accounts => {
//    window.accounts = accounts
//  })
//});
