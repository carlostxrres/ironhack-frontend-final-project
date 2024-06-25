const USER_KEY = 'user'

export const getUser = () => {
  const rawUser = localStorage.getItem(USER_KEY)

  // to do: handle errors here
  const user = JSON.parse(rawUser)
  return user
}

export const setUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeUser = () => {
  localStorage.removeItem(USER_KEY)
}

export const isLoggedIn = () => {
  const user = getUser()
  return user !== null
}
