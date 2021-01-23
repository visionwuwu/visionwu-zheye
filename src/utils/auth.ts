const TOKEN = 'token'

export function setToken (token: string): void {
  localStorage.setItem(TOKEN, token)
}

export function removeToken (): void {
  localStorage.removeItem('token')
}

export function getToken (): string {
  return localStorage.getItem('token') || ''
}
