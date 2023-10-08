const storageKey = 'theme-preference'

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey)
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const theme = {
  value: getColorPreference(),
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value)
}

function setupThemePreference() {
  reflectPreference()
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
      theme.value = isDark ? 'dark' : 'light'
      setPreference()
    })
}

setupThemePreference()
