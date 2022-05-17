import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'


const greeterAddress = "0x49873ab61eC52A042Eef0662D26e3bf35eF02a34"
const tokenAddress = "0x9365472f4845594b0A82a89182Bdb9dd2945dA86"




function App() {

  const [greeting, setGreetingValue] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
        document.getElementById("demo2").innerHTML = data.toString();

      } catch (err) {
        console.log("Error: ", err)

      }
    }    
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      document.getElementById("demo").innerHTML = "Balance: " +   balance.toString();

    }
  }



  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }


  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);

    }
  }



  return (

<div className="main-div">

<div className="row">
<div className="App">
    <header className="App-header">
      
        <div className="column">

        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
    <button onClick={fetchGreeting}>Fetch Greeting</button>
    <button onClick={setGreeting}>Set Greeting</button>
    <h3 id="demo2"> </h3>

    
        </div>

        <div className="column">
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <br></br>
        <br></br>

    <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />

    <button onClick={getBalance}>Get Balance</button>
    <button onClick={sendCoins}>Send Coins</button>
    
    </div>
  

    <h3 id="demo"> </h3>

    </header>
</div>
</div>

</div>















  );
}

export default App;
