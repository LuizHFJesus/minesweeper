'use strict';

import { getCurrentUser } from './user-utils.js';
import { isValidPassword } from './user-form-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = getCurrentUser();
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

    const userEditForm = document.getElementById("edit-profile-form");
    userEditForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const password = document.getElementById("password").value;

        if (!isValidPassword(password, currentUser.password)) {
            alert("Senha incorreta. Por favor, tente novamente.");
            return;
        }
        
        const updatedUser = {
            name: document.getElementById("name").value,
            cpf: currentUser.cpf, 
            username: currentUser.username,  
            email: document.getElementById("email").value,
            dob: document.getElementById("dob").value,
            tel: document.getElementById("tel").value,
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        alert("Dados atualizados com sucesso!");
        window.location.href = "game-selection.html";  
    });
});
