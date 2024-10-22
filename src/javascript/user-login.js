'use strict';

const userLoginForm = document.getElementById('user-login');

async function handleUserLogin(event) {
    event.preventDefault();

    const form = event.target;
    const emailOrUsername = form.emailOrUsername.value.trim();
    const password = form.password.value.trim();

    const user = findUser(emailOrUsername);
    const hashedPassword = await hashPassword(password);
    if (!user || user.password !== hashedPassword) {
        alert("E-mail, nome de usuário ou senha inválidos!");
        return;
    }
    setCurrentUser(user);

    window.location.href = 'game-selection.html';
}

userLoginForm.addEventListener('submit', handleUserLogin);