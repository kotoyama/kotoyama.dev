import { toggleTheme } from '../theme-preference'
import { BaseCommand } from './base'

export class ThemeToggleCommand extends BaseCommand {
  constructor() {
    super('toggle-theme')
  }

  execute() {
    toggleTheme()
  }
}
