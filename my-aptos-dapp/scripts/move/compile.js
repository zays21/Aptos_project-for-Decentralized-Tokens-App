const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the Move project
const contractPath = path.join(__dirname, '../contract');

try {
  console.log('Compiling Move contract...');
  execSync('aptos move compile', { cwd: contractPath, stdio: 'inherit' });
  console.log('Compilation successful!');
} catch (error) {
  console.error('Compilation failed:', error.message);
  process.exit(1);
}