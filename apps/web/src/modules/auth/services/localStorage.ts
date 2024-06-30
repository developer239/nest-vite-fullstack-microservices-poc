export const storeAccessToken = (accessToken: string) =>
  localStorage.setItem('accessToken', accessToken)

export const getAccessToken = () => localStorage.getItem('accessToken')

export const removeAccessToken = () => localStorage.removeItem('accessToken')
