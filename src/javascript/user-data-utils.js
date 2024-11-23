'use strict';

const GET_CURRENT_USER = 'GET_CURRENT_USER';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const SAVE_USERS = 'SAVE_USERS';
const FIND_USER = 'FIND_USER';
const UPDATE_USER = 'UPDATE_USER';

async function ajaxRequest(action, data = {}) {
    data.action = action;

    const response = await fetch('http://localhost/minesweeper/src/php/user_storage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data),
    });

    return response.json();
}

async function getCurrentUser() {
    const response = await ajaxRequest(GET_CURRENT_USER);
    return JSON.parse(response.currentUser) || null;
}

async function setCurrentUser(user) {
    await ajaxRequest(SET_CURRENT_USER, { user: JSON.stringify(user) });
}

async function removeCurrentUser() {
    await ajaxRequest(REMOVE_CURRENT_USER);
}

async function getUsers() {
    const response = await ajaxRequest(GET_USERS);
    return response.users || [];
}

async function createUser(user) {
    await ajaxRequest(CREATE_USER, { user: JSON.stringify(user) });
}

async function deleteUser(username) {
    await ajaxRequest(DELETE_USER, { username });
}

async function findUser(cpfOrEmailOrUsername) {
    const response = await ajaxRequest(FIND_USER, { cpfOrEmailOrUsername });
    return response.user || null
}

async function updateUser(updatedUser) {
    await ajaxRequest(UPDATE_USER, { updatedUser: JSON.stringify(updatedUser) });
}

async function hashPassword(password) {
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