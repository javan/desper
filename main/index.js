const {app, BrowserWindow} = require('electron')
require('./wallpaper')

const windowOptions = {
  width: 1080,
  minWidth: 680,
  height: 840,
  title: app.getName()
}

let mainWindow = null

function createWindow () {
  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadURL(`file://${__dirname}/../browser/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
