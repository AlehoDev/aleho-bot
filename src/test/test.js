import { assert } from 'chai';
import { logCheck } from './checkers/logCheck.js';
import 'dotenv/config';

const serverURL = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/api/botcmd/servercheck`;

describe('Test aleho-bot', () => {
    describe('Server Test:', () => {
        it('Endpoint availability', async () => {
            fetch(serverURL)
                .then(resp => {
                    assert.equal(resp.status, 200)
                })
        });

        it('Error log check', async () => {
            const test = logCheck();
            assert.equal(test, 'pass');
        });
    });
});