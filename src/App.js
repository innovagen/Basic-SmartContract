import React, { Component } from 'react';
import './App.css';

import Web3Helper from './config/web3'


class App extends Component {

  state = {
    userAddress: '',
    fromAddress: '',
    ether: '',
    userBalance: '',
  }



  async componentDidMount() {
    const web3 = await Web3Helper.getWeb3();
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const convertToEther = await web3.utils.fromWei(balance, 'ether');

    this.setState({
      userAddress: accounts[0],
      userBalance: convertToEther
    })
  }

  handleChangeEdit = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  sendEther = async () => {
    const { userAddress, userBalance, ether } = this.state
    const web3 = await Web3Helper.getWeb3();
    if (userAddress !== '' && ether !== '') {
      if (userBalance >= ether) {
        web3.eth.sendTransaction({
          from: userAddress,
          to: this.state.fromAddress,
          value: ether
        })
      } else {
        alert("Your ETH is not enongh")
      }
    } else {
      alert("Please add address and amount of ETH that you need to send.")
    }
  }

  getNewAddress = async () => {
    const web3 = await Web3Helper.getWeb3();
    const newAddress = await web3.eth.accounts.create();
    console.log(newAddress)
  }

  render() {
    if (!this.state.userAddress) return <div class="App">METAMASK IS LOADING... IF YOU NOT PLASE LOGIN</div>
    return (
      <div className="App">
        <label>My Address: {this.state.userAddress}</label><br />
        <label>Your Balance : {this.state.userBalance + " ETH"}</label><br />
        <h1>WITHDRAW</h1>
        <label>Address: </label>
        <input type="name" name="sendEther" value={this.state.value} placeholder="0x00" onChange={this.handleChangeEdit}></input><br />
        <label>Amout: </label>
        <input type="name" name="ether" value={this.state.value} placeholder="0" onChange={this.handleChangeEdit}></input><br />
        <button type="button" onClick={this.sendEther} >Send</button>
        <h1>YOUR WALLET</h1>
        <button type="button" onClick={this.getNewAddress}>Get New Address</button><br />
      </div>
    );
  }
}

export default App;
