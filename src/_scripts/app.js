import { setupThemePreference } from './theme-preference'
import { setupCommandLine } from './command-line'

const bootstrap = () => {
  setupThemePreference()
  setupCommandLine()
}

try {
  bootstrap()
} catch (error) {
  document.addEventListener('DOMContentLoaded', bootstrap)
}
