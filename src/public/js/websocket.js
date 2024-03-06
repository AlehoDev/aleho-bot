const socket = io();
let messages = [];

//Socket Events
socket.on('server_handshake', () => {
    socket.emit('client_handshake');
    logLoad();
});

socket.on('log_change', data => {
    logAdd(data);
});

//Messages
function logLoad() {
    const tbody = document.getElementById('logger');
    const elements = tbody.getElementsByTagName('span');
    const url = '/api/botcmd/showlogs';

    if (elements.length === 0) {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                messages = data;
                return messages.map((log) => {
                    appendLog(tbody, log);
                });
            })
            .catch(function (error) {
                console.log(error)
            });
    };
};

function logAdd(newLog) {
    const tbody = document.getElementById('logger');
    appendLog(tbody, newLog);
};

//Others
function createNode(element) {
    return document.createElement(element);
};

function append(parent, element) {
    return parent.insertBefore(element, parent.firstChild);    
};

function appendLog(tbody, log) {
    let timestamp = createNode('td');
    timestamp.className = 'sp_timestamp';
    timestamp.innerHTML = `${log.timestamp}: `;

    let level = createNode('td');
    level.className = 'sp_level';
    level.innerHTML = `${log.level}`;

    let message = createNode('td');
    message.className = 'message';
    message.innerHTML = log.message;

    let tr = createNode('tr');

    append(tbody, tr);
    append(tr, message);
    append(tr, level);
    append(tr, timestamp);
};