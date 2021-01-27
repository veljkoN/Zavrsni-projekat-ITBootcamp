import axios from 'axios'
const baseUrl='https://coetus.herokuapp.com/api';
const putUserIn =async (name, surname, username,pwd,email) => {
    return await axios.put(`${baseUrl}/users`,{
        "name":name,
        "surname":surname,
        "username":username,
        "password":pwd,
        "email":email
    }).then(({data})=>{
        return data
    })
}
const logInUser = async (username,pwd) => {
    return await axios.post(`${baseUrl}/users`,{
        "username":username,
        "password":pwd
    }).then(({data})=>{
        return data
    })
}
export { putUserIn, logInUser }