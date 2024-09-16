"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
// ROUTES
router.get('/', users_controllers_1.getUsersController);
router.get('/:id', users_controllers_1.getUserByIdController);
router.post('/', users_controllers_1.createUserController);
router.put('/', users_controllers_1.updateUserController);
router.delete('/', users_controllers_1.deleteUserController);
exports.default = router;
