// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import { assert } from 'chai';
import { logCheck } from './checkers/logCheck.js';

describe('Test aleho-bot', () => {
    describe('Server Test:', () => {
        it('Error log check', async () => {
            const test = logCheck();
            assert.equal(test, 'pass');
        });
    });
});