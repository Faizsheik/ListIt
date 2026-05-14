const ToDo = require('./ToDoList');  // importing ToDo schema

exports.createToDo =async (req,res) =>
{
    try
    {
       const data = req.body;  //Dont destrcuture , If in case you add more fields it will be more easy
       const todo = new ToDo(data);
       const result = await todo.save();
       console.log(result);
       res.status(201).send({message:"Created new Task"});   //Success response.

    }
    catch(err)
    {
        console.log(err);
        res.status(err);

    }

}


exports.getAllToDo =async (req,res) =>
    {
        let {userId} = req.params;
        try
        {
           const result = await ToDo.find({createdBy:userId});
          // res.send(result);
          res.status(200).send({ success: true, data: result });

        }
        catch(err)
        {
            console.log(err);
           // res.status(400).send(err);
           res.status(400).send({ success: false, error: err.message });

    
        }
    
    }


    exports.updateToDo =async (req,res) =>
        {
            let {id} = req.params;
            const data = req.body;
            try
            {
               const result = await ToDo.findByIdAndUpdate(id,{$set:data},{returnOriginal:false}) //update only requored fields
               //if true --> no origina l object to be returned no need t return original document.
               console.log(result);
               res.send({message:"Task updated"}); //updated objected
            }
            catch(err)
            {
                console.log(err);
                res.status(400).send(err);
        
            }
        
        }


        exports.deleteToDo  = async (req,res) =>
            {
                let {id} = req.params;
                try
                {
                   const result = await ToDo.findByIdAndDelete(id);
                   console.log(result);
                   res.send({message:"To Do task deleted!!"});
                }
                catch(err)
                {
                    console.log(err);
                    res.status(400).send(err);
            
                }
            
            }