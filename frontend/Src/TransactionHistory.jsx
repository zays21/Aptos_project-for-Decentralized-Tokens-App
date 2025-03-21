import React, { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

const TransactionHistory = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (walletAddress) {
      fetchTransactions();
    }
  }, [walletAddress, transactions]);

  const fetchTransactions = async () => {
    try {
      const res = await client.getAccountTransactions(walletAddress);
      const latestTxs = res.slice(-5); // Last 5 transactions
      setTransactions(latestTxs);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };


  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-xl rounded-xl p-6 mt-6 w-full max-w-3xl mx-auto border border-blue-200">
  <h2 className="text-2xl font-bold mb-6 text-blue-700">Transaction History</h2>

  {transactions.length === 0 ? (
    <p className="text-gray-600">No transactions found.</p>
  ) : (
    transactions.map((tx) => (
      <div
        key={tx.hash}
        className="bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg p-4 mb-4 text-left shadow hover:shadow-lg transition-shadow"
      >
        <p className="text-sm text-gray-800 mb-1">
          <span className="font-medium text-blue-600">Hash:</span> {tx.hash.slice(0, 20)}...
        </p>
        <p className="text-sm text-gray-800 mb-2">
          <span className="font-medium text-blue-600">Sender:</span> {tx.sender.slice(0, 10)}...
        </p>
        <a
          className="text-blue-500 hover:text-blue-700 text-sm underline"
          href={`https://explorer.aptoslabs.com/txn/${tx.hash}`}
          target="_blank"
          rel="noreferrer"
        >
          View on Explorer
        </a>
      </div>
    ))
  )}
</div>


  );
};

export default TransactionHistory;
