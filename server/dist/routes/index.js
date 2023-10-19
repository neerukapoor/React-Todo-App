"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = require("../db/index");
const auth_1 = require("../db/auth");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.get("/me", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFromHeader = req.headers["user"];
    const username = yield auth_1.User.findOne({ usernameFromHeader });
    console.log(username);
    if (username) {
        return res.json({ username });
    }
    res.json({ message: "Not logged in" });
}));
router.get("/", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield index_1.Todo.find();
        res.status(200).json({ todos: todos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching todos from the database" });
    }
}));
router.post("/", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoTitle = req.body.title;
    const todoDescription = req.body.description;
    if (!todoTitle || todoTitle.trim() === "") {
        return res.status(400).json({ error: "Todo title cannot be empty" });
    }
    const todo = yield new index_1.Todo({
        todoTitle: todoTitle,
        todoDescription: todoDescription
    });
    todo.save()
        .then((savedTodo) => {
        console.log(savedTodo);
        res.status(200).json({ todo: todo });
    })
        .catch(error => {
        res.status(500).json({ error: "An error occurred while saving the todo" });
    });
}));
router.delete("/:todoId", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.todoId;
        if (!todoId || todoId.trimEnd() === "") {
            res.status(400).json({ error: "Todo Id should Not be empty" });
        }
        const deletedTodo = yield index_1.Todo.findByIdAndDelete(todoId);
        console.log(deletedTodo);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the todo" });
    }
}));
router.put("/:todoId", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.todoId;
        const todoTitle = req.body.title;
        const todoDescription = req.body.description;
        if (!todoId) {
            return res.status(404).json({ error: "Todo Id not provided" });
        }
        const existingTodo = yield index_1.Todo.findById(todoId);
        if (!existingTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        if (todoTitle) {
            existingTodo.todoTitle = todoTitle;
        }
        if (todoDescription) {
            existingTodo.todoDescription = todoDescription;
        }
        const updatedTodo = yield existingTodo.save();
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the todo" });
    }
}));
exports.default = router;
