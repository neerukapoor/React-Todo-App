const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todoTitle: {type:String},
    todoDescription: {type:String}
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};