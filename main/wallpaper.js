const {app, BrowserWindow, ipcMain, session, webContents} = require('electron')
const wallpaper = require('wallpaper')
const path = require('path')

ipcMain.on('set-wallpaper', (event, {url, title}) => {
  const download = new WallpaperDownload(url)

  download.perform().then((wallpaperPath) => {
    wallpaper.set(wallpaperPath).then(() => {
      event.sender.send('wallpaper-set', {url, title})
    })
  })
})

class WallpaperDownload {
  constructor (url) {
    this.url = url
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  perform () {
    session.defaultSession.once('will-download', this.downloadDidStart.bind(this))
    webContents.getFocusedWebContents().webContents.downloadURL(this.url)
    return this.promise
  }

  downloadDidStart (event, item) {
    this.item = item
    const savePath = path.join(app.getPath('pictures'), app.getName(), item.getFilename())
    item.setSavePath(savePath)
    item.on('updated', this.downloadDidUpdate.bind(this))
    item.once('done', this.downloadDidComplete.bind(this))
  }

  downloadDidUpdate (event, state) {
    if (state === 'interrupted') {
      this.reject('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (this.item.isPaused()) {
        this.reject('Download is paused')
      } else {
        this.updateProgress()
      }
    }
  }

  downloadDidComplete (event, state) {
    this.clearProgress()
    if (state === 'completed') {
      this.resolve(this.item.getSavePath())
    } else {
      this.reject(`Download failed: ${state}`)
    }
  }

  getProgress () {
    const total = this.item.getTotalBytes()
    const received = this.item.getReceivedBytes()

    return total && received ? received / total : -1
  }

  updateProgress (value) {
    BrowserWindow.getFocusedWindow().setProgressBar(value || this.getProgress())
  }

  clearProgress () {
    this.updateProgress(-1)
  }
}
