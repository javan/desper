class HTMLWallpaperCollectionElement extends window.HTMLElement {
  attachedCallback () {
    this.render()
    this.addEventListener('click', (event) => {
      event.preventDefault()
      this.activate()
    })
  }

  render () {
    this.innerHTML = `
      <button type="button" class="nav-button" data-behavior="activate">
        <span class="nav-button-title">${this.collection.title}</span>
        <span class="nav-button-count">${this.collection.items.length}</span>
      </button>
    `
  }

  activate () {
    document.querySelectorAll('.nav-button.is-active').forEach(el => el.classList.remove('is-active'))
    this.querySelector('.nav-button').classList.add('is-active')

    const contentElement = document.querySelector('[data-role=content]')
    contentElement.innerHTML = ''

    this.collection.items.forEach((item) => {
      let element = document.createElement('wallpaper-item')
      element.item = item
      contentElement.appendChild(element)
    })
  }
}

document.registerElement('wallpaper-collection', HTMLWallpaperCollectionElement)
module.exports = HTMLWallpaperCollectionElement
