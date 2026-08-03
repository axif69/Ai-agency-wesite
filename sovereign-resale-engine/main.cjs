const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess = null;

function createWindow () {
  // 1. Launch local backend server
  serverProcess = spawn('node', [path.join(__dirname, 'dist-server', 'server.cjs')], {
    stdio: 'inherit',
    env: { ...process.env, PORT: '3010' }
  });

  // 2. Create native desktop window
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Asif Digital Agency - Sovereign Sales Engine v5.1',
    icon: path.join(__dirname, 'dist', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 3. Load local server UI
  setTimeout(() => {
    win.loadURL('http://localhost:3010');
  }, 1500);

  win.on('closed', () => {
    if (serverProcess) serverProcess.kill();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
