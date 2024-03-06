import axios from 'axios';
import constant from '../../config/constant.js';

const URL = `${constant.PROTOCOL}://${constant.HOST_LOCAL}:${constant.PORT}`;

export const getCurrentUser = async () => {
    const urlRequest = `${URL}/api/users/currentUser`;
    const response = await axios.get(urlRequest);
    return response.data;
};