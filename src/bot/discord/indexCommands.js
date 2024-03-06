import { freegames } from './commands/freegames.js';
import { serverstatus } from './commands/serverstatus.js';
import { dolarhoy } from './commands/dolarhoy.js';
import { eurohoy } from './commands/eurohoy.js';
import { btchoy } from './commands/btchoy.js';
import { etchoy } from './commands/etchoy.js';
import { passwordgen } from './commands/passwordgen.js';

const cmd = {
    freegames,
    serverstatus,
    dolarhoy,
    eurohoy,
    btchoy,
    etchoy,
    passwordgen
};

export default cmd;