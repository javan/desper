const actions = {
  '[data-behavior=toggle-favorite]': 'toggleFavorite',
  '[data-behavior=set-wallpaper]': 'setWallpaper'
}

class HTMLWallpaperItemElement extends window.HTMLElement {
  attachedCallback () {
    this.render()
    this.addEventListener('click', this.didClick.bind(this))
  }

  render () {
    this.innerHTML = `
      <figure>
        <img src="${this.item.thumbnailImageURL}">
        <figcaption>
          <a href="#" data-behavior="toggle-favorite" title="${this.item.isFavorite() ? 'Remove from' : 'Add to'} Favorites">${this.item.isFavorite() ? '❤️' : '💔'}</a>
          <a href="#" data-behavior="set-wallpaper" title="Set as Wallpaper">🖼</a>
        </figcaption>
      </figure>
    `
  }

  didClick (event) {
    for (const key in actions) {
      if (event.target.matches(key)) {
        event.preventDefault()
        this.item[actions[key]]()
        this.render()
        return
      }
    }
  }
}

document.registerElement('wallpaper-item', HTMLWallpaperItemElement)
