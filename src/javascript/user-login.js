'use strict';

import { setCurrentUser, findUser } from './user-utils.js';

const userLoginForm = document.getElementById('user-login');

export function handleUserLogin(event) {
    event.preventDefault();

    const form = event.target;
    const emailOrUsername = form.emailOrUsername.value.trim();
    const password = form.password.value.trim();

    const user = findUser(emailOrUsername);
    if (!user || user.password !== password) {
        alert("E-mail, nome de usuário ou senha inválidos!");
        return;
    }
    setCurrentUser(user);

    window.location.href = 'game-selection.html';
}

userLoginForm.addEventListener('submit', handleUserLogin);