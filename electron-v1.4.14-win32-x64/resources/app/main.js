const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// global reference of window object.
let win;

function createWindow () {
  // Create the browser window
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // load the index.html of the app into the window
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools
  win.webContents.openDevTools();

  // Event is emitted when the windows is closed
  win.on('closed', () => {
    // closing the app, bye window
    win = null;
  });
}

// 'ready' is triggered when Electron has finished init and is ready to create
// browser windows. Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
