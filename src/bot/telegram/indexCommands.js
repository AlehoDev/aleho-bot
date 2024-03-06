import { start } from './commands/start.js';
import { stop } from './commands/stop.js';
import { help } from './commands/help.js';
import { freegames } from './commands/freegames.js';
import { serverstatus } from './commands/serverstatus.js';
import { dolarhoy } from './commands/dolarhoy.js';
import { eurohoy } from './commands/eurohoy.js';
import { btchoy } from './commands/btchoy.js';
import { etchoy } from './commands/etchoy.js';
import { passwordgen } from './commands/passwordgen.js';
import { resetcontext } from './commands/resetcontext.js';

const cmd = {
    start,
    stop,
    help,
    freegames,
    serverstatus,
    dolarhoy,
    eurohoy,
    btchoy,
    etchoy,
    passwordgen,
    resetcontext
};

export default cmd;