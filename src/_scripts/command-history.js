export class CommandHistory {
  constructor() {
    this._history = []
    this._index = -1
  }

  push(command) {
    if (!command) {
      this.resetIndex()
      return
    }

    if (!this._history.length) {
      this._history.push(command)
      this.resetIndex()
      return
    }

    let currentIndex =
      this._index === -1 ? this._history.length - 1 : this._index
    let currentCommand = this._history[currentIndex]

    if (command != currentCommand) {
      this._history.push(command)
      this.resetIndex()
      return
    }

    this._history.splice(this._index, 1)
    this._history.push(command)
    this.resetIndex()
  }

  moveNext() {
    if (!this._history.length) {
      return ''
    }

    let newIndex = this._index + 1
    if (newIndex >= this._history.length) {
      newIndex = 0
      return ''
    }

    this._index = newIndex
    return this._history[newIndex]
  }

  movePrev() {
    if (!this._history.length) {
      return ''
    }

    let newIndex = this._index - 1
    if (newIndex < 0) {
      newIndex = this._history.length - 1
    }

    this._index = newIndex
    return this._history[this._index]
  }

  resetIndex() {
    this._index = -1
  }
}
