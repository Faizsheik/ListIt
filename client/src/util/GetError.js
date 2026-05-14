//when we enter wrong password , the message shows metowk error 404 from the response, In order for custom error we use this util 
export function getErrorMessage (error)
 {
    const msg =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString ();
    return msg;
  }



  
  /*
   catch(err)
    {
        console.log(err);
        res.status(400).send(err)
    }
*/
/*
res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: 'additional'
})*/


/*
res.status(404).json({
    status: 'error',
    error: 'User not found'
    data:'additional'
});
*/