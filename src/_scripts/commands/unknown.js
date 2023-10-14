import { translator } from '../translator'
import { BaseCommand } from './base'

export class UnknownCommand extends BaseCommand {
  constructor(value) {
    super(value)
    if (value) {
      this._result = `<p>${translator.t('command-not-found', {
        command: value,
      })}</p>`
    }
  }
}
