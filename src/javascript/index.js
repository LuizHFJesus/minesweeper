'use strict';

import { removeCurrentGame } from './game-data-utils.js';
import { removeCurrentUser } from './user-data-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    removeCurrentGame();
    removeCurrentUser();
});