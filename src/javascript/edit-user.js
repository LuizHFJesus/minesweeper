'use strict';

import { getCurrentUser, setCurrentUser, updateUser } from './user-utils.js';
import { hashPassword } from './user-utils.js';

const userEditForm = document.getElementById("edit-profile-form");

let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    currentUser = getCurrentUser();

    if (currentUser) {
        document.getElementById("name").value = currentUser.name || '';
        document.getElementById("cpf").value = currentUser.cpf || '';
        document.getElementById("username").value = currentUser.username || '';
        document.getElementById("email").value = currentUser.email || '';
        document.getElementById("dob").value = currentUser.dob || '';
        document.getElementById("tel").value = currentUser.tel || '';
    } else {
        console.error("Usuário não encontrado.");
    }

    userEditForm.addEventListener('submit', (event) => { onEditFormClick(event); });
});

async function onEditFormClick(event) {
    event.preventDefault(); 

    const password = userEditForm.password.value;
    const hashedPassword = await hashPassword(password);
    if (hashedPassword != currentUser.password) {
        alert("Senha incorreta. Por favor, tente novamente!");
        return;
    }

    const updatedUser = {
        name: userEditForm.name.value.trim(),
        cpf: currentUser.cpf, 
        dob: userEditForm.dob.value.trim(),  
        username: currentUser.username,
        tel: userEditForm.tel.value.trim(),
        email: userEditForm.email.value.trim(),
        password: currentUser.password
    }

    setCurrentUser(updatedUser);
    updateUser(updatedUser);
    
    alert("Dados atualizados com sucesso!");
}
