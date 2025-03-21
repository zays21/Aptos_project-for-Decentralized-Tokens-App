// Utils for interacting with the Aptos blockchain
const MODULE_ADDRESS = "0x8341d95dcc268b02e4ba91eabf7436858fa8f13e3d29be659f59b46af381d631"; // Replace after deployment
const MODULE_NAME = "token_sharing";

// Check if Petra wallet is installed
const checkForPetraWallet = () => {
  if ("aptos" in window) {
    return window.aptos;
  } else {
    window.open("https://petra.app/", "_blank");
    throw new Error("Petra wallet not installed!");
  }
};

// Connect to Petra wallet
const connectWallet = async () => {
  try {
    const wallet = checkForPetraWallet();
    const response = await wallet.connect();
    return response.address;
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};

// Check if the user has initialized the TokenShare resource
const checkInitialized = async (address) => {
  try {
    const wallet = checkForPetraWallet();
    const isInitialized = await wallet.view({
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::is_initialized`,
      type_arguments: [],
      arguments: [address]
    });
    return isInitialized;
  } catch (error) {
    console.error("Error checking initialization:", error);
    return false;
  }
};

// Initialize the TokenShare resource
const initialize = async () => {
  try {
    const wallet = checkForPetraWallet();
    const transaction = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::initialize`,
      type_arguments: [],
      arguments: []
    };
    
    const pendingTxn = await wallet.signAndSubmitTransaction(transaction);
    return pendingTxn.hash;
  } catch (error) {
    console.error("Error initializing:", error);
    throw error;
  }
};

// Share tokens with another address
const shareTokens = async (recipient, amount, tokenType) => {
  try {
    const wallet = checkForPetraWallet();
    
    // For this example, we'll use APT as the token
    const transaction = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::share_tokens`,
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [recipient, parseInt(amount * 100000000), tokenType] // Convert to octas (8 decimals)
    };
    
    const pendingTxn = await wallet.signAndSubmitTransaction(transaction);
    return pendingTxn.hash;
  } catch (error) {
    console.error("Error sharing tokens:", error);
    throw error;
  }
};

// Get account resources including transaction history
const getAccountResources = async (address) => {
  try {
    const response = await fetch(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resources`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching account resources:", error);
    return [];
  }
};