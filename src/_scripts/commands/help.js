import { translator } from '../translator'
import { BaseCommand } from './base'

export class HelpCommand extends BaseCommand {
  constructor() {
    super('help')
    this._result = `<p>${translator.t(
      'available-commands',
    )}\n</p><ul><li><code>help</code> - ${translator.t(
      'commands.help',
    )}</li>\n<li><code>toggle-theme</code> - ${translator.t(
      'commands.toggle-theme',
    )}</li>\n<li><code>clear</code> - ${translator.t(
      'commands.clear',
    )}</li></ul>`
  }
}
