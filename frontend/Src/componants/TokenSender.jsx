import React, { useState } from 'react';

const TokenSender = ({ walletAddress }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const sendTokens = async () => {
    if (!walletAddress) return alert("Connect your wallet first!");

    try {
      const payload = {
        type: "entry_function_payload",
        function: "0x1::aptos_account::transfer",
        type_arguments: [],
        arguments: [recipient, parseInt(amount * 1000000)],
      };

      const transaction = await window.aptos.signAndSubmitTransaction(payload);
      setTxHash(transaction.hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-800 to-gray-900 shadow-xl rounded-xl p-6 mb-6 w-full max-w-3xl mx-auto border border-gray-700 text-white">
  <h2 className="text-2xl font-semibold mb-6 text-green-400">Send Tokens</h2>

  <input
    type="text"
    placeholder="Recipient Address"
    value={recipient}
    onChange={(e) => setRecipient(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <input
    type="number"
    placeholder="Amount (APT)"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <button
    onClick={sendTokens}
    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
  >
    Send Tokens
  </button>

  {txHash && (
    <p className="mt-4 text-sm text-gray-300">
      ✅ Transaction Sent!{" "}
      <a
        className="text-green-400 underline"
        href={`https://explorer.aptoslabs.com/txn/${txHash}`}
        target="_blank"
        rel="noreferrer"
      >
        View
      </a>
    </p>
  )}
</div>


  );
};

export default TokenSender;
