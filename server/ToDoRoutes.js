const express = require('express');
const {getAllToDo} = require('./ToDoController.js');
const {createToDo} = require('./ToDoController.js');
const {deleteToDo} = require('./ToDoController.js');
const {updateToDo} = require('./ToDoController.js');


const router = express.Router();
const authenticateToken = require('./authJwt.js')

//verify the user identity . Authenticate the user for the route. If user gets authenticated only able to access these routes.

router.post('/create-to-do',authenticateToken,createToDo);
router.get('/get-all-to-do/:userId',authenticateToken,getAllToDo);
router.delete('/delete-to-do/:id',authenticateToken,deleteToDo);
router.patch('/update-to-do/:id',authenticateToken,updateToDo);



// First check valid token or not 

module.exports = router;

