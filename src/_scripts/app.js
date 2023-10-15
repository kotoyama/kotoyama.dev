import { setupThemePreference } from './theme-preference'
import { setupCommandLine } from './command-line'
import { setupNavigationTabs } from './navigation-tabs'

const bootstrap = () => {
  setupThemePreference()
  setupNavigationTabs()
  setupCommandLine()
}

try {
  bootstrap()
} catch (error) {
  document.addEventListener('DOMContentLoaded', bootstrap)
}
