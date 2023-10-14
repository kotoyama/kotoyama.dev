import { translator } from '../translator'
import { BaseCommand } from './base'

export class WhoAmICommand extends BaseCommand {
  constructor() {
    super('whoami')
    this._result = `<p>${translator.t('nice-person')}</p>`
  }
}
