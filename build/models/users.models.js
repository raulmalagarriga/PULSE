"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const users = [
    {
        id: 1,
        name: 'Raul M',
        email: 'raul@gmail.com',
        password: '12345678'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@test.com',
        password: 'secret',
    },
    {
        id: 3,
        name: 'Jack Doe',
        email: 'jack.doe@test.com',
        password: 'password',
    },
];
const getUsers = () => {
    return users;
};
exports.getUsers = getUsers;
const getUserById = (id) => {
    return users.find(user => user.id == id);
};
exports.getUserById = getUserById;
const createUser = (user) => {
    users.push(user);
};
exports.createUser = createUser;
const updateUser = (user) => {
    const index = users.findIndex(u => u.id == user.id);
    users[index] = user;
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const index = users.findIndex(u => u.id == id);
    users.splice(index, 1);
};
exports.deleteUser = deleteUser;
