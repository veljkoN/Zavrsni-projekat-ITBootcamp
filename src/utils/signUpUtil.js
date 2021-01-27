export let errorM=''
const validateEmail=(email)=> {
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(email)
} 
const validateCheck = (user) => {
    let name = document.querySelector('#name') 
    let surname = document.querySelector('#surname') 
    let username = document.querySelector('#username') 
    let pwd = document.querySelector('#pwd') 
    let rePwd = document.querySelector('#rePwd') 
    let email = document.querySelector('#email')  
    if(user.name !=='' && user.name.length>3 && user.name.length<15){
        name.style.border='1px solid lightgray'
        if(user.surname !=='' && user.surname.length>3 && user.surname.length<15){
            surname.style.border='1px solid lightgray'
            if(user.username !=='' && user.username.length>3 && user.username.length<15){
                username.style.border='1px solid lightgray'
                if(user.pwd!=='' && user.pwd.length>6 && user.pwd.length<16){
                    pwd.style.border='1px solid lightgray'
                    if(user.pwd===user.rePwd){
                        rePwd.style.border='1px solid lightgray'
                        if(validateEmail(user.email)){
                            email.style.border='1px solid lightgray'
                            errorM = ''
                            return true
                        }
                        else{
                            email.style.border='1px solid red'
                            errorM = '* Email is not correct'
                        }
                    }
                    else{
                        rePwd.style.border='1px solid red'
                        errorM = '* Password and Confirm password should be matched'
                    }
                }
                else{
                    pwd.style.border='1px solid red'
                    errorM = '* Password should be between 8 and 15 characters'
                }
            }
            else{
            username.style.border='1px solid red'
            errorM = '* Username should be between 4 and 12 characters'
            }
        }
        else{
            surname.style.border='1px solid red'
            errorM = '* Surname should be between 3 and 15 characters'
        }
    }
    else{
        name.style.border='1px solid red'
        errorM = '* Name should be between 3 and 15 characters'
    }
}

export default validateCheck