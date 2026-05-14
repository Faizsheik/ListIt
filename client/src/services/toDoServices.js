import axios from 'axios';
import { getUserDetails } from '../util/GetUser';

const SERVER_URL ="http://localhost:5000/api/todo"

/* Why need seperate file?

if we create request in each pages , if we are in production means then server 
willnot be localhost (different domain)it is easy change in this file only, insated of changing in all the pages

*/ 

const authHeaders = () =>
{
    let userToken = getUserDetails()?.token;
    return {headers:{'Authorization':userToken}};
}



const createToDo = (data) =>
{
    return axios.post(SERVER_URL+'/create-to-do',data,authHeaders());
}


const getAllToDo = (userId) =>
{
    return  axios.get(SERVER_URL+'/get-all-to-do/'+userId,authHeaders()); //Biggest mistake i made, instead of get , i used post
}

const deleteToDo = (id)=>
{
        return axios.delete(SERVER_URL+'/delete-to-do/'+id,authHeaders());
}

const updateToDo = (id,data) =>
{
    return axios.patch(SERVER_URL+'/update-to-do/'+id,data,authHeaders());

}
const ToDoServices = 
{
    createToDo,
    deleteToDo,
    updateToDo,
    getAllToDo

}
export default ToDoServices
