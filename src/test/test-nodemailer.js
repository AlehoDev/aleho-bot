console.log('***TEST NODEMAILER***')

import { generateCode, dateCodeExpire, sendCodeValidatorMail } from '../utils/nodemailer.js'

console.log (generateCode(4));
console.log (dateCodeExpire(24));

sendCodeValidatorMail('alejandro.r.abraham@gmail.com', 'Alejandro', generateCode(4));