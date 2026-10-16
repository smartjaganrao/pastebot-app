const fs = require('fs');
const path = require('path');

// Simple 16x16 PNG icon (black square with transparent background)
// This is a valid PNG file in hex
const iconHex = '89504e470d0a1a0a0000000d4948445200000010000000100802000000909053de0000001e4944415408998c63f8cfc2c0c8c4c68080909080c0c0c0c8c8c0c8c0c8c8c0c0909000c0a0a900064000a8e0049a5e220000000049454e44ae426082';

const iconPath = path.join(__dirname, 'src/assets/tray-icon.png');
const iconBuffer = Buffer.from(iconHex, 'hex');

if (!fs.existsSync(path.dirname(iconPath))) {
  fs.mkdirSync(path.dirname(iconPath), { recursive: true });
}

fs.writeFileSync(iconPath, iconBuffer);
console.log('Tray icon created at', iconPath);
