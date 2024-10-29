import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';
import constant from '../config/constant.js';

export const generateCode = (digitCount) => {
    let code = '';

    const generateDigit = () => {
        let digit = Math.floor(Math.random() * 10);
        return digit.toString();
    };

    for (let index = 0; index < digitCount; index++) {
        code = code + generateDigit();
    }

    return code;
};

export const dateCodeExpire = (hourDelay) => {
    let dateNow = new Date();
    if (!hourDelay) { hourDelay = 24 }
    let hourDelayMiliseconds = 1000 * 60 * 60 * hourDelay

    let dateNew = new Date(dateNow.getTime() + hourDelayMiliseconds)
    return dateNew
};

export const sendMail = async (to, subject, text, html) => {
    try {
        let transporter = nodemailer.createTransport({
            host: constant.EMAIL_HOST,
            port: constant.EMAIL_PORT,
            secure: constant.EMAIL_SECURE,
            auth: {
                user: constant.EMAIL_USER,
                pass: constant.EMAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: '"ALEHO-BOT" <alehodev@gmail.com>',
            to,
            subject,
            text,
            html,
        });

        logger.info(`[NODEMAILER]: Message sent: { accepted: ${info.accepted} - rejected: ${info.rejected} }`);
        return true;
    } catch (error) {
        logger.error(`[NODEMAILER]: ❌ ${error}`);
        return false;
    }
};

export const sendCodeValidatorMail = async (to, name, code) => {
    try {
        const subject = 'ALEHO-BOT. Verificacion de registro';
        const text = `Hola ${name}, has solicitado registrarte a nuestra app. Si esto es así, por favor, utilizá el siguiente código de verificación\nCodigo de verificacion = ${code}`;
        await sendMail(to, subject, text, generateValidatorMailBody(name, code));
        return true;
    } catch (error) {
        logger.error(`[NODEMAILER]: ❌ ${error}`);
        return false;
    }
};

const generateValidatorMailBody = (name, code) => {
    return `
    <tbody>
    <tr>
        <td>
            <div style="box-sizing:border-box;display:block;margin:0 auto;max-width:500px;padding:10px">
                <table cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;background:#fff;border-radius:3px">
                    <tbody>
                        <tr>
                            <td style="vertical-align:center;text-align:center">
                                <img src="https://aleho.sytes.net/img/aleho-bot.jpg" width="128" height="128" alt="Logo" align="center" style="border:none;max-width:100%;margin-top:20px;min-height:128px;min-width:128px">
                            </td>
                        </tr>

                        <tr>
                            <td style="vertical-align:top;box-sizing:border-box;padding:20px">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h2 style="color:#222;font-family:sans-serif;line-height:1.4;font-weight:bold;margin:0;margin-bottom:15px;font-size:24px;text-align:center">
                                                    Codigo de Verificación</h2>
                                                <p style="font-family:sans-serif;font-size:14px;line-height:1.4;font-weight:normal;margin:0;margin-bottom:15px">
                                                    Hola ${name}, has solicitado registrarte a nuestra app. Si esto es correcto, por favor, utilizá el siguiente código de verificación</p>
                                                <table style="border-collapse:separate;width:100%;box-sizing:border-box;min-width:100%!important">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="vertical-align:top;padding-bottom:15px">
                                                                <table style="border-collapse:separate;width:auto">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#3498db;border-radius:5px;text-align:center">
                                                                                <a style="color:#fff;text-decoration:none;background-color:#3498db;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;display:inline-block;font-size:14px;font-weight:bold;margin:0;padding:12px 25px;text-transform:capitalize;border-color:#3498db">
                                                                                    ${code}</a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p style="line-height:1.4;font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;margin-bottom:15px">
                                                    Por favor, ignorá este email si no solicitaste registrarte a nuestra app.</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>
    </tbody>`;
};