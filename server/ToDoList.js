const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
    // Title of the ToDo item - required string field
    title: { 
      type: String, 
      required: true 
    },
  
    // Description of the ToDo item - required string field
    description: { 
      type: String, 
      required: true 
    },
  
    // Boolean to check if the task is completed - default value is false
    isCompleted: { 
      type: Boolean, 
      default: false 
    },
  
    // Optional string to store the completion date/time
    completedOn: String,
  
    // Reference to the User who created this ToDo item
    createdBy: {
      ref: "User",             // Refers to the 'User' collection
      type: Schema.ObjectId    // Stores an ObjectId of the User document
    }
  }, {
    timestamps: true  // Automatically add `createdAt` and `updatedAt` fields
  });
  

const ToDo =  mongoose.model("ToDo",todoSchema)
module.exports =  ToDo;