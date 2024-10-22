'use strict';

const userRegisterForm = document.getElementById('user-register');

async function handleUserRegister(event) {
    event.preventDefault();

    const form = event.target;
    var user = {
        name: form.name.value.trim(),
        cpf: form.cpf.value.trim(),
        dob: form.dob.value.trim(),
        username: form.username.value.trim(),
        tel: form.tel.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value.trim()
    }

    if (!isValidCpf(user.cpf)) {
        alert('Por favor, digite um CPF válido!\nO CPF deve conter 11 dígitos.');
        return;
    }

    if (!isValidUsername(user.username)) {
        alert('Por favor, digite um nome de usuário válido!\nO nome de usuário deve conter apenas letras e números, no mínimo 3 dígitos e no máximo 12.');
        return;
    }
    
    if (!isValidPassword(user.password)) {
        alert('Por favor, digite uma senha válida!\nA senha deve conter pelo menos 8 caracteres.');
        return;
    }

    const users = getUsers();

    if (findUser(user.cpf)) {
        alert('Este CPF já está em uso!');
        return;
    }

    if (findUser(user.username)) {
        alert('Este nome de usuário já está em uso!');
        return;
    }

    if (findUser(user.email)) {
        alert('Este e-mail já está em uso!');
        return;
    }

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    users.push(user);
    saveUsers(users);
    setCurrentUser(user);

    window.location.href = 'game-selection.html';
}

userRegisterForm.addEventListener('submit', handleUserRegister);