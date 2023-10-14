import {
  HelpCommand,
  ThemeToggleCommand,
  ClearHistoryCommand,
  WhoAmICommand,
  UnknownCommand,
} from './commands'
import { CommandHistory } from './command-history'

const inputElement = document.querySelector('.input')
const windowElement = document.querySelector('.window')
const historyElement = document.querySelector('.history')
const helpElement = document.querySelector('.help p')

class Command {
  static createCommand(input) {
    switch (input) {
      case 'help':
        return new HelpCommand()
      case 'whoami':
        return new WhoAmICommand()
      case 'toggle-theme':
        return new ThemeToggleCommand()
      case 'clear':
        return new ClearHistoryCommand(historyElement)
      default:
        return new UnknownCommand(input)
    }
  }
}

const createHistoryCommand = ({ value, isValid }) =>
  `<div class="field">
    <div class="query">
      <span class="arrow">-></span>
      <span class="directory">kate@me</span>
    </div>
    <span class='history-input${isValid ? ' valid' : ''}'>${value}</span>
  </div>`

const checkIfValidCommand = (command) => {
  const isValidCommand = !(command instanceof UnknownCommand)
  if (isValidCommand) {
    inputElement.classList.add('valid')
  } else {
    inputElement.classList.remove('valid')
  }
  return isValidCommand
}

const history = new CommandHistory()

export const setupCommandLine = () => {
  helpElement.addEventListener('animationend', () => {
    helpElement.style.borderRight = 'none'
    helpElement.style.whiteSpace = 'initial'
  })

  inputElement.addEventListener('keyup', (event) => {
    const inputValue = inputElement.value.trim().toLowerCase()
    const command = Command.createCommand(inputValue)
    const isValidCommand = checkIfValidCommand(command)

    if (event.key === 'Enter') {
      const result = command.execute()

      if (!(command instanceof ClearHistoryCommand)) {
        historyElement.innerHTML += createHistoryCommand({
          value: inputValue,
          isValid: isValidCommand,
        })
      }

      if (result) {
        historyElement.innerHTML += result
      }

      if (inputValue) {
        history.push(command)
      }

      inputElement.value = ''
      windowElement.scrollTop = windowElement.scrollHeight
    } else if (event.key === 'ArrowUp') {
      const historyCommand = history.movePrev()
      inputElement.value = historyCommand.command ?? ''
      checkIfValidCommand(historyCommand)
    } else if (event.key === 'ArrowDown') {
      const historyCommand = history.moveNext()
      inputElement.value = historyCommand.command ?? ''
      checkIfValidCommand(historyCommand)
    }
  })
}
