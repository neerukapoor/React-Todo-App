const express = require('express');
const router = express.Router();
const {Todo} = require('../db/index')
const {User} = require('../db/auth');
const { authenticateJwtToken } = require('../middleware/authMiddleware');

router.get("/me", authenticateJwtToken, async(req,res) => {
    console.log("yaha ");
    console.log(req.user);
    const username = await User.findOne({username:req.user.username});
    console.log(username);
    if(username) {
        return res.json({username})
    }
    res.json({message: "Not logged in"})
})

router.get("/", authenticateJwtToken, async (req,res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({todos: todos});
    } catch {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching todos from the database" });
    }
})

router.post("/", authenticateJwtToken, async (req,res) => {
    const todoTitle = req.body.title;
    const todoDescription = req.body.description;

    if(!todoTitle || todoTitle.trim() === "" ) {
        return res.status(400).json({error: "Todo title cannot be empty"})
    }
    const todo = await new Todo({
        todoTitle: todoTitle,
        todoDescription: todoDescription
    })
    todo.save()
    .then((savedTodo) => {
        console.log(savedTodo);
        res.status(200).json({todo: todo})
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while saving the todo" });
    });
})

router.delete("/:todoId", authenticateJwtToken, async (req,res) => {
    try {
        const todoId = req.params.todoId;
        if(!todoId || todoId.trimEnd() === "") {
            res.status(400).json({error: "Todo Id should Not be empty"});
        }  
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        console.log(deletedTodo);
        if(!deletedTodo) {
            return res.status(404).json({error: "Todo not found"});
        }
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "An error occurred while deleting the todo"})
    }
})

router.put("/:todoId", authenticateJwtToken, async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const todoTitle = req.body.title;
        const todoDescription = req.body.description;

        if(!todoId) {
            return res.status(404).json({error: "Todo Id not provided"});
        }

        const existingTodo = await Todo.findById(todoId);

        if(!existingTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        if (todoTitle) {
            existingTodo.todoTitle = todoTitle;
        }

        if (todoDescription) {
            existingTodo.todoDescription = todoDescription;
        }

        const updatedTodo = await existingTodo.save();
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the todo" });
    }
})

module.exports = router;