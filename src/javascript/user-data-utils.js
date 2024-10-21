'use strict';

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
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

export function updateUser(updatedUser) {
    const users = getUsers();
    const index = users.findIndex(user => user.username === updatedUser.username);
    users[index] = updatedUser;
    saveUsers(users);
}

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hexString(hash);
}

function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map(value => {
        return value.toString(16).padStart(2, '0');
    });
    return hexCodes.join('');
}