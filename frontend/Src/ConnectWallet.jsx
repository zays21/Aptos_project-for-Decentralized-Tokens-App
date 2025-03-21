import React, { useState, useEffect } from 'react';

const ConnectWallet = ({ setWalletAddress }) => {
  const [connected, setConnected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Watch connected → trigger timer to hide message after 3s
  useEffect(() => {
    if (connected) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide message after 3 sec
      }, 3000);
      return () => clearTimeout(timer); // Clean timer
    }
  }, [connected]);

  const checkWalletConnection = async () => {
    if (window.aptos) {
      try {
        const account = await window.aptos.account();
        setWalletAddress(account.address);
        setConnected(true);
      } catch {}
    } else {
      alert("Aptos wallet not found!");
    }
  };

  const handleConnect = async () => {
    try {
      const response = await window.aptos.connect();
      setWalletAddress(response.address);
      setConnected(true);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  return (
    <div className="card">
      {showMessage ? (
        <h2 className="text-gray-900">Wallet Connected ✅</h2>
      ) : (
        <>
          {!connected && (
            <button onClick={handleConnect} className=''>Connect your Wallet</button>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
