let state = {
    token:null
}
const setToken = (token) => {
    state.token = token
    localStorage.setItem('token',token)
}
const getToken = () => {
    const token = state.token ? state.token:localStorage.getItem('token')? localStorage.getItem('token'):null
    return token
}
const isLogin = () =>{
   return state.token || localStorage.getItem('token')
}
const LogOut = () => {
    return new Promise((resolve)=>{
        state.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('date')
        localStorage.removeItem('un')
        localStorage.removeItem('name')
        localStorage.removeItem('surname')
        localStorage.removeItem('email')
        localStorage.removeItem('country1')
        localStorage.removeItem('country2')
        resolve()
        window.location.reload(false)
    })
}
export { setToken, getToken, isLogin, LogOut }