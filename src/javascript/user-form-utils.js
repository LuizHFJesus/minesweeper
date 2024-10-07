'use strict';

export function isValidCpf(cpf) {
    return cpf.length === 11;
}

export function isValidPassword(password) {
    return password.length >= 8;
}

export function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9]{3,12}$/;
    return regex.test(username);
}