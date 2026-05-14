import axios from 'axios';
const SERVER_URL ="http://localhost:5000/api"

/* Why need seperate file?

if we create request in each pages , if we are in production means then server 
willnot be localhost (different domain)it is easy change in this file only, insated of changing in all the pages

*/ 

const registerUser = (data)=>
{
    return axios.post(SERVER_URL+'/register',data);
}


const loginUser = (data)=>
{
        return axios.post(SERVER_URL+'/login',data);  //return json object login userinfo with token
}

const AuthServices = 
{
        registerUser,
        loginUser

}
export default AuthServices
