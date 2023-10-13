import {
  HelpCommand,
  ThemeToggleCommand,
  ClearHistoryCommand,
} from './commands'

const inputElement = document.querySelector('.input')
const windowElement = document.querySelector('.window')
const historyElement = document.querySelector('.history')
const helpElement = document.querySelector('.help p')

class Command {
  static createCommand(input) {
    switch (input) {
      case 'help':
        return new HelpCommand()
      case 'toggle-theme':
        return new ThemeToggleCommand()
      case 'clear':
        return new ClearHistoryCommand(historyElement)
    }
  }
}

const createHistoryCommand = (input) =>
  `<div class="field">
    <div class="query">-> kate@me</div>
    ${input}
  </div>`

helpElement.addEventListener('animationend', () => {
  helpElement.style.borderRight = 'none'
  helpElement.style.whiteSpace = 'initial'
})

inputElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const inputValue = inputElement.value.trim().toLowerCase()
    const command = Command.createCommand(inputValue)

    if (command) {
      const result = command.execute()
      if (!(command instanceof ClearHistoryCommand)) {
        historyElement.innerHTML += createHistoryCommand(inputValue)
        if (result) historyElement.innerHTML += result
      }
    } else {
      historyElement.innerHTML += createHistoryCommand(inputValue)
    }

    inputElement.value = ''
    windowElement.scrollTop = windowElement.scrollHeight
  }
})
