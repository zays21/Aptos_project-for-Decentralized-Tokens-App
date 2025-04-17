const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the Move project
const contractPath = path.join(__dirname, '../contract');

try {
  console.log('Publishing Move contract...');
  
  // First make sure it's compiled
  execSync('aptos move compile', { cwd: contractPath, stdio: 'inherit' });
  
  // Then publish
  const result = execSync('aptos move publish --assume-yes', { 
    cwd: contractPath, 
    stdio: ['inherit', 'pipe', 'inherit'],
    encoding: 'utf-8'
  });
  
  console.log('Contract published successfully!');
  
  // Extract the module address from the output
  const addressMatch = result.match(/0x[a-fA-F0-9]+/);
  if (addressMatch) {
    const moduleAddress = addressMatch[0];
    console.log(`Module address: ${moduleAddress}`);
    
    // Update the module address in the frontend utility file
    const utilsPath = path.join(__dirname, '../frontend/src/utils/aptos.js');
    if (fs.existsSync(utilsPath)) {
      let utilsContent = fs.readFileSync(utilsPath, 'utf-8');
      utilsContent = utilsContent.replace(/export const MODULE_ADDRESS = "[^"]+";/, 
                                          `export const MODULE_ADDRESS = "${moduleAddress}";`);
      fs.writeFileSync(utilsPath, utilsContent);
      console.log(`Updated module address in ${utilsPath}`);
    }
  }
} catch (error) {
  console.error('Publishing failed:', error.message);
  process.exit(1);
}