import React, {useEffect, useState } from 'react';
import './App.css';
import CandyMachine from './CandyMachine'
import Arcade from './assets/arcade.js'

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window
      
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!")

          const response = await solana.connect({ onlyIfTrusted: true })
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          )

          setWalletAddress(response.publicKey.toString())
        }
      } else {
        alert("Solana object not found! Get a PHantom Wallet!")
      }
    } catch (err) {
      console.log(err)
    }
  } 

  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      const response = await solana.connect()
      console.log("Connected with Public Key:", response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      {"C:\\>_ CONNECT WALLET"} 
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])


  const [machineClicked, setMachineClicked] = useState(false)
  const [screenActivated, setScreenActivated] = useState(false)
  
  useEffect(() => {
    if (machineClicked) {
      setTimeout(() => {
        setScreenActivated(true)
      }, 1500)
    }
  }, [machineClicked])

  return (
    <div className={`${screenActivated ? "ActivatedApp": "App"}`}>
      <div className="container">
        {screenActivated ? (
          <div className="header-container">
            {!walletAddress && (
              <div style={{justifyContent: "center", display: "flex", marginBottom: "20vh"}}>
                <div style={{flexDirection: "column"}}>
                  <h1>DOS GAME NFTs</h1>
                  {renderNotConnectedContainer()}
                </div>
              </div>
            )}
            {walletAddress && <CandyMachine walletAddress={window.solana}/>}
          </div>
        ) : (
          <div className="header-container">
            <p className="header" style={{color: "#1f1f1f"}}>Click the machine</p>
            <div onClick={() => setMachineClicked(true)}>
              <Arcade machineClicked={machineClicked}/>
            </div>
          </div>
        )}
        

            
        
       
      </div>
    </div>
  );
};

export default App;
