"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const users_models_1 = require("../models/users.models");
// Business logic here
const getUsersController = (req, res) => {
    const users = (0, users_models_1.getUsers)();
    res.status(200).json({ users });
};
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = (0, users_models_1.getUserById)(id);
    if (user) {
        res.status(200).json({ user });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.getUserByIdController = getUserByIdController;
const createUserController = (req, res) => {
    const user = req.body;
    (0, users_models_1.createUser)(user);
    res.status(201).json({ message: 'User created', user });
};
exports.createUserController = createUserController;
const updateUserController = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    data.id = id;
    (0, users_models_1.updateUser)(data);
    res.status(200).json({ message: 'User updated', user: data });
};
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => {
    const id = parseInt(req.params.id, 10);
    (0, users_models_1.deleteUser)(id);
    res.status(200).json({
        message: `User ${id} deleted`,
    });
};
exports.deleteUserController = deleteUserController;
