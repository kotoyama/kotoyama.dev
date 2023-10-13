const storageKey = 'theme-preference'
const useDark = window.matchMedia('(prefers-color-scheme: dark)')

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey)
  return useDark.matches ? 'dark' : 'light'
}

const theme = {
  value: getColorPreference(),
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

export const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  setPreference()
}

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value)
}

reflectPreference()
useDark.addEventListener('change', ({ matches: isDark }) => {
  theme.value = isDark ? 'dark' : 'light'
  setPreference()
})
