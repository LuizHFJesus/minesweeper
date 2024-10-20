'use strict';

import { removeCurrentGame } from './game-data-utils.js';
import { removeCurrentUser } from './user-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    removeCurrentGame();
    removeCurrentUser();
});