export const getUser = () => {
    const rawUser = localStorage.getItem('user')

    // to do: handle errors here
    const user = JSON.parse(rawUser)
    return user
}

export const setUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
}

export const removeUser = () => {
    localStorage.removeItem('user')
}

export const isLoggedIn = () => {
    const user = getUser()
    return user !== null
}