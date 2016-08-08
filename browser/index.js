require('./elements/wallpaper_source')
require('./elements/wallpaper_collection')
require('./elements/wallpaper_favorites')
require('./elements/wallpaper_item')

const {ipcRenderer} = require('electron')

ipcRenderer.on('wallpaper-set', (event, {url, title}) => {
  const notification = new window.Notification('Wallpaper changed!', { body: `Now displaying "${title}"` })

  notification.addEventListener('click', () => {
    // You clicked me
  })
})
