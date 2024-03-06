import cmd from './indexCommands.js';

const chatHandler = async (interaction) => {
    const { commandName } = interaction;

    switch (commandName) {
        case 'freegames':
            cmd.freegames(interaction);
            break;

        case 'serverstatus':
            cmd.serverstatus(interaction);
            break;

        case 'dolarhoy':
            cmd.dolarhoy(interaction);
            break;

        case 'eurohoy':
            cmd.eurohoy(interaction);
            break;

        case 'btc':
            cmd.btchoy(interaction);
            break;

        case 'eth':
            cmd.etchoy(interaction);
            break;

        case 'passwordgen':
            cmd.passwordgen(interaction);
            break;

        default:
            break;
    };
};

export default chatHandler;