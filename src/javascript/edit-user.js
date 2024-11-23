'use strict';

const userEditForm = document.getElementById("edit-profile-form");
const deleteAccountButton = document.getElementById("delete-account");

let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = await getCurrentUser();
    
    if (!currentUser) {
        alert('Você precisa estar logado para acessar essa página!');
        window.location.href = '../../index.html';
    }

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

    userEditForm.addEventListener('submit', (event) => { handleUserEdit(event); });
    deleteAccountButton.addEventListener('click', () => { handleDeleteAccount(); });
});

async function handleUserEdit(event) {
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

    await setCurrentUser(updatedUser);
    await updateUser(updatedUser);

    alert("Dados atualizados com sucesso!");
}

async function handleDeleteAccount() {
    // TODO: Create a custom modal to confirm the deletion of the account
    const password = prompt("Tem certeza que deseja excluir sua conta?\n\n" +
        "Esta ação não pode ser desfeita e todos os dados relacionados a conta será apagado.\n\n" +
        "Digite sua senha para excluir sua conta:", '');

    if (!password) return;

    const hashedPassword = await hashPassword(password);
    if (hashedPassword != currentUser.password) {
        alert("Senha incorreta. Por favor, tente novamente!");
        return;
    }

    await deleteUser(currentUser.username);
    await removeCurrentUser();

    let games = getGames();
    games = games.filter(game => game.username !== currentUser.username);
    saveGames(games);
    removeCurrentGame();

    alert("Conta excluída com sucesso!");
    window.location.replace("../../index.html");
}