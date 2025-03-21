import { AptosClient } from "aptos";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const client = new AptosClient(NODE_URL);

// Replace with your module address
const MODULE_ADDRESS = "0x363802f042a8393ec8b65c79135e8fdeb24a12e453b3008caa86931f5582fb39";

export default async function GetStoredTokens(senderAddress, recipientAddress) {
  try {
    const resource = await client.view({
      function: `${MODULE_ADDRESS}::MyTokenStorage::get_tokens`,
      arguments: [senderAddress, recipientAddress],
      type_arguments: [],
    });
    return parseInt(resource[0]);
  } catch (err) {
    console.error("Error fetching stored tokens:", err);
    return 0;
  }
}
