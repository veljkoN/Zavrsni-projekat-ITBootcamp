export let errorL = ''
export  const validateLogin = (user) => {
    const usernameL = document.querySelector('#usernameL')
    const pwdL = document.querySelector('#pwdL')
    if(user.userName.trim()!==''){
        usernameL.style.border='1px solid lightgray'
        errorL = ''
        if(user.pwd.trim()!==''){
            pwdL.style.border='1px solid lightgray'
            errorL = ''
            return true
        }
        else{
            pwdL.style.border='1px solid red'
            errorL = '* Field password can not be empty'
        }
    }
    else{ 
        usernameL.style.border='1px solid red'
        errorL = '* Field username can not be empty'
    }
}
 

