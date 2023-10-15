export const setupNavigationTabs = () => {
  const currentTab = document.querySelector('.tab a[aria-current="page"]')
  if (currentTab) {
    currentTab.scrollIntoView({ behavior: 'smooth' })
  }
}
