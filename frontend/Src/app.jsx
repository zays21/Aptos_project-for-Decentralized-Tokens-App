// Main application component
const App = () => {
    const [walletAddress, setWalletAddress] = React.useState('');
  
    return (
      <div className="app">
        <header>
          <h1>Aptos Token Sharing dApp</h1>
        </header>
        
        <main>
          <ConnectWallet setWalletAddress={setWalletAddress} />
          
          {walletAddress && (
            <>
              <TokenSender walletAddress={walletAddress} />
              <TransactionHistory walletAddress={walletAddress} />
            </>
          )}
        </main>
        
        <footer>
          <p>Built on Aptos Blockchain | Powered by Petra Wallet</p>
        </footer>
      </div>
    );
  };
  
  // Render the App component
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);