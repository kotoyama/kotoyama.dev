import { BaseCommand } from './base'

export class ClearHistoryCommand extends BaseCommand {
  constructor(historyElement) {
    super('clear')
    this._command = 'clear'
    this._historyElement = historyElement
  }

  execute() {
    this._historyElement.innerHTML = ''
  }
}
