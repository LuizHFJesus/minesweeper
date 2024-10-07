'use strict';

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user.removeItem('password')));
}

export function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function findUser(cpfOrEmailOrUsername) {
    const users = getUsers();
    return users.find(user => 
        user.cpf === cpfOrEmailOrUsername || 
        user.username === cpfOrEmailOrUsername ||
        user.email === cpfOrEmailOrUsername
    );
}